import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import useStore from '../store/useStore';

// Modular Layout Components
import AdminAuth from '../components/admin/AdminAuth';
import AdminSidebar from '../components/admin/layout/AdminSidebar';
import AdminHeader from '../components/admin/layout/AdminHeader';
import AdminDialogs from '../components/admin/layout/AdminDialogs';

// Tab Components
import DashboardTab from '../components/admin/tabs/DashboardTab';
import UsersTab from '../components/admin/tabs/UsersTab';
import ProductsTab from '../components/admin/tabs/ProductsTab';
import OrdersTab from '../components/admin/tabs/OrdersTab';
import AnalyticsTab from '../components/admin/tabs/AnalyticsTab';
import SettingsTab from '../components/admin/tabs/SettingsTab';
import CmsTab from '../components/admin/tabs/CmsTab';

/**
 * AdminPanel Orchestrator
 * This is the parent container. It handles fetching primary data sets 
 * and orchestration of the administrative tabs.
 */
export default function AdminPanel() {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  
  const [products, setProducts]   = useState([]);
  const [orders, setOrders]       = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [deleteConfirm, setDeleteConfirm] = useState({ type: null, id: null });
  const [actionConfirm, setActionConfirm] = useState(null);

  useEffect(() => {
    document.title = 'PawMart Admin';
    if (user && user.role === 'admin') fetchData();
    return () => { document.title = 'PawMart'; };
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, ordRes, usersRes] = await Promise.all([
        api.get('/products'),
        api.get('/orders/all'),
        api.get('/users')
      ]);
      setProducts(prodRes.data);
      setOrders(ordRes.data);
      setUsersList(usersRes.data);
    } catch (err) {
      console.error('Core data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'admin') return <AdminAuth />;

  const executeDelete = async () => {
    try {
      const { type, id } = deleteConfirm;
      if (type === 'product') await api.delete(`/products/${id}`);
      else if (type === 'user') await api.delete(`/users/${id}`);
      setDeleteConfirm({ type: null, id: null });
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted`);
      fetchData();
    } catch (err) {
      toast.error('Deletion failed');
    }
  };

  const onLogoutClick = () => setActionConfirm({
    title: 'Confirm Logout',
    message: 'Are you sure you want to end your administrative session?',
    onConfirm: () => { logout(); navigate('/'); setActionConfirm(null); }
  });

  return (
    <div className="flex h-screen w-full bg-[#f8f9fc] font-sans text-slate-800 overflow-hidden">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogoutClick={onLogoutClick} />

      <main className="flex-1 overflow-y-auto relative bg-[#f8f9fc]">
        <AdminHeader activeTab={activeTab} user={user} />

        <div className="p-8">
          {loading ? (
            <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-slate-400" size={32} /></div>
          ) : (
            <>
              {activeTab === 'dashboard' && <DashboardTab orders={orders} users={usersList} products={products} />}
              {activeTab === 'users'     && <UsersTab users={usersList} fetchData={fetchData} setActionConfirm={setActionConfirm} setDeleteConfirm={setDeleteConfirm} />}
              {activeTab === 'products'  && <ProductsTab products={products} fetchData={fetchData} setActionConfirm={setActionConfirm} setDeleteConfirm={setDeleteConfirm} />}
              {activeTab === 'orders'    && <OrdersTab orders={orders} fetchData={fetchData} setActionConfirm={setActionConfirm} />}
              {activeTab === 'cms'       && <CmsTab />}
              {activeTab === 'analytics' && <AnalyticsTab orders={orders} products={products} />}
              {activeTab === 'settings'  && <SettingsTab />}
            </>
          )}
        </div>
      </main>

      <AdminDialogs 
        actionConfirm={actionConfirm}     setActionConfirm={setActionConfirm}
        deleteConfirm={deleteConfirm}     setDeleteConfirm={setDeleteConfirm}
        executeDelete={executeDelete}
      />
    </div>
  );
}
