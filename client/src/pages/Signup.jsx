import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useStore from '../store/useStore';
import api from '../lib/api';
import toast from 'react-hot-toast';

/**
 * Signup Component
 * This page allows new customers to register for an account.
 * It teaches how to capture multiple user inputs and post them to an Express API.
 */
export default function Signup() {
  // State variables act as dynamic memory for our React component
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Loading state prevents the user from clicking the button twice
  const [loading, setLoading] = useState(false);
  
  // Grab our global helper functions
  const setAuth = useStore((state) => state.setAuth);
  const navigate = useNavigate();

  // Async function because getting a response from the database takes time
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the browser page refresh
    setLoading(true);

    try {
      // POST the user's details to the register endpoint
      const res = await api.post('/auth/signup', { name, email, password });
      
      // Tell the browser this user is now successfully logged in
      setAuth(res.data.user, res.data.token);
      
      // Display a green success popup
      toast.success(`Welcome to PawMart, ${name.split(' ')[0]}! 🐾`);
      
      // Redirect them to the main storefront
      navigate('/');
    } catch (err) {
      // If the email is already taken, display the backend's error message
      toast.error(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      // Stop the loading spinner
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      {/* Central Login Card Container */}
      <div className="max-w-md w-full bg-card p-8 rounded-xl shadow-sm border border-border">
        
        <h2 className="text-2xl font-bold text-center mb-6">Join PawMart 🐾</h2>
        
        {/* Form bound to the handleSubmit mechanism */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name Block */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input 
              type="text" 
              required 
              value={name} 
              // Update React memory dynamically on key stroke
              onChange={e => setName(e.target.value)}
              className="w-full p-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Your name"
            />
          </div>
          
          {/* Email Block */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              // Update React memory dynamically on key stroke
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="you@example.com"
            />
          </div>
          
          {/* Password Block */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              // Update React memory dynamically on key stroke
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
          </div>
          
          {/* Conditional Loading Button */}
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
          
        </form>

        {/* Redirect to Login */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
        </p>

      </div>
    </div>
  );
}
