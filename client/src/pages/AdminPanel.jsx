import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Home, Users, Box, ShoppingBag, LogOut, BarChart, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import useStore from '../store/useStore';

// Import our newly abstracted modular components
import AdminAuth from '../components/admin/AdminAuth';
import DashboardTab from '../components/admin/tabs/DashboardTab';
import UsersTab from '../components/admin/tabs/UsersTab';
import ProductsTab from '../components/admin/tabs/ProductsTab';
import OrdersTab from '../components/admin/tabs/OrdersTab';
import AnalyticsTab from '../components/admin/tabs/AnalyticsTab';
import SettingsTab from '../components/admin/tabs/SettingsTab';

/**
 * Master AdminPanel Orchestrator Component
 * This is the parent container. It handles fetching the massive lists of 
 * users, products, and orders once, and passes them downward (as 'props') to the individual tab views.
 */
export default function AdminPanel() {
  // Global login state
  const { user, logout } = useStore();
  const navigate = useNavigate();
  
  // These states hold the gigantic lists of database rows
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [usersList, setUsersList] = useState([]);
  
  // UI specific states
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Global Modals that multiple tabs might need to access
  const [deleteConfirm, setDeleteConfirm] = useState({ type: null, id: null });
  const [actionConfirm, setActionConfirm] = useState(null);

  // This runs exactly once when the component mounts (or when the user logs in)
  useEffect(() => {
    document.title = 'PawMart Admin';
    if (user && user.role === 'admin') {
      fetchData();
    }
    // Cleanup title on dismount
    return () => { document.title = 'PawMart'; };
  }, [user]);

  // Fetches all required admin endpoints in parallel for maximum speed
  const fetchData = async () => {
    try {
      setLoading(true);
      // Promise.all runs all three requests at the exact same time
      const [prodRes, ordRes, usersRes] = await Promise.all([
        api.get('/products'),
        api.get('/orders/all'),
        api.get('/users')
      ]);
      setProducts(prodRes.data);
      setOrders(ordRes.data);
      setUsersList(usersRes.data);
    } catch (err) {
      console.error('Failed fetching core admin data:', err);
    } finally {
      // Regardless of success/fail, turn off the loading spinner
      setLoading(false);
    }
  };

  // Security Gate: If they are missing or not an admin, show the Login screen instead of the dashboard
  if (!user || user.role !== 'admin') return <AdminAuth />;

  // Global Delete Action (used by both Users and Products)
  const executeDelete = async () => {
    try {
      if (deleteConfirm.type === 'product') {
        await api.delete(`/products/${deleteConfirm.id}`);
        toast.success('Product deleted');
      } else if (deleteConfirm.type === 'user') {
        await api.delete(`/users/${deleteConfirm.id}`);
        toast.success('User deleted');
      }
      setDeleteConfirm({ type: null, id: null });
      fetchData(); // Download fresh data so the UI removes the deleted row
    } catch (err) {
      toast.error(`Error deleting ${deleteConfirm.type}`);
    }
  };

  // Array of tabs for the sidebar map loop
  const TABS = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'orders', icon: ShoppingBag, label: 'Orders' },
    { id: 'products', icon: Box, label: 'Products' },
    { id: 'analytics', icon: BarChart, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#f8f9fc] font-sans text-slate-800 overflow-hidden">
      
      {/* LEFT SIDEBAR AREA */}
      <aside className="w-64 bg-white border-r border-[#e5e7eb] flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-[#e5e7eb] shrink-0">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center mr-3">
             <span className="text-white font-black text-sm">P</span>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">PawMart</span>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          {TABS.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} 
              // React Template literals (backticks) let us add CSS classes dynamically using variables
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${activeTab === tab.id ? 'bg-[#3b4252] text-white shadow-md shadow-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? 'text-white' : 'text-slate-400'}/> 
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-[#e5e7eb] shrink-0">
          <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-500 border border-[#e5e7eb] hover:bg-slate-50 transition-colors">
            <LogOut size={16}/> Logout
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative bg-[#f8f9fc]">
        
        <header className="h-16 flex items-center justify-between px-8 pt-4">
          <h1 className="text-2xl font-bold text-slate-900 capitalize">
            {activeTab} Management
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-1.5 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">{user?.name?.charAt(0)}</div>
              <span className="font-semibold text-sm text-slate-700">{user?.name?.split(' ')[0]}</span>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* If downloading data, show spinner. Otherwise, show the active component. */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-slate-400" size={32} />
            </div>
          ) : (
            <>
              {/* Conditional Object Rendering: We pass the lists 'down' to the child component as props! */}
              {activeTab === 'dashboard' && <DashboardTab orders={orders} users={usersList} products={products} />}
              {activeTab === 'users' && <UsersTab users={usersList} fetchData={fetchData} setActionConfirm={setActionConfirm} setDeleteConfirm={setDeleteConfirm} />}
              {activeTab === 'products' && <ProductsTab products={products} fetchData={fetchData} setActionConfirm={setActionConfirm} setDeleteConfirm={setDeleteConfirm} />}
              {activeTab === 'orders' && <OrdersTab orders={orders} fetchData={fetchData} setActionConfirm={setActionConfirm} />}
              {activeTab === 'analytics' && <AnalyticsTab orders={orders} products={products} />}
              {activeTab === 'settings' && <SettingsTab />}
            </>
          )}
        </div>
      </main>

      {/* GLOBAL MODALS (Confirmation dialogues that float above the entire screen) */}
      {actionConfirm && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-in-center">
              <h3 className="text-2xl font-black mb-3 text-slate-900">{actionConfirm.title}</h3>
              <p className="text-slate-500 mb-8 font-medium">{actionConfirm.message}</p>
              <div className="flex gap-4">
                 {/* Cancel just wipes the action object, removing the modal from the screen */}
                 <button onClick={() => setActionConfirm(null)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Go Back</button>
                 {/* Confirm fires whatever custom function was attached to this specific popup */}
                 <button onClick={actionConfirm.onConfirm} className="flex-1 py-3 bg-[#2d2217] text-white font-bold rounded-xl hover:bg-[#1a140d] shadow-md transition-colors">Confirm</button>
              </div>
           </div>
        </div>
      )}

      {deleteConfirm.id && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-in-center">
              <h3 className="text-2xl font-black mb-3 text-slate-900 capitalize">Delete {deleteConfirm.type}?</h3>
              <p className="text-slate-500 mb-8 font-medium">Are you sure you want to completely erase this record? This action cannot be undone.</p>
              <div className="flex gap-4">
                 <button onClick={() => setDeleteConfirm({ type: null, id: null })} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Go Back</button>
                 {/* Calls mapping function at top of file */}
                 <button onClick={executeDelete} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-md transition-colors">Erase</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
