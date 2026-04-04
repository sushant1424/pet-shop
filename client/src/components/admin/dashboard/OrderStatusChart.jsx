import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

export default function OrderStatusChart({ orders }) {
  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(statusCounts).map(status => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: statusCounts[status]
  }));

  const COLORS = {
    'pending': '#f59e0b',
    'processing': '#3b82f6',
    'deployed': '#6366f1',
    'completed': '#10b981',
    'cancelled': '#ef4444'
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col h-full">
      <h3 className="text-lg font-bold text-slate-900 mb-6 shrink-0">Orders by Status</h3>
      <div className="flex-1 w-full min-h-[300px]">
        {orders.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase()] || '#cbd5e1'} />
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
  );
}
