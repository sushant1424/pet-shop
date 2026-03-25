import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import useStore from '../../store/useStore';

/**
 * ProfileTab Component
 * Allows users to update their name and shipping address.
 */
export default function ProfileTab() {
  const { user, setAuth } = useStore();
  const [profileForm, setProfileForm] = useState({ name: '', shipping_address: '' });

  // Load the user's existing data into the form when the component mounts
  useEffect(() => {
    if (user) {
      setProfileForm({ 
        name: user.name || '', 
        shipping_address: user.shipping_address || '' 
      });
    }
  }, [user]);

  // Handle saving the new data to the database
  const handleUpdateProfile = async (e) => {
    e.preventDefault(); // Stop page refresh
    try {
      // Send the updated data to the Express backend
      const res = await api.put(`/users/${user.id}`, profileForm);
      // Update our global state so the name changes instantly everywhere
      setAuth({ ...user, ...res.data }, localStorage.getItem('token'));
      toast.success('Profile updated securely');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="max-w-lg">
      <form onSubmit={handleUpdateProfile} className="space-y-6 bg-card p-6 rounded-2xl border border-border shadow-sm">
         <div>
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <input 
              type="text" 
              value={profileForm.name} 
              // React sets state on every keystroke
              onChange={e => setProfileForm({...profileForm, name: e.target.value})}
              className="w-full bg-secondary border-none p-4 rounded-xl font-medium outline-none focus:ring-2 focus:ring-primary/20"
            />
         </div>
         <div>
            <label className="block text-sm font-semibold mb-2">Shipping Address</label>
            <textarea 
              value={profileForm.shipping_address} 
              onChange={e => setProfileForm({...profileForm, shipping_address: e.target.value})}
              placeholder="Enter your complete delivery address"
              className="w-full bg-secondary border-none p-4 rounded-xl font-medium outline-none focus:ring-2 focus:ring-primary/20 h-32 resize-none"
            />
         </div>
         <button type="submit" className="bg-primary text-white font-bold py-3 px-8 rounded-xl shadow-md hover:scale-105 transition-transform">
            Save Changes
         </button>
      </form>
    </div>
  );
}
