import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../../lib/api';
import SortHeader from '../SortHeader';

import UserStatsCards from '../users/UserStatsCards';
import UserEditModal from '../users/UserEditModal';

/**
 * UsersTab Component
 * Shows and manages all PetMart registrants.
 */
export default function UsersTab({ users, fetchData, setActionConfirm, setDeleteConfirm }) {
  const [search, setSearch] = useState('');
  const [page, setPage]     = useState(1);
  const ITEMS_PER_PAGE = 8;

  const [sort, setSort]     = useState({ key: 'created_at', dir: 'desc' });
  const [showModal, setShowModal]     = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm]     = useState({ name: '', email: '', role: 'user' });

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    let vA = (a[sort.key] || '').toString().toLowerCase();
    let vB = (b[sort.key] || '').toString().toLowerCase();
    return vA < vB ? (sort.dir === 'asc' ? -1 : 1) : vA > vB ? (sort.dir === 'asc' ? 1 : -1) : 0;
  });

  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const openEdit = (u) => { setEditingUser(u); setForm({ name: u.name, email: u.email, role: u.role }); setShowModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    setActionConfirm({
      title: 'Update User Permissions?',
      message: `Modify details for ${form.email}? This may affect their access.`,
      onConfirm: async () => {
        try {
          await api.put(`/users/${editingUser.id}`, form);
          setShowModal(false);
          toast.success('User updated');
          fetchData();
        } catch { toast.error('Error updating account'); }
        setActionConfirm(null);
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <UserStatsCards users={users} />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input type="text" placeholder="Search user database..." value={search} onChange={e => setSearch(e.target.value)} 
            className="w-full sm:w-64 bg-slate-50 outline-none px-5 py-3 rounded-2xl font-medium focus:ring-2 focus:ring-slate-100 transition-all shadow-inner" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <SortHeader label="Name"   sortKey="name"       currentSort={sort} setSort={setSort} />
                <SortHeader label="Email"  sortKey="email"      currentSort={sort} setSort={setSort} />
                <SortHeader label="Role"   sortKey="role"       currentSort={sort} setSort={setSort} />
                <SortHeader label="Joined" sortKey="created_at" currentSort={sort} setSort={setSort} />
                <th className="py-4 px-3 font-black text-slate-400 text-[10px] tracking-widest text-right uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-5 px-2 text-sm font-black text-slate-700">{u.name}</td>
                  <td className="py-5 px-2 text-sm text-slate-500 font-medium">{u.email}</td>
                  <td className="py-5 px-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>{u.role}</span>
                  </td>
                  <td className="py-5 px-2 text-sm text-slate-400">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="py-5 px-2 text-right">
                    <button onClick={() => openEdit(u)} className="p-2 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Edit size={16}/></button>
                    <button onClick={() => setDeleteConfirm({ type: 'user', id: u.id })} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all ml-1"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length > ITEMS_PER_PAGE && (
          <div className="flex justify-between items-center pt-5 mt-2 border-t border-slate-100">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="text-xs font-black px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-100 transition-all disabled:opacity-30">PREV</button>
            <span className="text-xs font-black text-slate-400 tracking-widest">PAGE {page} OF {Math.ceil(filtered.length / ITEMS_PER_PAGE)}</span>
            <button disabled={page * ITEMS_PER_PAGE >= filtered.length} onClick={() => setPage(page + 1)} className="text-xs font-black px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-100 transition-all disabled:opacity-30">NEXT</button>
          </div>
        )}
      </div>

      {showModal && <UserEditModal form={form} setForm={setForm} onClose={() => setShowModal(false)} onSubmit={handleSave} />}
    </div>
  );
}
