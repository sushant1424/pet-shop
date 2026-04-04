import { useState } from 'react';
import toast from 'react-hot-toast';
import { Eye } from 'lucide-react';
import api from '../../../lib/api';
import SortHeader from '../SortHeader';
import OrderStatsCards from '../orders/OrderStatsCards';
import OrderViewModal from '../orders/OrderViewModal';
import OrderEditModal from '../orders/OrderEditModal';

const getStatusStyles = (status) => {
  switch(status) {
    case 'pending':    return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    case 'processing': return 'bg-blue-100 text-blue-800 border border-blue-200';
    case 'deployed':   return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
    case 'completed':  return 'bg-green-100 text-green-800 border border-green-200';
    case 'cancelled':  return 'bg-red-100 text-red-800 border border-red-200';
    default:           return 'bg-slate-100 text-slate-600 border border-slate-200';
  }
};

/**
 * OrdersTab — Views and manages fulfillment status of all user purchases.
 */
export default function OrdersTab({ orders, fetchData, setActionConfirm }) {
  const [search, setSearch]           = useState('');
  const [page, setPage]               = useState(1);
  const [sort, setSort]               = useState({ key: 'created_at', dir: 'desc' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [activeItem, setActiveItem]   = useState(null);
  const [form, setForm]               = useState({ status: 'pending' });
  const ITEMS_PER_PAGE = 8;

  const filtered = orders.filter(o =>
    o.user_name?.toLowerCase().includes(search.toLowerCase()) || String(o.id).includes(search)
  );

  const sorted = [...filtered].sort((a, b) => {
    let vA = a[sort.key], vB = b[sort.key];
    if (typeof vA === 'string') vA = vA.toLowerCase();
    if (typeof vB === 'string') vB = vB.toLowerCase();
    if (!isNaN(parseFloat(vA)) && !isNaN(parseFloat(vB))) { vA = parseFloat(vA); vB = parseFloat(vB); }
    return vA < vB ? (sort.dir === 'asc' ? -1 : 1) : vA > vB ? (sort.dir === 'asc' ? 1 : -1) : 0;
  });

  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const openEdit = (o) => { setActiveItem(o); setForm({ status: o.status || 'pending' }); setShowEditModal(true); };
  const openView = (o) => { setActiveItem(o); setShowViewModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    setActionConfirm({
      title: 'Update Order Status?',
      message: `Change order #${1000 + parseInt(activeItem.id)} to "${form.status}"?`,
      onConfirm: async () => {
        try {
          await api.put(`/orders/${activeItem.id}/status`, form);
          setShowEditModal(false);
          toast.success('Order updated');
          fetchData();
        } catch { toast.error('Error updating order'); }
        setActionConfirm(null);
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <OrderStatsCards orders={orders} />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input type="text" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-64 bg-slate-50 outline-none px-4 py-2.5 rounded-xl font-medium" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <SortHeader label="Order ID"  sortKey="id"           currentSort={sort} setSort={setSort} />
                <SortHeader label="Customer"  sortKey="user_name"    currentSort={sort} setSort={setSort} />
                <th className="py-3 px-2 text-left font-bold text-slate-400 text-[10px] uppercase tracking-wider">Products</th>
                <SortHeader label="Date"      sortKey="created_at"   currentSort={sort} setSort={setSort} />
                <SortHeader label="Total"     sortKey="total_amount" currentSort={sort} setSort={setSort} />
                <SortHeader label="Status"    sortKey="status"       currentSort={sort} setSort={setSort} />
                <th className="py-4 px-3 font-bold text-slate-400 text-xs tracking-wider text-right uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.map(o => {
                const items = typeof o.items === 'string' ? JSON.parse(o.items) : (o.items || []);
                return (
                  <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-2 font-bold text-sm text-slate-700">#{1000 + parseInt(o.id)}</td>
                    <td className="py-4 px-2">
                      <div className="font-bold text-sm text-slate-800">{o.user_name}</div>
                      <div className="text-[11px] text-slate-500">{o.user_email}</div>
                    </td>
                    <td className="py-4 px-2 max-w-[200px]">
                      {items.length > 0
                        ? <div>
                            <p className="font-bold text-sm text-slate-800 truncate" title={items[0].product_name}>{items[0].product_name}</p>
                            {items.length > 1 && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">+{items.length - 1} more</p>}
                          </div>
                        : <span className="text-slate-400 text-xs italic">No items</span>
                      }
                    </td>
                    <td className="py-4 px-2 text-sm text-slate-500">{new Date(o.created_at).toLocaleDateString()}</td>
                    <td className="py-4 px-2 font-black text-slate-900 text-sm">Rs {parseFloat(o.total_amount).toFixed(2)}</td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-1 text-xs font-bold uppercase rounded-md ${getStatusStyles(o.status || 'pending')}`}>{o.status || 'pending'}</span>
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

        {filtered.length > ITEMS_PER_PAGE && (
          <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-100">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Previous</button>
            <span className="text-sm font-medium text-slate-400">Page {page} of {Math.ceil(filtered.length / ITEMS_PER_PAGE)}</span>
            <button disabled={page * ITEMS_PER_PAGE >= filtered.length} onClick={() => setPage(page + 1)} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Next</button>
          </div>
        )}
      </div>

      {showEditModal && <OrderEditModal form={form} setForm={setForm} onClose={() => setShowEditModal(false)} onSubmit={handleSave} />}
      {showViewModal && <OrderViewModal order={activeItem} onClose={() => setShowViewModal(false)} />}
    </div>
  );
}
