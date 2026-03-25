import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import useStore from '../../store/useStore';
import { UserCheck } from 'lucide-react';

/**
 * ProfileTab Component
 * Allows users to update their name and shipping address.
 * A confirmation dialog is shown before saving to prevent accidental overwrites.
 */
export default function ProfileTab() {
  const { user, setAuth } = useStore();
  const [profileForm, setProfileForm] = useState({ name: '', shipping_address: '' });
  // confirmOpen controls whether the "Are you sure?" modal is visible
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load the user's existing data into the form when the component mounts
  useEffect(() => {
    if (user) {
      setProfileForm({ 
        name: user.name || '', 
        shipping_address: user.shipping_address || '' 
      });
    }
  }, [user]);

  // Step 1: form submit just opens the confirmation dialog — does NOT save yet
  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!profileForm.name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    setConfirmOpen(true);
  };

  // Step 2: only runs after the user clicks "Confirm" inside the dialog
  const handleConfirmedSave = async () => {
    try {
      setSaving(true);
      const res = await api.put(`/users/${user.id}`, profileForm);
      // Update our global Zustand state so the name changes instantly everywhere
      setAuth({ ...user, ...res.data }, localStorage.getItem('token'));
      toast.success('Profile updated successfully!');
      setConfirmOpen(false);
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg">
      <form onSubmit={handleSubmitRequest} className="space-y-6 bg-card p-6 rounded-2xl border border-border shadow-sm">
         <div>
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <input 
              type="text" 
              value={profileForm.name} 
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

      {/* ── Confirmation Dialog ─────────────────────────────── */}
      {confirmOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setConfirmOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
              <UserCheck size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Save Changes?</h3>
            <p className="text-slate-500 text-sm mb-5 font-medium">
              You are about to update your profile with the following details:
            </p>
            <div className="bg-slate-50 rounded-2xl p-4 mb-6 space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-slate-400 font-semibold w-16 shrink-0">Name</span>
                <span className="font-bold text-slate-800">{profileForm.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-400 font-semibold w-16 shrink-0">Address</span>
                <span className="font-bold text-slate-800">{profileForm.shipping_address || '(none)'}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmedSave}
                disabled={saving}
                className="flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-70 flex items-center justify-center"
              >
                {saving
                  ? <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
                  : 'Confirm'
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
