/**
 * LogoutModal
 * Confirmation dialog for signing out.
 */
export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-in fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-2xl font-black mb-3 text-slate-900 tracking-tight">Logout?</h3>
        <p className="text-slate-500 mb-8 font-medium">Are you sure you want to sign out of your account?</p>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-3 bg-rose-500 text-white font-black rounded-xl shadow-lg shadow-rose-100 transition-all hover:bg-rose-600">Yes, Logout</button>
        </div>
      </div>
    </div>
  );
}
