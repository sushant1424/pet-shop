// Order summary sidebar for the Cart page
import { ArrowRight } from 'lucide-react';

export default function CartSummary({ totalAmount, onCheckout, loading }) {
  return (
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
          onClick={onCheckout}
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold text-base flex items-center justify-center hover:bg-primary/90 active:scale-[0.98] disabled:opacity-70 transition-all shadow-md"
        >
          {loading ? 'Processing...' : 'Proceed to Checkout'}
          {!loading && <ArrowRight size={18} className="ml-2" />}
        </button>
      </div>
    </div>
  );
}
