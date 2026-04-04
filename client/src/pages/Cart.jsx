import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import api, { SERVER_URL } from '../lib/api';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getImageUrl } from '../lib/imageUrl';

export default function Cart() {
  const { cart, removeFromCart, clearCart, user } = useStore();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);

  // Calculate the total cart value using the reduce() function
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // This function runs when the user clicks 'Proceed to Checkout'. 
  // It checks if they are logged in and have a shipping address.
  const triggerCheckout = () => {
    if (!user) {
      toast.error("Please login to checkout");
      navigate('/login');
      return;
    }
    if (!user.shipping_address) {
      toast.error("Please add a shipping address in your Profile first");
      navigate('/dashboard');
      return;
    }
    setConfirmModal(true);
  };

  // If the user passes the checks, this saves the cart items to our database as an official Order.
  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      const items = cart.map(i => ({ product_id: i.id, quantity: i.quantity, price: i.price }));
      await api.post('/orders', { items, total_amount: totalAmount * 1.08 });
      
      clearCart();
      toast.success("Success: Your order has been placed securely!");
      setCheckoutLoading(false);
      setConfirmModal(false);
      navigate('/dashboard');
      
    } catch (err) {
      toast.error("Checkout failed. Please try again.");
      console.error(err);
      setCheckoutLoading(false);
    }
  };

  // Removes a specific item from the shopping cart globally using our Zustand store.
  const confirmDelete = () => {
    if (deleteModal) {
      removeFromCart(deleteModal);
      setDeleteModal(null);
      toast('Item removed from cart', { icon: '🗑️' });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-6 shadow-inner">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 max-w-sm text-lg">Looks like you haven't added anything to your cart yet.</p>
        <button onClick={() => navigate('/products')} className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-md">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center p-4 bg-card rounded-lg border border-border shadow-sm hover:shadow transition-shadow">
              <div className="w-24 h-24 bg-muted rounded-md border border-border overflow-hidden mr-4 shrink-0 relative">
                {item.image_url ? (
                  <img src={getImageUrl(item.image_url)} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No Image</div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-1 line-clamp-1">{item.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 font-medium uppercase tracking-wide">{item.category}</p>
                <div className="flex items-center gap-6">
                  <span className="font-extrabold text-primary text-lg">Rs {parseFloat(item.price).toFixed(2)}</span>
                  <span className="text-sm font-bold border-2 border-border px-3 py-1 rounded-md bg-transparent">Qty: {item.quantity}</span>
                </div>
              </div>
              <div className="pl-6 border-l border-border h-full flex items-center">
                 <button 
                   onClick={() => setDeleteModal(item.id)}
                   className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                   title="Remove item"
                 >
                   <Trash2 size={20} />
                 </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm sticky top-24">
            <h2 className="font-extrabold text-xl mb-4 pb-4 border-b border-border">Order Summary</h2>
            <div className="space-y-4 mb-8 text-lg">
              <div className="flex justify-between text-muted-foreground">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-foreground">Rs {totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span className="font-medium">Shipping</span>
                <span className="font-bold text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span className="font-medium">Tax (Est)</span>
                <span className="font-bold text-foreground">Rs {(totalAmount * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-4 mt-4 flex justify-between font-black text-2xl">
                <span>Total</span>
                <span className="text-primary">Rs {(totalAmount * 1.08).toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={triggerCheckout} 
              disabled={checkoutLoading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold text-base flex items-center justify-center hover:bg-primary/90 active:scale-[0.98] disabled:opacity-70 transition-all shadow-md"
            >
              {checkoutLoading ? "Processing..." : "Proceed to Checkout"} 
              {!checkoutLoading && <ArrowRight size={18} className="ml-2" />}
            </button>

          </div>
        </div>
      </div>

      {confirmModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setConfirmModal(false)}>
           <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-in-center" onClick={e => e.stopPropagation()}>
              <h3 className="text-2xl font-black mb-3 text-slate-900">Confirm Order</h3>
              <p className="text-slate-500 mb-8 font-medium">Your total is <strong className="text-slate-900">Rs {(totalAmount * 1.08).toFixed(2)}</strong>. It will be shipped to <strong className="text-slate-700">{user?.shipping_address}</strong>. Are you ready to submit your order?</p>
              <div className="flex gap-4">
                 <button onClick={() => setConfirmModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
                 <button onClick={handleCheckout} disabled={checkoutLoading} className="flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center disabled:opacity-70">
                   {checkoutLoading ? <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div> : 'Confirm'}
                 </button>
              </div>
           </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setDeleteModal(null)}>
           <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-in-center" onClick={e => e.stopPropagation()}>
              <h3 className="text-xl font-black mb-3 text-slate-900">Remove from Cart?</h3>
              <p className="text-slate-500 mb-8 font-medium">Are you sure you want to remove this item from your shopping cart?</p>
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
