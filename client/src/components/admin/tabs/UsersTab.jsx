import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../../lib/api';
import SortHeader from '../SortHeader';

/**
 * UsersTab Component
 * Shows a table of all registered users.
 * Allows admins to search, sort, edit roles, and delete accounts.
 */
export default function UsersTab({ users, fetchData, setActionConfirm, setDeleteConfirm }) {
  // Local state for searching and pagination
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Sorting state (what column and connection we are sorting by)
  const [sort, setSort] = useState({ key: 'created_at', dir: 'desc' });

  // Modal State for editing specifically
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'user' });

  // 1. FILTERING: Only keep users that match the search box
  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // 2. SORTING: Sort the filtered array based on our `sort` state
  const sorted = [...filtered].sort((a, b) => {
    let valA = a[sort.key] || '';
    let valB = b[sort.key] || '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    
    if (valA < valB) return sort.dir === 'asc' ? -1 : 1;
    if (valA > valB) return sort.dir === 'asc' ? 1 : -1;
    return 0;
  });

  // 3. PAGINATION: Slice out only the 8 users needed for the current page
  const paginatedList = sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Opens the edit popup and loads the user's data into the form
  const openEdit = (u) => {
    setEditingUser(u);
    setForm({ name: u.name, email: u.email, role: u.role });
    setShowModal(true);
  };

  // Called when submitting the edit form
  const handleSave = (e) => {
    e.preventDefault();
    // Ask the global confirmation popup to verify this action
    setActionConfirm({
      title: 'Update User?',
      message: `Are you sure you want to save changes for user ${form.email}?`,
      onConfirm: async () => {
        try {
          // Send the PUT request to update the user in the database
          await api.put(`/users/${editingUser.id}`, form);
          setShowModal(false);
          toast.success('User updated');
          fetchData(); // Refresh the main data so the table updates
        } catch (err) { 
          toast.error('Error updating user'); 
        }
        setActionConfirm(null); // Close the confirmation box
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-slate-400 mb-1">Total Users</p>
          <h4 className="text-3xl font-black text-slate-800">{users.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-slate-400 mb-1">Active Users</p>
          <h4 className="text-3xl font-black text-slate-800">{users.filter(u => u.role === 'user').length}</h4>
        </div>
      </div>

      {/* Main Table Box */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6">
        
        {/* Search Bar Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="w-full sm:w-64 relative">
            <input 
              type="text" 
              placeholder="Search users..." 
              value={search} 
              // React sets state automatically on every keystroke
              onChange={e => setSearch(e.target.value)} 
              className="w-full bg-slate-50 border-none outline-none px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-slate-200 text-sm font-medium transition-all" 
            />
          </div>
        </div>
        
        {/* User Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <SortHeader label="Name" sortKey="name" currentSort={sort} setSort={setSort} />
                <SortHeader label="Email" sortKey="email" currentSort={sort} setSort={setSort} />
                <SortHeader label="Role" sortKey="role" currentSort={sort} setSort={setSort} />
                <SortHeader label="Joined" sortKey="created_at" currentSort={sort} setSort={setSort} />
                <th className="py-4 px-3 font-bold text-slate-400 text-xs tracking-wider text-right uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {/* Loop through our 8 paginated users and render a row for each */}
              {paginatedList.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-2 text-sm font-bold text-slate-700">{u.name}</td>
                  <td className="py-4 px-2 text-sm text-slate-500">{u.email}</td>
                  <td className="py-4 px-2 text-sm font-medium"><span className="bg-slate-100 px-2 py-0.5 rounded-full">{u.role}</span></td>
                  <td className="py-4 px-2 text-sm text-slate-500">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="py-4 px-2 text-right">
                    <button onClick={() => openEdit(u)} className="p-1.5 text-slate-400 hover:text-blue-500"><Edit size={16}/></button>
                    {/* Trigger global delete confirm if clicked */}
                    <button onClick={() => setDeleteConfirm({ type: 'user', id: u.id })} className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {filtered.length > itemsPerPage && (
          <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-100">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Previous</button>
            <span className="text-sm font-medium text-slate-400">Page {page} of {Math.ceil(filtered.length / itemsPerPage)}</span>
            <button disabled={page * itemsPerPage >= filtered.length} onClick={() => setPage(page + 1)} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Next</button>
          </div>
        )}
      </div>

      {/* Edit Form Modal (only visible when showModal is true) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-6">Edit User</h2>
            <div className="space-y-4">
              <input type="text" required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl outline-none" placeholder="Name" />
              <input type="email" required value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl outline-none" placeholder="Email" />
              <select value={form.role} onChange={e=>setForm({...form, role: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl outline-none">
                 <option value="user">User</option>
                 <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex gap-4 mt-6">
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 p-3 bg-slate-100 font-bold rounded-xl">Cancel</button>
              <button type="submit" className="flex-1 p-3 bg-slate-900 text-white font-bold rounded-xl">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
