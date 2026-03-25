import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../lib/api';
import ProductCard from '../components/ProductCard';
import { Search, Filter, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 12;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const categoryParam = searchParams.get('category') || '';
  const petTypeParam = searchParams.get('pet_type') || '';

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryParam) params.append('category', categoryParam);
      if (petTypeParam) params.append('pet_type', petTypeParam);
      if (searchParams.get('search')) params.append('search', searchParams.get('search'));
      const res = await api.get(`/products?${params.toString()}`);
      setProducts(res.data);
      setPage(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [categoryParam, petTypeParam, searchParams.get('search')]);

  const handleFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value); else newParams.delete(key);
    newParams.delete('search');
    setSearch('');
    setSearchParams(newParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (search) newParams.set('search', search); else newParams.delete('search');
    setSearchParams(newParams);
  };

  // Pagination
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const paginated = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 py-8 animate-in fade-in duration-300">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-56 lg:w-64 bg-white p-5 rounded-2xl border border-border shadow-sm h-fit shrink-0">
        <div className="flex items-center gap-2 font-bold text-base mb-5 pb-3 border-b border-border">
          <Filter size={18} /> Filters
        </div>

        <div className="mb-6">
          <h4 className="font-bold mb-3 text-xs text-muted-foreground uppercase tracking-wider">Pet Type</h4>
          <div className="space-y-2">
            {['Dog', 'Cat', 'Bird', 'Fish', 'Small Pet'].map(type => (
              <label key={type} className="flex items-center gap-2.5 cursor-pointer hover:text-primary transition-colors">
                <input type="radio" name="pet_type" value={type} checked={petTypeParam === type} onChange={(e) => handleFilter('pet_type', e.target.value)} className="accent-primary w-4 h-4" />
                <span className="text-sm font-medium">{type}</span>
              </label>
            ))}
            <label className="flex items-center gap-2.5 cursor-pointer hover:text-primary transition-colors pt-2 border-t border-border/50">
              <input type="radio" name="pet_type" value="" checked={!petTypeParam} onChange={() => handleFilter('pet_type', '')} className="accent-primary w-4 h-4" />
              <span className="text-sm font-medium">All Pets</span>
            </label>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-xs text-muted-foreground uppercase tracking-wider">Category</h4>
          <div className="space-y-2">
            {['Food', 'Toys', 'Clothes', 'Packages', 'Accessories'].map(cat => (
              <label key={cat} className="flex items-center gap-2.5 cursor-pointer hover:text-primary transition-colors">
                <input type="radio" name="category" value={cat} checked={categoryParam === cat} onChange={(e) => handleFilter('category', e.target.value)} className="accent-primary w-4 h-4" />
                <span className="text-sm font-medium">{cat}</span>
              </label>
            ))}
            <label className="flex items-center gap-2.5 cursor-pointer hover:text-primary transition-colors pt-2 border-t border-border/50">
              <input type="radio" name="category" value="" checked={!categoryParam} onChange={() => handleFilter('category', '')} className="accent-primary w-4 h-4" />
              <span className="text-sm font-medium">All Categories</span>
            </label>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Products</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{products.length} items found</p>
          </div>
          <form onSubmit={handleSearch} className="relative w-full sm:w-[500px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text" placeholder="Search product..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white text-sm shadow-sm transition-all"
            />
          </form>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : paginated.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {paginated.map(product => <ProductCard key={product.id} product={product} />)}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo(0, 0); }}
                  disabled={page === 1}
                  className="p-2.5 rounded-xl border border-border bg-white hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => { setPage(p); window.scrollTo(0, 0); }}
                    className={`w-10 h-10 rounded-xl border text-sm font-bold transition-colors ${
                      p === page
                        ? 'bg-primary text-white border-primary shadow-md shadow-primary/25'
                        : 'border-border bg-white hover:bg-muted text-foreground'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo(0, 0); }}
                  disabled={page === totalPages}
                  className="p-2.5 rounded-xl border border-border bg-white hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
            <Search size={40} className="mx-auto text-muted-foreground opacity-20 mb-4" />
            <h3 className="text-lg font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">Try adjusting your filters or search terms.</p>
            <button
              onClick={() => { setSearch(''); setSearchParams({}); }}
              className="mt-5 bg-primary text-white font-semibold px-6 py-2 rounded-full hover:bg-primary/90 text-sm transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
