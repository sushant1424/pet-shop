// Three stat cards for the Products admin tab
export default function ProductStatsCards({ products }) {
  const CARDS = [
    { label: 'Total Products',       value: products.length,                                         color: 'text-slate-400' },
    { label: 'In Stock',             value: products.filter(p => parseInt(p.stock) >= 10).length,    color: 'text-emerald-500' },
    { label: 'Low or Out of Stock',  value: products.filter(p => parseInt(p.stock) < 10).length,     color: 'text-red-500' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {CARDS.map(c => (
        <div key={c.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className={`text-sm font-bold mb-1 ${c.color}`}>{c.label}</p>
          <h4 className="text-3xl font-black text-slate-800">{c.value}</h4>
        </div>
      ))}
    </div>
  );
}
