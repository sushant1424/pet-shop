import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Box } from 'lucide-react';
import api from '../lib/api';
import useStore from '../store/useStore';
import { getImageUrl } from '../lib/imageUrl';
import toast from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import ProductInfoPanel from '../components/product/ProductInfoPanel';

/**
 * ProductDetail Page
 * Focused view of a single pet product with deep description and related items.
 */
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { addToCart, user, favorites, addFavorite, removeFavorite } = useStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        const relRes = await api.get(`/products?category=${res.data.category}`);
        setRelatedProducts(relRes.data.filter(p => p.id !== res.data.id).slice(0, 4));
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

  const isLiked = favorites?.some(f => f.id === product.id);

  const handleFavorite = async () => {
    if (!user) { toast.error('Please login to save favorites'); return; }
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
    } catch (err) { toast.error('Something went wrong'); }
  };

  const handleAddToCart = () => { if (!user) { toast.error('Please login to add to cart'); return; } setShowConfirmModal(true); };

  const confirmAddToCart = () => {
    addToCart(product, quantity);
    setShowConfirmModal(false);
    toast.success(`${product.name.split(' ')[0]} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      <button onClick={() => navigate(-1)} className="flex items-center text-slate-400 hover:text-slate-900 mb-8 transition-colors font-bold text-sm tracking-widest uppercase">
        <ArrowLeft size={18} className="mr-2" /> Back
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-100 border border-slate-100 p-6 md:p-12 mb-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2">
            <div className="aspect-square bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden relative shadow-inner">
              {product.image_url ? (
                <img src={getImageUrl(product.image_url)} alt={product.name} className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-slate-200"><Box size={80} className="opacity-10" /></div>
              )}
            </div>
          </div>
          <ProductInfoPanel product={product} quantity={quantity} setQuantity={setQuantity} handleAddToCart={handleAddToCart} handleFavorite={handleFavorite} isLiked={isLiked} />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-3xl font-black mb-10 text-slate-900 tracking-tight">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(rp => <ProductCard key={rp.id} product={rp} />)}
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-in fade-in" onClick={() => setShowConfirmModal(false)}>
          <div className="bg-white rounded-[2rem] p-10 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-black mb-4 text-slate-900">Add to Cart?</h3>
            <p className="text-slate-500 mb-8 font-medium leading-relaxed">Add <strong className="text-slate-800">{quantity}x {product.name}</strong> to your cart for <strong className="text-emerald-500 font-black">Rs {(parseFloat(product.price) * quantity).toFixed(2)}</strong>?</p>
            <div className="flex gap-4">
              <button onClick={() => setShowConfirmModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all">Cancel</button>
              <button onClick={confirmAddToCart} className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black shadow-lg transition-all">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
