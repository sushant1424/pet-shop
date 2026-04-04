// Add / Edit product form modal for the admin Products tab
export default function ProductFormModal({ form, setForm, editingItem, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="bg-white rounded-3xl p-8 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-6">{editingItem ? 'Edit Product' : 'Add Product'}</h2>
        <div className="space-y-4">
          <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl" />
          <div className="flex gap-4">
            <input type="number" step="0.01" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Price" className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl" />
            <input type="number" required value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} placeholder="Stock" className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl" />
          </div>
          <div className="flex gap-4">
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl">
              {['Food', 'Toys', 'Clothes', 'Packages', 'Accessories'].map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={form.pet_type} onChange={e => setForm({ ...form, pet_type: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl">
              {['Dog', 'Cat', 'Bird', 'Fish', 'Small Pet'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="text-sm font-semibold text-slate-600 mt-2">Product Image (Required)</div>
          <input type="file" required={!editingItem} accept="image/*" onChange={e => setForm({ ...form, imageFile: e.target.files[0] })} className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl text-sm" />
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Product description..." className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl h-32 resize-none" />
        </div>
        <div className="flex gap-4 mt-6">
          <button type="button" onClick={onClose} className="flex-1 p-3 bg-slate-100 font-bold rounded-xl">Cancel</button>
          <button type="submit" className="flex-1 p-3 bg-slate-900 text-white font-bold rounded-xl">Save</button>
        </div>
      </form>
    </div>
  );
}
