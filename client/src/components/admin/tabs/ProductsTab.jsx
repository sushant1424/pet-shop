import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../../lib/api';
import SortHeader from '../SortHeader';
import { getImageUrl } from '../../../lib/imageUrl';

/**
 * ProductsTab Component
 * Shows a massive table of all inventory products.
 * Handles adding, editing (with image uploads), and deleting products.
 */
export default function ProductsTab({ products, fetchData, setActionConfirm, setDeleteConfirm }) {
  // Local states for UI logic
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const [sort, setSort] = useState({ key: 'created_at', dir: 'desc' });

  // Modal and Form logic
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // A single state object holds all the form inputs simultaneously
  const initialForm = { name: '', description: '', price: '', category: 'Food', pet_type: 'Dog', stock: 100, imageFile: null };
  const [form, setForm] = useState(initialForm);

  // Filter, Sort, Paginate
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => {
    let valA = a[sort.key];
    let valB = b[sort.key];
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (!isNaN(parseFloat(valA)) && !isNaN(parseFloat(valB))) {
      valA = parseFloat(valA); valB = parseFloat(valB);
    }
    if (valA < valB) return sort.dir === 'asc' ? -1 : 1;
    if (valA > valB) return sort.dir === 'asc' ? 1 : -1;
    return 0;
  });
  const paginatedList = sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Open "Add Product" empty mode
  const openAdd = () => {
    setEditingItem(null);
    setForm(initialForm);
    setShowModal(true);
  };

  // Open "Edit Product" preset mode
  const openEdit = (p) => {
    setEditingItem(p);
    setForm({ ...p, imageFile: null }); // Preserve existing data but empty the file browser
    setShowModal(true);
  };

  // Save changes to backend
  const handleSave = (e) => {
    e.preventDefault();
    setActionConfirm({
      title: editingItem ? 'Edit Product?' : 'Add Product?',
      message: `Are you sure you want to ${editingItem ? 'update' : 'add'} this product?`,
      onConfirm: async () => {
        try {
          // We use FormData natively so that image files can be sent to Express
          const pushData = new FormData();
          pushData.append('name', form.name);
          pushData.append('description', form.description);
          pushData.append('price', form.price);
          pushData.append('category', form.category);
          pushData.append('pet_type', form.pet_type);
          pushData.append('stock', form.stock);
          
          if (form.imageFile) pushData.append('image', form.imageFile);

          // If editing an existing ID, use PUT, otherwise use POST
          if (editingItem) {
            if (form.imageFile) await api.put(`/products/${editingItem.id}`, pushData, { headers: { 'Content-Type': 'multipart/form-data' }});
            else await api.put(`/products/${editingItem.id}`, form);
          } else {
            await api.post('/products', pushData, { headers: { 'Content-Type': 'multipart/form-data' }});
          }
          
          setShowModal(false);
          toast.success('Product saved successfully');
          fetchData(); // Download fresh database
        } catch (err) {
          toast.error('Error saving product');
        }
        setActionConfirm(null);
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-slate-400 mb-1">Total Products</p>
          <h4 className="text-3xl font-black text-slate-800">{products.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-emerald-500 mb-1">In Stock</p>
          <h4 className="text-3xl font-black text-slate-800">{products.filter(p => parseInt(p.stock) >= 10).length}</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-red-500 mb-1">Low or Out of Stock</p>
          <h4 className="text-3xl font-black text-slate-800">{products.filter(p => parseInt(p.stock) < 10).length}</h4>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6">
        
        {/* Top Controls: Search and Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="w-full sm:w-64 bg-slate-50 outline-none px-4 py-2.5 rounded-xl font-medium" />
          <button onClick={openAdd} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm">Add Product</button>
        </div>

        {/* The Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <SortHeader label="Product" sortKey="name" currentSort={sort} setSort={setSort} />
                <SortHeader label="Price" sortKey="price" currentSort={sort} setSort={setSort} />
                <SortHeader label="Stock" sortKey="stock" currentSort={sort} setSort={setSort} />
                <SortHeader label="Sold" sortKey="sold" currentSort={sort} setSort={setSort} />
                <th className="py-4 px-3 font-bold text-slate-400 text-xs tracking-wider text-right uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedList.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-2 text-sm font-bold text-slate-700 flex items-center gap-3">
                    {/* Tiny thumbnail generation */}
                    <div className="w-8 h-8 rounded bg-slate-100 overflow-hidden shrink-0">
                       {p.image_url && <img src={getImageUrl(p.image_url)} className="w-full h-full object-cover" alt=""/>}
                    </div>
                    {p.name}
                  </td>
                  <td className="py-4 px-2 text-sm font-bold text-slate-900">Rs {parseFloat(p.price).toFixed(2)}</td>
                  <td className="py-4 px-2 text-sm font-medium"><span className={`${p.stock <= 0 ? 'text-red-500' : 'text-slate-600'}`}>{p.stock}</span></td>
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
        
        {/* Pagination bounds logic */}
        {filtered.length > itemsPerPage && (
          <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-100">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Previous</button>
            <span className="text-sm font-medium text-slate-400">Page {page} of {Math.ceil(filtered.length / itemsPerPage)}</span>
            <button disabled={page * itemsPerPage >= filtered.length} onClick={() => setPage(page + 1)} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Next</button>
          </div>
        )}
      </div>

      {/* Reusable Product Input Modal (Works for 'Add' or 'Edit') */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-6">{editingItem ? 'Edit Product' : 'Add Product'}</h2>
            <div className="space-y-4">
              <input type="text" required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Name" className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl" />
              <div className="flex gap-4">
                <input type="number" step="0.01" required value={form.price} onChange={e=>setForm({...form, price: e.target.value})} placeholder="Price" className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl" />
                <input type="number" required value={form.stock} onChange={e=>setForm({...form, stock: e.target.value})} placeholder="Stock" className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl" />
              </div>
              <div className="flex gap-4">
                <select value={form.category} onChange={e=>setForm({...form, category: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl">
                  <option>Food</option><option>Toys</option><option>Clothes</option><option>Packages</option><option>Accessories</option>
                </select>
                <select value={form.pet_type} onChange={e=>setForm({...form, pet_type: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl">
                  <option>Dog</option><option>Cat</option><option>Bird</option><option>Fish</option><option>Small Pet</option>
                </select>
              </div>
              <div className="text-sm font-semibold text-slate-600 mt-2">Product Image (Required)</div>
              {/* Type 'file' is used for actual device photo uploads */}
              <input type="file" required={!editingItem} accept="image/*" onChange={e=>setForm({...form, imageFile: e.target.files[0]})} className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl text-sm" />
              <textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="Format complete product description here..." className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl h-32 resize-none" />
            </div>
            <div className="flex gap-4 mt-6">
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 p-3 bg-slate-100 font-bold rounded-xl">Cancel</button>
              <button type="submit" className="flex-1 p-3 bg-slate-900 text-white font-bold rounded-xl">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
