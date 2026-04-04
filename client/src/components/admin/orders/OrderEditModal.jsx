// Modal form for updating the fulfillment status of an order
export default function OrderEditModal({ form, setForm, onClose, onSubmit }) {
  const STATUSES = ['pending', 'processing', 'deployed', 'completed', 'cancelled'];
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="bg-white rounded-3xl p-8 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-6">Update Order Status</h2>
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
          className="w-full p-3 bg-slate-50 rounded-xl outline-none mb-6"
        >
          {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <div className="flex gap-4">
          <button type="button" onClick={onClose} className="flex-1 p-3 bg-slate-100 font-bold rounded-xl">Cancel</button>
          <button type="submit" className="flex-1 p-3 bg-slate-900 text-white font-bold rounded-xl">Save</button>
        </div>
      </form>
    </div>
  );
}
