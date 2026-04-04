import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../lib/api';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import ProductFilters from '../components/product/ProductFilters';

const PAGE_SIZE = 12;

/**
 * Products page — filterable, searchable, paginated product catalogue.
 */
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [page, setPage]         = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const categoryParam = searchParams.get('category') || '';
  const petTypeParam  = searchParams.get('pet_type')  || '';

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryParam)              params.append('category',  categoryParam);
      if (petTypeParam)               params.append('pet_type',  petTypeParam);
      if (searchParams.get('search')) params.append('search',    searchParams.get('search'));
      const res = await api.get(`/products?${params}`);
      setProducts(res.data);
      setPage(1);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  // Re-fetch whenever URL filters change
  useEffect(() => { fetchProducts(); }, [categoryParam, petTypeParam, searchParams.get('search')]);

  const handleFilter = (key, value) => {
    const p = new URLSearchParams(searchParams);
    value ? p.set(key, value) : p.delete(key);
    p.delete('search');
    setSearch('');
    setSearchParams(p);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const p = new URLSearchParams(searchParams);
    search ? p.set('search', search) : p.delete('search');
    setSearchParams(p);
  };

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const paginated  = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 py-8 animate-in fade-in duration-300">
        <ProductFilters petTypeParam={petTypeParam} categoryParam={categoryParam} handleFilter={handleFilter} />

        <div className="flex-1 min-w-0">
          {/* Header + Search */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Products</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{products.length} items found</p>
            </div>
            <form onSubmit={handleSearch} className="relative w-full sm:w-[500px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input type="text" placeholder="Search product..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white text-sm shadow-sm transition-all" />
            </form>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary" size={40} /></div>
          ) : paginated.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paginated.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo(0, 0); }} disabled={page === 1}
                    className="p-2.5 rounded-xl border border-border bg-white hover:bg-muted disabled:opacity-40 transition-colors"><ChevronLeft size={18} /></button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                    <button key={n} onClick={() => { setPage(n); window.scrollTo(0, 0); }}
                      className={`w-10 h-10 rounded-xl border text-sm font-bold transition-colors ${n === page ? 'bg-primary text-white border-primary shadow-md' : 'border-border bg-white hover:bg-muted'}`}>{n}</button>
                  ))}
                  <button onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo(0, 0); }} disabled={page === totalPages}
                    className="p-2.5 rounded-xl border border-border bg-white hover:bg-muted disabled:opacity-40 transition-colors"><ChevronRight size={18} /></button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
              <Search size={40} className="mx-auto text-muted-foreground opacity-20 mb-4" />
              <h3 className="text-lg font-bold mb-2">No products found</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">Try adjusting your filters or search terms.</p>
              <button onClick={() => { setSearch(''); setSearchParams({}); }}
                className="mt-5 bg-primary text-white font-semibold px-6 py-2 rounded-full hover:bg-primary/90 text-sm transition-colors">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
