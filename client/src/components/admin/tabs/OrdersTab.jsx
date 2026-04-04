import { useState } from 'react';
import toast from 'react-hot-toast';
import { Eye } from 'lucide-react';
import api from '../../../lib/api';
import SortHeader from '../SortHeader';
import { getImageUrl } from '../../../lib/imageUrl';

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

  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
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
    setActiveItem(o);
    setForm({ status: o.status || 'pending' });
    setShowEditModal(true);
  };

  const openView = (o) => {
    setActiveItem(o);
    setShowViewModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setActionConfirm({
      title: 'Update Order Format?',
      // Parsing the ID back into a readable receipt format (1000 + DB ID)
      message: `Are you sure you want to change order #${1000 + parseInt(activeItem.id)} to ${form.status}?`,
      onConfirm: async () => {
        try {
          await api.put(`/orders/${activeItem.id}/status`, form);
          setShowEditModal(false);
          toast.success('Order updated');
          fetchData(); 
        } catch (err) { toast.error('Error updating order'); }
        setActionConfirm(null);
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-slate-400 mb-1">Total Orders</p>
          <h4 className="text-3xl font-black text-slate-800">{orders.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-yellow-500 mb-1">Pending</p>
          <h4 className="text-3xl font-black text-slate-800">{orders.filter(o => o.status === 'pending').length}</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-blue-500 mb-1">Processing</p>
          <h4 className="text-3xl font-black text-slate-800">{orders.filter(o => o.status === 'processing').length}</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-emerald-500 mb-1">Completed</p>
          <h4 className="text-3xl font-black text-slate-800">{orders.filter(o => o.status === 'completed').length}</h4>
        </div>
      </div>

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
                <th className="py-3 px-2 text-left font-bold text-slate-400 text-[10px] uppercase tracking-wider cursor-default">Products</th>
                <SortHeader label="Date" sortKey="created_at" currentSort={sort} setSort={setSort} />
                <SortHeader label="Total" sortKey="total_amount" currentSort={sort} setSort={setSort} />
                <SortHeader label="Status" sortKey="status" currentSort={sort} setSort={setSort} />
                <th className="py-4 px-3 font-bold text-slate-400 text-xs tracking-wider text-right uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedList.map(o => {
                const safeItems = typeof o.items === 'string' ? JSON.parse(o.items) : (o.items || []);
                return (
                <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-2 font-bold text-sm text-slate-700">#{1000 + parseInt(o.id)}</td>
                  <td className="py-4 px-2">
                    <div className="font-bold text-sm text-slate-800">{o.user_name}</div>
                    <div className="text-[11px] text-slate-500">{o.user_email}</div>
                  </td>
                  <td className="py-4 px-2 max-w-[200px]">
                    {safeItems && safeItems.length > 0 ? (
                      <div>
                        <p className="font-bold text-sm text-slate-800 truncate" title={safeItems[0].product_name}>{safeItems[0].product_name}</p>
                        {safeItems.length > 1 && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">+{safeItems.length - 1} more items</p>}
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs italic">No items listed</span>
                    )}
                  </td>
                  <td className="py-4 px-2 text-sm text-slate-500">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="py-4 px-2 font-black text-slate-900 text-sm">Rs {parseFloat(o.total_amount).toFixed(2)}</td>
                  <td className="py-4 px-2">
                    <span className={`px-2 py-1 text-xs font-bold uppercase rounded-md ${getStatusStyles(o.status || 'pending')}`}>
                      {o.status || 'pending'}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <button onClick={() => openView(o)} className="text-slate-400 hover:text-blue-500 p-1"><Eye size={16}/></button>
                    <button onClick={() => openEdit(o)} className="text-blue-500 text-xs font-bold hover:underline ml-2">Edit Status</button>
                  </td>
                </tr>
                );
              })}
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

      {/* Edit Status Modal */}
      {showEditModal && (
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
              <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 p-3 bg-slate-100 font-bold rounded-xl">Cancel</button>
              <button type="submit" className="flex-1 p-3 bg-slate-900 text-white font-bold rounded-xl">Save</button>
            </div>
          </form>
        </div>
      )}

      {/* View Details Modal */}
      {showViewModal && activeItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowViewModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-black text-slate-800">Order #{1000 + parseInt(activeItem.id)}</h2>
               <span className={`px-3 py-1 text-[11px] font-bold uppercase rounded-full ${getStatusStyles(activeItem.status || 'pending')}`}>
                  {activeItem.status || 'pending'}
               </span>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-2xl mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Customer Details</p>
              <p className="font-bold text-slate-900">{activeItem.user_name}</p>
              <p className="text-sm text-slate-600 mb-2">{activeItem.user_email}</p>
              <p className="text-xs text-slate-500">Ordered on: {new Date(activeItem.created_at).toLocaleString()}</p>
            </div>
            
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Order Items</p>
            <div className="space-y-3 mb-6">
              {(typeof activeItem.items === 'string' ? JSON.parse(activeItem.items) : (activeItem.items || [])).map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center bg-white border border-slate-100 p-3 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                    {item.image_url && <img src={getImageUrl(item.image_url)} alt="product" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-slate-900 line-clamp-1">{item.product_name || `Unknown Product #${item.product_id}`}</p>
                    <p className="text-xs text-slate-500">Qty: {item.quantity} × Rs {parseFloat(item.price).toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm text-emerald-600">Rs {(item.quantity * parseFloat(item.price)).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center p-4 bg-slate-900 text-white rounded-2xl mb-6">
               <span className="font-bold">Total Amount</span>
               <span className="text-xl font-black text-emerald-400">Rs {parseFloat(activeItem.total_amount).toFixed(2)}</span>
            </div>

            <button onClick={() => setShowViewModal(false)} className="w-full py-3.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
