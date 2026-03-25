import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { getImageUrl } from '../lib/imageUrl';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { user, addToCart, favorites, addFavorite, removeFavorite } = useStore();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const imgSrc = getImageUrl(product.image_url);
  
  const isLiked = favorites.some(f => f.id === product.id);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to save favorites');
      return;
    }

    try {
      if (isLiked) {
        await api.delete(`/users/${user.id}/favourites/${product.id}`);
        removeFavorite(product.id);
        toast('Removed from favorites', { icon: '💔' });
      } else {
        await api.post(`/users/${user.id}/favourites`, { product_id: product.id });
        addFavorite(product);
        toast.success('Added to favorites! ❤️');
      }
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    }
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to add to cart');
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setShowConfirmModal(false);
    toast.success(`${product.name.split(' ').slice(0, 2).join(' ')} added to cart!`);
  };

  const cancelAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmModal(false);
  };

  const parsedPrice = parseFloat(product.price);
  const formattedPrice = isNaN(parsedPrice) ? '0.00' : parsedPrice.toFixed(2);
  const stock = parseInt(product.stock) || 0;
  const isOutOfStock = stock <= 0;
  const isBestSeller = (parseInt(product.sold) || 0) > 300; 

  return (
    <>
      <div 
        onClick={() => navigate(`/products/${product.id}`)}
        className="bg-white rounded-none shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-[#f5efde] transition-transform hover:-translate-y-1 group flex flex-col h-full relative overflow-hidden cursor-pointer"
      >
        {/* Favorite Icon */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 right-4 z-10 hover:scale-110 transition-transform outline-none bg-white/80 p-2 rounded-full backdrop-blur-sm shadow-sm border border-white/60"
          title={isLiked ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={isLiked ? "#ff4b4b" : "none"} stroke={isLiked ? "#ff4b4b" : "#999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        {/* Image Container */}
        <Link to={`/products/${product.id}`} className="w-full h-56 block relative overflow-hidden bg-[#f2f2f2]">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🛍️</div>
          )}
        </Link>

        {/* Content */}
        <div className="flex flex-col flex-grow px-5 pb-5 pt-4">
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-2">
              {isBestSeller && (
                <span className="inline-block bg-[#e8f7f0] text-[#1e8f5e] text-[11px] font-bold px-3 py-1 rounded-full">Best Seller</span>
              )}
              <span className="inline-block text-[#8e8477] text-[11px] font-bold px-2 py-1 bg-slate-50 rounded-full">{product.sold || 0} Sold</span>
            </div>
            <Link to={`/products/${product.id}`}>
              <h3 className="text-[17px] font-bold text-[#2d2217] leading-tight line-clamp-2 min-h-[44px] group-hover:text-[#bf6f3a] transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>

          <div className="mt-auto pt-4 flex items-end justify-between gap-2">
            <div>
              <p className="text-[13px] text-[#8e8477] font-medium mb-0.5">Price</p>
              <p className="text-[20px] font-black text-[#1e8f5e]">
                Rs {formattedPrice}
              </p>
            </div>
            
            <button
              onClick={handleAddToCartClick}
              disabled={isOutOfStock}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all focus:outline-none ${
                isOutOfStock
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-[#2d2217] text-white hover:bg-[#1a140d] active:scale-95 shadow-md hover:shadow-lg'
              }`}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog mapped manually to avoid installing deep packages */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in" onClick={cancelAddToCart}>
           <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-in-center" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl font-black mb-3 text-slate-900">Add to Cart</h3>
              <p className="text-slate-500 mb-8 font-medium">Add <span className="text-slate-900 font-bold">{product.name}</span> to your cart for Rs {formattedPrice}?</p>
              <div className="flex gap-4">
                 <button onClick={cancelAddToCart} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
                 <button onClick={confirmAddToCart} className="flex-1 py-3 bg-[#2d2217] text-white font-bold rounded-xl hover:bg-[#1a140d] shadow-md transition-colors">Confirm & Add</button>
              </div>
           </div>
        </div>
      )}
    </>
  );
}
