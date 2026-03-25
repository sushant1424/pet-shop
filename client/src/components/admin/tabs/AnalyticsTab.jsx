import { getImageUrl } from '../../../lib/imageUrl';
import { Activity } from 'lucide-react';

/**
 * AnalyticsTab Component
 * This section provides an analytical view of store performance.
 * It uses standard JavaScript array methods (.filter, .reduce, .sort) to calculate math.
 */
export default function AnalyticsTab({ orders, products }) {
  
  // Find the exact amount of money made from completed orders
  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + parseFloat(o.total_amount), 0);
    
  // Calculate average order size
  const averageOrderValue = orders.length > 0 
    ? (orders.reduce((sum, o) => sum + parseFloat(o.total_amount), 0) / orders.length).toFixed(2) 
    : '0.00';

  // Calculate money that is "pending" - orders that might be paid soon
  const pendingRevenue = orders
    .filter(o => o.status === 'pending')
    .reduce((sum, o) => sum + parseFloat(o.total_amount), 0)
    .toFixed(2);

  // We sort products by 'sold' in descending order to get the top 4
  const topProducts = [...products]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 4);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Box: Revenue metrics */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue Insights</h3>
          <div className="space-y-4">
            
            {/* Metric 1 */}
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="font-medium text-slate-500">Average Order Value</span>
              <span className="font-bold text-slate-900">Rs {averageOrderValue}</span>
            </div>
            
            {/* Metric 2 */}
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="font-medium text-slate-500">Completed Orders Volume</span>
              <span className="font-bold text-emerald-600">Rs {totalRevenue.toFixed(2)}</span>
            </div>
            
            {/* Metric 3 */}
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="font-medium text-slate-500">Projected Pending Revenue</span>
              <span className="font-bold text-amber-500">Rs {pendingRevenue}</span>
            </div>

          </div>
        </div>
        
        {/* Right Box: Top Products */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Top Performing Products</h3>
          <div className="space-y-3">
            
            {/* We map over the sorted array to render HTML for each product */}
            {topProducts.map(p => (
              <div key={p.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                
                {/* Product Image */}
                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                   {p.image_url && <img src={getImageUrl(p.image_url)} className="w-full h-full object-cover" alt={p.name} />}
                </div>
                
                {/* Product Text */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 truncate">{p.name}</h4>
                  <p className="text-xs font-medium text-slate-500">{p.category} • Rs {p.price}</p>
                </div>
                
                {/* Sales Numbers */}
                <div className="text-right">
                  <div className="font-black text-sm text-emerald-600">{p.sold} sold</div>
                </div>
              </div>
            ))}
            
          </div>
        </div>

      </div>

      {/* Bottom Row: Additional Data Table Placeholder for future expansion */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
        <div className="bg-slate-50 flex flex-col items-center justify-center py-10 rounded-2xl border border-dashed border-slate-200">
           <Activity className="text-slate-300 mb-2" size={32} />
           <p className="text-sm font-medium text-slate-500">More detailed chronological order tracking coming soon.</p>
        </div>
      </div>
    </div>
  );
}
