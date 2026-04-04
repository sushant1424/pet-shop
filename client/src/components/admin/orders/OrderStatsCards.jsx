// Displays the 4 top-level statistics cards for the Orders tab
export default function OrderStatsCards({ orders }) {
  const count = (status) => orders.filter(o => o.status === status).length;
  const CARDS = [
    { label: 'Total Orders', value: orders.length, color: 'text-slate-400' },
    { label: 'Pending',      value: count('pending'),    color: 'text-yellow-500' },
    { label: 'Processing',   value: count('processing'), color: 'text-blue-500' },
    { label: 'Completed',    value: count('completed'),  color: 'text-emerald-500' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {CARDS.map(c => (
        <div key={c.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className={`text-sm font-bold mb-1 ${c.color}`}>{c.label}</p>
          <h4 className="text-3xl font-black text-slate-800">{c.value}</h4>
        </div>
      ))}
    </div>
  );
}
