/**
 * DashboardTab Component
 * This is the main overview screen showing quick statistics.
 * It receives 'orders', 'users', and 'products' arrays as 'props' from the parent AdminPanel.
 */
export default function DashboardTab({ orders, users, products }) {
  
  // Calculate total money made by adding up only the "completed" orders
  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + parseFloat(o.total_amount), 0);
    
  // Count how many orders are still waiting
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  // Count how many orders were cancelled
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top row of Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-slate-400 mb-2">Total Revenue</p>
          <h4 className="text-3xl font-black text-slate-800">Rs {totalRevenue.toFixed(2)}</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-slate-400 mb-2">Total Users</p>
          <h4 className="text-3xl font-black text-slate-800">{users.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-slate-400 mb-2">Total Products</p>
          <h4 className="text-3xl font-black text-slate-800">{products.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-slate-400 mb-2">Total Orders</p>
          <h4 className="text-3xl font-black text-slate-800">{orders.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-slate-400 mb-2">Pending Orders</p>
          <h4 className="text-3xl font-black text-amber-500">{pendingOrders}</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm font-bold text-slate-400 mb-2">Cancelled Orders</p>
          <h4 className="text-3xl font-black text-red-500">{cancelledOrders}</h4>
        </div>
      </div>

      {/* Recent Transactions Table Box */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-3 px-2 font-bold text-slate-400 text-xs uppercase tracking-wider">Order ID</th>
                <th className="py-3 px-2 font-bold text-slate-400 text-xs uppercase tracking-wider">Customer</th>
                <th className="py-3 px-2 font-bold text-slate-400 text-xs uppercase tracking-wider">Date</th>
                <th className="py-3 px-2 font-bold text-slate-400 text-xs uppercase tracking-wider">Amount</th>
                <th className="py-3 px-2 font-bold text-slate-400 text-xs uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {/* Loop through the first 5 orders and display them as table rows */}
              {orders.slice(0, 5).map(o => (
                <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-2 text-sm font-bold text-slate-700">#{1000 + parseInt(o.id)}</td>
                  <td className="py-3 px-2 text-sm font-medium text-slate-600">{o.user_name}</td>
                  <td className="py-3 px-2 text-sm text-slate-500">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-2 text-sm font-black text-slate-900">Rs {parseFloat(o.total_amount).toFixed(2)}</td>
                  <td className="py-3 px-2">
                    {/* Add color badges dynamically based on the order status string directly */}
                    <span className={`px-2 py-0.5 text-[11px] font-bold uppercase rounded-md ${
                        o.status === 'pending' ? 'bg-amber-100 text-amber-700' 
                        : o.status === 'completed' ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {o.status || 'pending'}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-sm font-medium text-slate-400">No recent transactions to display</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
