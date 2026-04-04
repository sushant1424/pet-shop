import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import api from '../lib/api';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { Cat, Dog, Fish, Bird, Rabbit } from 'lucide-react';
import { getImageUrl } from '../lib/imageUrl';

const PET_TYPES = [
  { name: 'Cat', icon: Cat },
  { name: 'Dog', icon: Dog },
  { name: 'Fish', icon: Fish },
  { name: 'Rabbit', icon: Rabbit },
  { name: 'Bird', icon: Bird }
];

export default function Landing() {
  const { user } = useStore();
  const [bestSelling, setBestSelling] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [hero, setHero] = useState({
    headline: 'Your Pet\\nDeserves the Best',
    subtext: 'From premium food and cozy clothing to fun toys and essential accessories — everything your furry, feathered, or finned friend needs, all in one place.',
    ctaLabel: 'Shop Now',
    badge: 'Get 50% Off On Your First Order'
  });

  useEffect(() => {
    // We send two separate requests to our Express server to get the top products
    api.get('/products/bestsellers').then(res => setBestSelling(res.data)).catch(() => {});
    api.get('/products/new').then(res => setNewArrivals(res.data)).catch(() => {});
    api.get('/settings').then(res => {
      if (res.data.cms_hero) {
        setHero(res.data.cms_hero);
      }
    }).catch(() => {});
  }, []);

  return (
    <>
    <div className="bg-[#fffdf9] font-sans text-[#332a21] overflow-hidden relative min-h-screen">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[50vw] h-[700px] bg-[#fdf2e3] rounded-bl-[200px] -z-10 opacity-60"></div>

      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left Text */}
          <div className="flex-1 max-w-xl text-center lg:text-left z-10">
            <p className="text-[#bf6f3a] font-bold tracking-widest text-[13px] uppercase mb-4 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-8 h-px bg-[#bf6f3a]"></span> {hero.badge}
            </p>
            <h1 className="text-5xl lg:text-[72px] font-black leading-[1.05] tracking-tight text-[#2d2217] mb-6 drop-shadow-sm whitespace-pre-line">
              {hero.headline}
            </h1>
            <p className="text-[#7d7162] text-base font-medium mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
              {hero.subtext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/products" className="bg-[#bf6f3a] text-white px-8 py-4 rounded-full font-extrabold text-lg hover:bg-[#a65d2f] hover:scale-105 transition-all shadow-xl shadow-[#bf6f3a]/30 text-center">
                {hero.ctaLabel}
              </Link>
              {!user && (
                <Link to="/signup" className="bg-[#2d2217] text-white px-8 py-4 rounded-full font-extrabold text-lg hover:bg-[#1a140d] hover:scale-105 transition-all shadow-md text-center">
                  Create Account
                </Link>
              )}
            </div>
          </div>
          {/* Right Images */}
          <div className="flex-1 relative w-full max-w-2xl flex justify-center lg:justify-end">
            <div className="relative w-full aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80" alt="Happy cat" className="w-[85%] h-auto rounded-[40px] shadow-2xl relative z-10 border-8 border-white object-cover" style={{transform: 'rotate(2deg)'}}/>
              <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&q=80" alt="Puppy" className="absolute bottom-[-10%] left-[-10%] w-[45%] h-auto rounded-full shadow-xl border-[6px] border-[#fffdf9] object-cover aspect-square z-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Icons */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
        <div className="bg-white rounded-[40px] px-8 py-8 shadow-[0_10px_40px_rgb(220,210,195,0.4)] border border-[#f5efde] flex flex-wrap justify-between items-center gap-6">
          {PET_TYPES.map((type, i) => (
            <Link key={i} to={`/products?pet_type=${type.name}`} className="flex flex-col items-center gap-3 group">
              <div className="w-20 h-20 rounded-full bg-[#fcf8f0] group-hover:bg-[#f3ead8] flex items-center justify-center transition-colors shadow-inner border border-[#f0e7d5]">
                <type.icon size={36} strokeWidth={1.5} className="text-[#bf6f3a] group-hover:scale-110 transition-transform"/>
              </div>
              <span className="font-bold text-[13px] text-[#4d4239] group-hover:text-[#2d2217]">{type.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Selling */}
      {bestSelling.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase tracking-widest text-[#2d2217]">Best Selling</h2>
            <div className="w-12 h-1.5 bg-[#bf6f3a] rounded-full mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8">
            {bestSelling.slice(0, 4).map((product, i) => <ProductCard key={i} product={product} />)}
          </div>
        </section>
      )}

      {/* Promotional Banners */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/products" className="relative h-64 rounded-[32px] overflow-hidden group shadow-lg">
            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80" alt="Pet food" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
            <div className="absolute inset-0 bg-gradient-to-r from-[#5b4f44]/90 to-transparent"></div>
            <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-12 lg:p-16">
              <p className="text-[#d8c8b8] text-xs font-bold uppercase tracking-widest mb-2 border border-[#d8c8b8]/30 inline-block px-3 py-1 rounded-full w-fit backdrop-blur-sm">Up to 50% Off</p>
              <h3 className="text-white text-3xl md:text-4xl font-black leading-tight mb-6 tracking-tight">Taste it, love<br/>it or we'll replace<br/>it. Guaranteed!</h3>
              <span className="bg-white text-[#5b4f44] font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-full w-fit transition-transform group-hover:-translate-y-1 shadow-md">Shop Now</span>
            </div>
          </Link>
          
          <Link to="/products?category=Toys" className="relative h-64 rounded-[32px] overflow-hidden group shadow-lg">
            <img src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80" alt="Pet toys" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 object-right"/>
            <div className="absolute inset-0 bg-gradient-to-l from-[#c07f45]/90 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 flex flex-col justify-center p-12 lg:p-16 items-end text-right">
              <p className="text-[#ffe6d0] text-xs font-bold uppercase tracking-widest mb-2 border border-[#ffe6d0]/30 inline-block px-3 py-1 rounded-full w-fit backdrop-blur-sm">Sale up to 50% off</p>
              <h3 className="text-white text-3xl md:text-4xl font-black leading-tight mb-6 tracking-tight">Top-rated toys<br/>your pets will<br/>absolutely love</h3>
              <span className="bg-[#fffdf9] text-[#c07f45] font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-full w-fit transition-transform group-hover:-translate-y-1 shadow-md">Shop Now</span>
            </div>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-widest text-[#2d2217] mb-8">New Arrivals</h2>
        </div>
        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {newArrivals.slice(0, 4).map((product, i) => <ProductCard key={i} product={product} />)}
          </div>
        ) : (
          <div className="text-center py-12 text-[#8e8477] font-medium">No new arrivals available right now.</div>
        )}
      </section>
    </div>
    <Footer />
    </>
  );
}
