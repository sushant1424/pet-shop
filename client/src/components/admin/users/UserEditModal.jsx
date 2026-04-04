/**
 * UserEditModal
 * Edit form for updating a specific user's info.
 */
export default function UserEditModal({ form, setForm, onClose, onSubmit }) {
  const inputCls = 'w-full p-4 bg-slate-50 border border-slate-200 outline-none rounded-xl focus:border-slate-400 font-medium transition-colors';
  const labelCls = 'block text-xs font-black text-slate-700 uppercase tracking-wider mb-2';

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in" onClick={onClose}>
      <form onSubmit={onSubmit} className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-2xl scale-in-center" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-black mb-8 text-slate-900 tracking-tight">Edit User</h2>
        <div className="space-y-5">
          <div>
            <label className={labelCls}>Name</label>
            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Name" />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="Email" />
          </div>
          <div>
            <label className={labelCls}>Role</label>
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className={inputCls}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 mt-10">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all">Cancel</button>
          <button type="submit" className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black shadow-lg shadow-slate-200 transition-all">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
