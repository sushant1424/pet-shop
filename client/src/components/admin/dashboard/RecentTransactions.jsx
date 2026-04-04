export default function RecentTransactions({ orders }) {
  const recent = orders.slice(0, 5);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 flex flex-col h-full">
      <h3 className="text-lg font-bold text-slate-900 mb-6 shrink-0">Recent Transactions</h3>
      <div className="overflow-x-auto flex-1">
        <div className="flex flex-col gap-2 min-w-[300px]">
          {recent.map(o => {
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
  );
}
