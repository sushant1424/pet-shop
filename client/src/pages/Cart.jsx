import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import useStore from '../store/useStore';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

/**
 * Cart page — shows current cart items and checkout flow.
 */
export default function Cart() {
  const { cart, removeFromCart, clearCart, user } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading]           = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteModal, setDeleteModal]   = useState(null);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const triggerCheckout = () => {
    if (!user) { toast.error('Please login to checkout'); navigate('/login'); return; }
    if (!user.shipping_address) { toast.error('Add a shipping address in your Profile first'); navigate('/dashboard'); return; }
    setConfirmModal(true);
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const items = cart.map(i => ({ product_id: i.id, quantity: i.quantity, price: i.price }));
      await api.post('/orders', { items, total_amount: totalAmount * 1.08 });
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/dashboard');
    } catch { toast.error('Checkout failed. Please try again.'); }
    finally { setLoading(false); setConfirmModal(false); }
  };

  const confirmDelete = () => { if (deleteModal) { removeFromCart(deleteModal); setDeleteModal(null); toast('Item removed', { icon: '🗑️' }); } };

  if (cart.length === 0) return (
    <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-6 shadow-inner"><ShoppingBag size={40} /></div>
      <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
      <p className="text-muted-foreground mb-8 max-w-sm text-lg">You haven't added anything yet.</p>
      <button onClick={() => navigate('/products')} className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-md">Start Shopping</button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-4">
          {cart.map(item => <CartItem key={item.id} item={item} onRemove={setDeleteModal} />)}
        </div>
        <CartSummary totalAmount={totalAmount} onCheckout={triggerCheckout} loading={loading} />
      </div>

      {/* Checkout Confirm Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setConfirmModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-black mb-3 text-slate-900">Confirm Order</h3>
            <p className="text-slate-500 mb-8 font-medium">Total <strong className="text-slate-900">Rs {(totalAmount * 1.08).toFixed(2)}</strong> will be shipped to <strong className="text-slate-700">{user?.shipping_address}</strong>.</p>
            <div className="flex gap-4">
              <button onClick={() => setConfirmModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleCheckout} disabled={loading} className="flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-70">
                {loading ? <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mx-auto" /> : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setDeleteModal(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-black mb-3 text-slate-900">Remove from Cart?</h3>
            <p className="text-slate-500 mb-8 font-medium">Are you sure you want to remove this item?</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-md transition-colors">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
