import { ShoppingCart, Heart } from 'lucide-react';

/**
 * ProductInfoPanel
 * Detail section of ProductDetail page: categorization, price, description, and action buttons.
 */
export default function ProductInfoPanel({ product, quantity, setQuantity, handleAddToCart, handleFavorite, isLiked }) {
  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center py-4">
      <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wide">
        <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full">{product.category}</span>
        <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full">{product.pet_type}</span>
      </div>

      <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-4 text-slate-900 leading-tight">{product.name}</h1>

      <p className="text-2xl font-black text-rose-600 mb-2">Rs {parseFloat(product.price).toFixed(2)}</p>
      <p className="text-sm text-slate-500 mb-6 font-medium">
        {parseInt(product.stock) > 0
          ? <span className="text-emerald-600 font-semibold">✓ In Stock ({product.sold || 0} sold)</span>
          : <span className="text-red-500 font-semibold">✗ Out of Stock</span>
        }
      </p>

      <div className="text-base text-slate-600 mb-8 leading-relaxed max-w-xl italic">
        <p>"{product.description || "No description provided for this high-quality product. Your pet will absolutely love it!"}"</p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="text-xs font-black uppercase tracking-wider text-slate-400">Qty</div>
        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-2 hover:bg-slate-50 font-bold text-lg transition-colors">-</button>
          <div className="px-4 py-2 border-x border-slate-100 font-black text-base min-w-[3.5rem] text-center text-slate-700">{quantity}</div>
          <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-2 hover:bg-slate-50 font-bold text-lg transition-colors">+</button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleAddToCart}
          disabled={parseInt(product.stock) <= 0}
          className="flex-[2] bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xl shadow-slate-200 flex items-center justify-center disabled:opacity-50 disabled:grayscale"
        >
          <ShoppingCart className="mr-2" size={20} /> Add to Cart
        </button>
        <button
          onClick={handleFavorite}
          className={`flex-1 py-4 rounded-2xl transition-all border-2 flex items-center justify-center group shadow-sm font-bold text-sm ${isLiked
              ? 'bg-rose-50 text-rose-500 border-rose-100 hover:bg-rose-100'
              : 'bg-white text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 border-slate-100'
            }`}
        >
          <Heart size={22} fill={isLiked ? 'currentColor' : 'none'} className="transition-all" />
        </button>
      </div>
    </div>
  );
}
