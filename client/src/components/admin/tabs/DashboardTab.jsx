import DashboardStats from '../dashboard/DashboardStats';
import OrderStatusChart from '../dashboard/OrderStatusChart';
import RecentTransactions from '../dashboard/RecentTransactions';
import LowStockAlert from '../dashboard/LowStockAlert';

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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top row of Statistic Cards */}
      <DashboardStats 
        totalRevenue={totalRevenue}
        usersCount={users.length}
        productsCount={products.length}
        ordersCount={orders.length}
        pendingOrders={pendingOrders}
        cancelledOrders={cancelledOrders}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Column */}
        <OrderStatusChart orders={orders} />

        {/* Recent Transactions Column */}
        <RecentTransactions orders={orders} />
      </div>

      {/* Low Stock Alerts Box */}
      <LowStockAlert lowStockProducts={lowStockProducts} />
    </div>
  );
}
