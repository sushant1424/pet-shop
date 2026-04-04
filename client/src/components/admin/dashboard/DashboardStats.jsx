export default function DashboardStats({ totalRevenue, usersCount, productsCount, ordersCount, pendingOrders, cancelledOrders }) {
  const STATS = [
    { label: 'Total Revenue', value: `Rs ${totalRevenue.toFixed(2)}`, color: 'text-slate-800' },
    { label: 'Total Users', value: usersCount, color: 'text-slate-800' },
    { label: 'Total Products', value: productsCount, color: 'text-slate-800' },
    { label: 'Total Orders', value: ordersCount, color: 'text-slate-800' },
    { label: 'Pending Orders', value: pendingOrders, color: 'text-amber-500' },
    { label: 'Cancelled Orders', value: cancelledOrders, color: 'text-red-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {STATS.map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-slate-400 mb-2">{stat.label}</p>
          <h4 className={`text-3xl font-black ${stat.color}`}>{stat.value}</h4>
        </div>
      ))}
    </div>
  );
}
