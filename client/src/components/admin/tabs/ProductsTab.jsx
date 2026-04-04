import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../../lib/api';
import SortHeader from '../SortHeader';
import { getImageUrl } from '../../../lib/imageUrl';
import ProductStatsCards from '../products/ProductStatsCards';
import ProductFormModal from '../products/ProductFormModal';

const INITIAL_FORM = { name: '', description: '', price: '', category: 'Food', pet_type: 'Dog', stock: 100, imageFile: null };

/**
 * ProductsTab — Full CRUD for inventory products.
 */
export default function ProductsTab({ products, fetchData, setActionConfirm, setDeleteConfirm }) {
  const [search, setSearch] = useState('');
  const [page, setPage]     = useState(1);
  const [sort, setSort]     = useState({ key: 'created_at', dir: 'desc' });
  const [showModal, setShowModal]   = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm]     = useState(INITIAL_FORM);
  const ITEMS_PER_PAGE = 8;

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => {
    let vA = a[sort.key], vB = b[sort.key];
    if (typeof vA === 'string') vA = vA.toLowerCase();
    if (typeof vB === 'string') vB = vB.toLowerCase();
    if (!isNaN(parseFloat(vA)) && !isNaN(parseFloat(vB))) { vA = parseFloat(vA); vB = parseFloat(vB); }
    return vA < vB ? (sort.dir === 'asc' ? -1 : 1) : vA > vB ? (sort.dir === 'asc' ? 1 : -1) : 0;
  });
  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const openAdd  = () => { setEditingItem(null); setForm(INITIAL_FORM); setShowModal(true); };
  const openEdit = (p) => { setEditingItem(p); setForm({ ...p, imageFile: null }); setShowModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    setActionConfirm({
      title: editingItem ? 'Edit Product?' : 'Add Product?',
      message: `Are you sure you want to ${editingItem ? 'update' : 'add'} this product?`,
      onConfirm: async () => {
        try {
          const data = new FormData();
          ['name', 'description', 'price', 'category', 'pet_type', 'stock'].forEach(k => data.append(k, form[k]));
          if (form.imageFile) data.append('image', form.imageFile);
          if (editingItem) {
            if (form.imageFile) await api.put(`/products/${editingItem.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
            else await api.put(`/products/${editingItem.id}`, form);
          } else {
            await api.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } });
          }
          setShowModal(false);
          toast.success('Product saved');
          fetchData();
        } catch { toast.error('Error saving product'); }
        setActionConfirm(null);
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <ProductStatsCards products={products} />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-64 bg-slate-50 outline-none px-4 py-2.5 rounded-xl font-medium" />
          <button onClick={openAdd} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm">Add Product</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <SortHeader label="Product" sortKey="name"  currentSort={sort} setSort={setSort} />
                <SortHeader label="Price"   sortKey="price" currentSort={sort} setSort={setSort} />
                <SortHeader label="Stock"   sortKey="stock" currentSort={sort} setSort={setSort} />
                <SortHeader label="Sold"    sortKey="sold"  currentSort={sort} setSort={setSort} />
                <th className="py-4 px-3 font-bold text-slate-400 text-xs tracking-wider text-right uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-2 text-sm font-bold text-slate-700 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-100 overflow-hidden shrink-0">
                      {p.image_url && <img src={getImageUrl(p.image_url)} className="w-full h-full object-cover" alt="" />}
                    </div>
                    {p.name}
                  </td>
                  <td className="py-4 px-2 text-sm font-bold text-slate-900">Rs {parseFloat(p.price).toFixed(2)}</td>
                  <td className="py-4 px-2 text-sm font-medium"><span className={p.stock <= 0 ? 'text-red-500' : 'text-slate-600'}>{p.stock}</span></td>
                  <td className="py-4 px-2 text-sm font-medium text-emerald-600">{p.sold || 0}</td>
                  <td className="py-4 px-2 text-right">
                    <button onClick={() => openEdit(p)} className="p-1.5 text-slate-400 hover:text-blue-500"><Edit size={16}/></button>
                    <button onClick={() => setDeleteConfirm({ type: 'product', id: p.id })} className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length > ITEMS_PER_PAGE && (
          <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-100">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Previous</button>
            <span className="text-sm font-medium text-slate-400">Page {page} of {Math.ceil(filtered.length / ITEMS_PER_PAGE)}</span>
            <button disabled={page * ITEMS_PER_PAGE >= filtered.length} onClick={() => setPage(page + 1)} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Next</button>
          </div>
        )}
      </div>

      {showModal && <ProductFormModal form={form} setForm={setForm} editingItem={editingItem} onClose={() => setShowModal(false)} onSubmit={handleSave} />}
    </div>
  );
}
