import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useStore from '../store/useStore';
import api from '../lib/api';
import toast from 'react-hot-toast';

/**
 * Login Component
 * This page allows users and admins to sign into their accounts.
 * It uses React 'useState' to track what the user types into the input boxes.
 */
export default function Login() {
  // Create variables to store the email and password the user types in
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Create a loading variable to show a spinner while waiting for the server
  const [loading, setLoading] = useState(false);
  
  // Bring in our global functions for logging in and changing pages
  const setAuth = useStore((state) => state.setAuth);
  const navigate = useNavigate();

  // This function runs when the user clicks the "Login" button
  const handleSubmit = async (e) => {
    // Prevent the default browser behavior of refreshing the page on form submit
    e.preventDefault(); 
    setLoading(true); // Start the loading spinner

    try {
      // Send the email and password to our backend server
      const res = await api.post('/auth/login', { email, password });
      
      // If successful, save the user info and digital token globally
      setAuth(res.data.user, res.data.token);
      
      // Show a cute success popup using the user's first name
      toast.success(`Welcome back, ${res.data.user.name.split(' ')[0]}!`);
      
      // If the user logging in is an admin, send them to the admin dashboard
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        // Otherwise, send regular users to the public homepage
        navigate('/');
      }
    } catch (err) {
      // If the server says "wrong password", show an error popup
      toast.error(err.response?.data?.error || 'Login failed. Check your credentials.');
    } finally {
      // No matter what happens, turn off the loading spinner
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      {/* The main white box */}
      <div className="max-w-md w-full bg-card p-8 rounded-xl shadow-sm border border-border">
        
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back 🐾</h2>
        
        {/* The form calls our 'handleSubmit' function when the button is pressed */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Input Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              // When they type, update the 'email' state variable instantly
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="you@example.com"
            />
          </div>
          
          {/* Password Input Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              // When they type, update the 'password' state variable instantly
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {/* If 'loading' is true, say "Signing in...", otherwise say "Login" */}
            {loading ? 'Signing in...' : 'Login'}
          </button>

        </form>

        {/* Link to the Signup page if they don't have an account */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account? <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
        </p>

      </div>
    </div>
  );
}
