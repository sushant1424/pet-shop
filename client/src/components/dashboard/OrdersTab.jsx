import { useState } from 'react';
import { ChevronLeft, ChevronRight, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import api, { SERVER_URL } from '../../lib/api';
import { getImageUrl } from '../../lib/imageUrl';

/**
 * Visual utility mapping order statuses to their respective Tailwind CSS colors
 */
const getStatusStyles = (status) => {
  switch(status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'deployed': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-secondary text-secondary-foreground border-border';
  }
};

/**
 * OrdersTab Component
 * Shows a user all their past purchases and allows them to cancel pending ones.
 */
export default function OrdersTab({ orders, setOrders }) {
  // We use page state to handle slicing the array so it doesn't get too long vertically
  const [ordersPage, setOrdersPage] = useState(1);
  const itemsPerPage = 2;

  // State to hold the ID of the order currently being cancelled
  const [cancelModal, setCancelModal] = useState(null);

  // Pagination Math
  const paginatedOrders = orders.slice((ordersPage - 1) * itemsPerPage, ordersPage * itemsPerPage);
  const totalOrdersPages = Math.ceil(orders.length / itemsPerPage);

  // Function to actually erase the order using an API call
  const handleCancelOrder = async () => {
    if (!cancelModal) return;
    try {
      await api.put(`/orders/${cancelModal}/cancel`);
      // Update the local react state to show 'cancelled' immediately without needing a refresh
      setOrders(orders.map(o => o.id === cancelModal ? { ...o, status: 'cancelled' } : o));
      toast.success('Order cancelled successfully', { duration: 4000 });
    } catch (err) {
      toast.error('Failed to cancel order');
    }
    setCancelModal(null); // Close the modal
  };

  return (
    <div className="space-y-6">
      {/* If the array is completely empty, show a sad empty box */}
      {orders.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-xl border border-border">
          <Package size={48} className="mx-auto text-muted-foreground opacity-20 mb-4" />
          <p className="text-xl font-medium text-muted-foreground">No orders found.</p>
        </div>
      ) : (
        <>
          {/* We use '.map()' to loop through our array and return HTML for each order */}
          {paginatedOrders.map(order => (
            <div key={order.id} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-border text-sm">
                <div>
                  <span className="text-muted-foreground">Order ID:</span> 
                  <span className="font-bold border border-border px-2 py-0.5 rounded-md ml-2">#{1000 + parseInt(order.id)}</span>
                  <span className="mx-4 text-border hidden sm:inline">|</span>
                  <br className="sm:hidden" />
                  <span className="text-muted-foreground mt-2 sm:mt-0 inline-block">Date:</span> 
                  <span className="font-medium mr-4">{new Date(order.created_at).toLocaleDateString()}</span>
                  <span className={`px-3 py-1 border rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusStyles(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="text-right flex flex-col items-end gap-2 shrink-0">
                  <div>
                      <span className="text-muted-foreground">Total:</span> 
                      <span className="font-bold text-lg text-primary ml-1">Rs {parseFloat(order.total_amount).toFixed(2)}</span>
                  </div>
                  
                  {/* Conditional rendering: Only show cancel button if status is still pending */}
                  {order.status === 'pending' && (
                      <button onClick={() => setCancelModal(order.id)} className="text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition-colors">
                        Cancel Order
                      </button>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                {/* Loop again through the nested array of items INSIDE this specific order */}
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-muted/30 p-3 rounded-lg border border-border/50">
                     <div className="font-medium flex items-center gap-3">
                       {item.image_url ? (
                         <img src={getImageUrl(item.image_url)} alt={item.product_name} className="w-10 h-10 object-cover rounded-md border border-border" />
                       ) : (
                         <div className="w-10 h-10 bg-slate-200 rounded-md"></div>
                       )}
                       <span className="line-clamp-1">{item.product_name || `Product ID: ${item.product_id}`}</span>
                     </div>
                     <div className="text-muted-foreground font-medium shrink-0 ml-4">
                       Qty: {item.quantity} × Rs {parseFloat(item.price).toFixed(2)}
                     </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Pagination Controllers block */}
          {totalOrdersPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-border">
              <button onClick={() => setOrdersPage(p => Math.max(1, p - 1))} disabled={ordersPage === 1} className="p-2 border border-border rounded-lg bg-card hover:bg-muted disabled:opacity-50 transition-colors"><ChevronLeft size={20} /></button>
              <span className="font-semibold text-sm">Page {ordersPage} of {totalOrdersPages}</span>
              <button onClick={() => setOrdersPage(p => Math.min(totalOrdersPages, p + 1))} disabled={ordersPage === totalOrdersPages} className="p-2 border border-border rounded-lg bg-card hover:bg-muted disabled:opacity-50 transition-colors"><ChevronRight size={20} /></button>
            </div>
          )}
        </>
      )}

      {/* Confirmation User Modal that pops up on top of the screen */}
      {cancelModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setCancelModal(null)}>
           <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-in-center" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl font-black mb-3 text-slate-900">Cancel Order?</h3>
              <p className="text-slate-500 mb-8 font-medium">Are you sure you want to cancel Order <span className="font-bold border border-slate-200 px-1 py-0.5 rounded">#{1000 + parseInt(cancelModal)}</span>? This action cannot be undone.</p>
              <div className="flex gap-4">
                 <button onClick={() => setCancelModal(null)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Go Back</button>
                 <button onClick={handleCancelOrder} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-md transition-colors">Yes, Cancel</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
