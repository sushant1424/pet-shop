import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { getImageUrl } from '../../../lib/imageUrl';

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

  // Find products that are running low (less than 10 remain)
  const lowStockProducts = products.filter(p => parseInt(p.stock) < 10);

  // Order status for chart
  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  const orderStatusData = Object.keys(statusCounts).map(status => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: statusCounts[status]
  }));

  const statusColors = {
    'pending': '#f59e0b',    // yellow
    'processing': '#3b82f6', // blue
    'deployed': '#6366f1',   // indigo
    'completed': '#10b981',  // green
    'cancelled': '#ef4444'   // red
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Column */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6 shrink-0">Orders by Status</h3>
          <div className="flex-1 w-full min-h-[300px]">
            {orders.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={statusColors[entry.name.toLowerCase()] || '#cbd5e1'} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [value, 'Orders']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} 
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 font-medium">No orders</div>
            )}
          </div>
        </div>

        {/* Recent Transactions Column */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6 shrink-0">Recent Transactions</h3>
          <div className="overflow-x-auto flex-1">
            <div className="flex flex-col gap-2 min-w-[300px]">
            {orders.slice(0, 5).map(o => {
              const safeItems = typeof o.items === 'string' ? JSON.parse(o.items) : (o.items || []);
              const mainItem = safeItems.length > 0 ? safeItems[0] : null;
              return (
                <div key={o.id} className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-2xl transition-all shadow-sm">
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="font-bold text-sm text-slate-900 line-clamp-1">
                      {mainItem ? mainItem.product_name : `Order #${1000 + parseInt(o.id)}`}
                      {safeItems.length > 1 && <span className="text-slate-400 font-medium ml-1">+{safeItems.length - 1} more</span>}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">{o.user_name} • {new Date(o.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-sm text-emerald-600">Rs {parseFloat(o.total_amount).toFixed(2)}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{o.status}</p>
                  </div>
                </div>
              );
            })}
            {orders.length === 0 && (
                <div className="py-6 text-center text-sm font-medium text-slate-400">No recent transactions to display</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alerts Box */}
      {lowStockProducts.length > 0 && (
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
      )}
    </div>
  );
}
