import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../../lib/api';
import SortHeader from '../SortHeader';

// Visual utility for determining what color a badge should be
const getStatusStyles = (status) => {
  switch(status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    case 'processing': return 'bg-blue-100 text-blue-800 border border-blue-200';
    case 'deployed': return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
    case 'completed': return 'bg-green-100 text-green-800 border border-green-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border border-red-200';
    default: return 'bg-slate-100 text-slate-600 border border-slate-200';
  }
};

/**
 * OrdersTab Component
 * Views and edits the fulfillment status of user purchases.
 */
export default function OrdersTab({ orders, fetchData, setActionConfirm }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const [sort, setSort] = useState({ key: 'created_at', dir: 'desc' });

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ status: 'pending' });

  // Optional chaining (?.) is used to prevent crashes if 'user_name' is missing
  const filtered = orders.filter(o => 
    o.user_name?.toLowerCase().includes(search.toLowerCase()) || 
    String(o.id).includes(search)
  );
  
  const sorted = [...filtered].sort((a, b) => {
    let valA = a[sort.key];
    let valB = b[sort.key];
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (!isNaN(parseFloat(valA)) && !isNaN(parseFloat(valB))) {
      valA = parseFloat(valA); valB = parseFloat(valB);
    }
    if (valA < valB) return sort.dir === 'asc' ? -1 : 1;
    if (valA > valB) return sort.dir === 'asc' ? 1 : -1;
    return 0;
  });
  
  const paginatedList = sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const openEdit = (o) => {
    setEditingItem(o);
    setForm({ status: o.status || 'pending' });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setActionConfirm({
      title: 'Update Order Format?',
      // Parsing the ID back into a readable receipt format (1000 + DB ID)
      message: `Are you sure you want to change order #${1000 + parseInt(editingItem.id)} to ${form.status}?`,
      onConfirm: async () => {
        try {
          await api.put(`/orders/${editingItem.id}/status`, form);
          setShowModal(false);
          toast.success('Order updated');
          fetchData(); 
        } catch (err) { toast.error('Error updating order'); }
        setActionConfirm(null);
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input type="text" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className="w-full sm:w-64 bg-slate-50 outline-none px-4 py-2.5 rounded-xl font-medium" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <SortHeader label="Order ID" sortKey="id" currentSort={sort} setSort={setSort} />
                <SortHeader label="Customer" sortKey="user_name" currentSort={sort} setSort={setSort} />
                <SortHeader label="Date" sortKey="created_at" currentSort={sort} setSort={setSort} />
                <SortHeader label="Total" sortKey="total_amount" currentSort={sort} setSort={setSort} />
                <SortHeader label="Status" sortKey="status" currentSort={sort} setSort={setSort} />
                <th className="py-4 px-3 font-bold text-slate-400 text-xs tracking-wider text-right uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedList.map(o => (
                <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-2 font-bold text-sm text-slate-700">#{1000 + parseInt(o.id)}</td>
                  <td className="py-4 px-2">
                    <div className="font-bold text-sm text-slate-800">{o.user_name}</div>
                    <div className="text-xs text-slate-500">{o.user_email}</div>
                  </td>
                  <td className="py-4 px-2 text-sm text-slate-500">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="py-4 px-2 font-black text-slate-900 text-sm">Rs {parseFloat(o.total_amount).toFixed(2)}</td>
                  <td className="py-4 px-2">
                    <span className={`px-2 py-1 text-xs font-bold uppercase rounded-md ${getStatusStyles(o.status || 'pending')}`}>
                      {o.status || 'pending'}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <button onClick={() => openEdit(o)} className="text-blue-500 text-xs font-bold hover:underline">Edit Status</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > itemsPerPage && (
          <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-100">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Previous</button>
            <span className="text-sm font-medium text-slate-400">Page {page} of {Math.ceil(filtered.length / itemsPerPage)}</span>
            <button disabled={page * itemsPerPage >= filtered.length} onClick={() => setPage(page + 1)} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Next</button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-6">Update Order Status</h2>
            <div className="space-y-4">
              <select value={form.status} onChange={e=>setForm({...form, status: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl outline-none">
                 <option value="pending">Pending</option>
                 <option value="processing">Processing</option>
                 <option value="deployed">Deployed</option>
                 <option value="completed">Completed</option>
                 <option value="cancelled">Cancelled</option>
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
