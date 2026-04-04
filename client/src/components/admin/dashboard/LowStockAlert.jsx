export default function LowStockAlert({ lowStockProducts }) {
  if (lowStockProducts.length === 0) return null;

  return (
    <div className="bg-red-50 rounded-3xl border border-red-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6">
      <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
        ⚠️ Low Stock Alert
      </h3>
      <div className="space-y-3">
        {lowStockProducts.slice(0, 5).map(p => (
          <div key={p.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-red-50">
            <div className="flex gap-3 items-center">
              <span className="font-bold bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded">#{p.id}</span>
              <span className="font-semibold text-slate-700">{p.name}</span>
            </div>
            <span className="font-bold text-red-600 bg-red-100 px-3 py-1 rounded-lg text-sm">
              {p.stock} left
            </span>
          </div>
        ))}
        {lowStockProducts.length > 5 && (
          <div className="text-center pt-2 text-sm font-bold text-red-400">
            + {lowStockProducts.length - 5} more items
          </div>
        )}
      </div>
    </div>
  );
}
