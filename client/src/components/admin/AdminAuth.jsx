import { useState } from 'react';
import useStore from '../../store/useStore';
import api from '../../lib/api';
import { ShieldCheck, Mail, Lock, Loader2 } from 'lucide-react';

/**
 * AdminAuth Component
 * Handles logging in the admin or creating a new admin account.
 * Uses conditional rendering to switch between Login and Signup modes.
 */
export default function AdminAuth() {
  // useState hooks manage temporary form details and UI modes
  const [isLogin, setIsLogin] = useState(true); // Switches between "Login" and "Create Account"
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Controls the spinning circle

  // This imports global functions from our Zustand Store (like React Context)
  const { setAuth } = useStore();

  // This function pushes data to the backend when the user clicks submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    setError(''); // Clear old errors
    setLoading(true); // Start spinning circle

    try {
      if (isLogin) {
        // Attempt login
        const res = await api.post('/auth/login', { email: formData.email, password: formData.password });
        // Security check: Only admins can proceed past this page
        if (res.data.user.role !== 'admin') {
          setError('Access denied. Admin only.');
        } else {
          // Success! Save user data globally
          setAuth(res.data.user, res.data.token);
        }
      } else {
        // Create a brand new admin account
        await api.post('/auth/create-admin', formData);
        setIsLogin(true); // Switch back to the login view so they can log in
        setError('Admin created successfully. Please login.');
      }
    } catch (err) {
      // Show backend errors (like "Invalid password" or standard server errors)
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      // Regardless of success or failure, stop spinning the loading circle
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">

        {/* Header Icon */}
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-sm">
          <ShieldCheck size={24} className="text-white" />
        </div>

        <h2 className="text-2xl font-black text-slate-900 mb-2">
          {/* Use a "ternary operator" to change the title dynamically */}
          {isLogin ? 'Admin Portal' : 'Create Admin'}
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          {isLogin ? 'Enter your credentials to manage the pet shop.' : 'Register a new administrator account.'}
        </p>

        {/* Error Alert Box: Only renders if 'error' state has content */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold mb-6 flex items-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Render "Full Name" input ONLY if we are creating a new account (!isLogin) */}
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 outline-none px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all text-sm font-medium"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 outline-none pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all text-sm font-medium"
                placeholder="admin@petshop.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="password"
                required
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 outline-none pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all text-sm font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-bold text-sm py-3 rounded-xl mt-6 hover:bg-slate-800 transition-all disabled:opacity-70"
          >
            {/* Show a spinning icon if loading, otherwise show text */}
            {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            // Toggle the isLogin state variable when clicked
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            {isLogin ? 'Need an admin account? Create one' : 'Already have an account? Sign in'}
          </button>
        </div>

      </div>
    </div>
  );
}
