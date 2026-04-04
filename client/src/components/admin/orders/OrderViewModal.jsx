import { getImageUrl } from '../../../lib/imageUrl';

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

// Modal showing full details of a single order: customer info + itemised products
export default function OrderViewModal({ order, onClose }) {
  if (!order) return null;
  const items = typeof order.items === 'string' ? JSON.parse(order.items) : (order.items || []);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-800">Order #{1000 + parseInt(order.id)}</h2>
          <span className={`px-3 py-1 text-[11px] font-bold uppercase rounded-full ${getStatusStyles(order.status || 'pending')}`}>
            {order.status || 'pending'}
          </span>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Customer Details</p>
          <p className="font-bold text-slate-900">{order.user_name}</p>
          <p className="text-sm text-slate-600 mb-2">{order.user_email}</p>
          <p className="text-xs text-slate-500">Ordered on: {new Date(order.created_at).toLocaleString()}</p>
        </div>

        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Order Items</p>
        <div className="space-y-3 mb-6">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-center bg-white border border-slate-100 p-3 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                {item.image_url && <img src={getImageUrl(item.image_url)} alt="product" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-slate-900 line-clamp-1">{item.product_name || `Product #${item.product_id}`}</p>
                <p className="text-xs text-slate-500">Qty: {item.quantity} × Rs {parseFloat(item.price).toFixed(2)}</p>
              </div>
              <p className="font-black text-sm text-emerald-600">Rs {(item.quantity * parseFloat(item.price)).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center p-4 bg-slate-900 text-white rounded-2xl mb-6">
          <span className="font-bold">Total Amount</span>
          <span className="text-xl font-black text-emerald-400">Rs {parseFloat(order.total_amount).toFixed(2)}</span>
        </div>

        <button onClick={onClose} className="w-full py-3.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
          Close Details
        </button>
      </div>
    </div>
  );
}
