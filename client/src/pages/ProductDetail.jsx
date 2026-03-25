import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import useStore from '../store/useStore';
import { ShoppingCart, Heart, ArrowLeft, Loader2, Box } from 'lucide-react';
import { getImageUrl } from '../lib/imageUrl';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const { addToCart, user, favorites, addFavorite, removeFavorite } = useStore();

  // We fetch the specific product details from our Express database using the ID from the URL.
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="animate-spin text-primary" size={48} /></div>;
  if (!product) return <div className="text-center py-32 text-2xl font-semibold">Product not found</div>;

  // Check if the current product ID exists inside our global 'favorites' array. safely
  const isLiked = favorites?.some(f => f.id === product.id);

  // Toggles the heart button. If it's already liked, it deletes it from the database. If not, it adds it.
  const handleFavorite = async () => {
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


  const handleAddToCartClick = () => {
    if (!user) {
      toast.error('Please login to add to cart');
      return;
    }
    setShowConfirmModal(true);
  };

  // Takes the current quantity selected and adds it to our global shopping cart state.
  const confirmAddToCart = () => {
    addToCart(product, quantity);
    setShowConfirmModal(false);
    toast.success(`${product.name.split(' ').slice(0, 2).join(' ')} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      <button onClick={() => navigate(-1)} className="flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors font-medium">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="bg-card rounded-[2rem] shadow-sm border border-border p-6 md:p-10 mb-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-square bg-muted rounded-[1.5rem] border border-border overflow-hidden relative shadow-inner">
              {getImageUrl(product.image_url) ? (
                <img src={getImageUrl(product.image_url)} alt={product.name} className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                  <Box size={64} className="opacity-20" />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center py-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">{product.category}</span>
              <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">{product.pet_type}</span>
            </div>
            
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-4 text-foreground leading-tight">{product.name}</h1>
            
            <p className="text-2xl font-black text-primary mb-2">Rs {parseFloat(product.price).toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mb-6 font-medium">
              {parseInt(product.stock) > 0 
                ? <span className="text-green-600 font-semibold">✓ In Stock ({product.sold || 0} sold)</span>
                : <span className="text-red-500 font-semibold">✗ Out of Stock</span>
              }
            </p>
            
            <div className="text-base text-muted-foreground mb-8 leading-relaxed max-w-xl">
              <p>{product.description || "No description provided for this high-quality product. Your pet will absolutely love it!"}</p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quantity</div>
              <div className="flex items-center border border-border rounded-lg overflow-hidden bg-background">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-muted font-bold text-sm transition-colors">-</button>
                <div className="px-3 py-2 border-x border-border font-bold text-sm min-w-[3rem] text-center">{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-muted font-bold text-sm transition-colors">+</button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleAddToCartClick}
                disabled={parseInt(product.stock) <= 0}
                className="flex-[2] bg-primary text-primary-foreground py-3 rounded-xl font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md flex items-center justify-center disabled:opacity-50"
              >
                <ShoppingCart className="mr-2" size={18} /> Add to Cart
              </button>
              <button 
                onClick={handleFavorite} 
                className={`flex-1 py-3 rounded-xl transition-all border flex items-center justify-center group shadow-sm font-bold text-sm ${
                  isLiked 
                    ? 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100' 
                    : 'bg-card text-muted-foreground hover:text-red-500 hover:bg-red-50 hover:border-red-100 border-border'
                }`}
                title={isLiked ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} className="transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setShowConfirmModal(false)}>
           <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-in-center" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl font-black mb-3 text-slate-900">Add to Cart</h3>
              <p className="text-slate-500 mb-8 font-medium">Add {quantity}x <span className="text-slate-900 font-bold">{product.name}</span> to your cart for Rs {(parseFloat(product.price) * quantity).toFixed(2)}?</p>
              <div className="flex gap-4">
                 <button onClick={() => setShowConfirmModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
                 <button onClick={confirmAddToCart} className="flex-1 py-3 bg-[#2d2217] text-white font-bold rounded-xl hover:bg-[#1a140d] shadow-md transition-colors">Confirm</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
