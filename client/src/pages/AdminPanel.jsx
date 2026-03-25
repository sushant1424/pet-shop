import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import useStore from '../store/useStore';
import { getImageUrl } from '../lib/imageUrl';
import { 
  Loader2, Plus, Trash2, Edit, Home, Users, Box, ShoppingBag, 
  LogOut, ShieldCheck, Mail, Lock, X, BarChart, Settings, ArrowUpDown
} from 'lucide-react';
import toast from 'react-hot-toast';

const getStatusStyles = (status) => {
  switch(status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    case 'processing': return 'bg-blue-100 text-blue-800 border border-blue-200';
    case 'deployed': return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
    case 'completed': return 'bg-green-100 text-green-800 border border-green-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border border-red-200';
    default: return 'bg-slate-100 text-slate-600 border border-slate-200';
  }
};

const SortHeader = ({ label, sortKey, currentSort, setSort }) => (
  <th 
    onClick={() => setSort(p => ({ key: sortKey, dir: p.key === sortKey && p.dir === 'asc' ? 'desc' : 'asc' }))}
    className="py-4 px-3 font-bold text-slate-400 text-xs tracking-wider cursor-pointer hover:text-slate-700 transition-colors select-none group"
  >
    <div className="flex items-center gap-1.5 uppercase">
      {label} 
      <ArrowUpDown size={12} className={`transition-opacity ${currentSort.key === sortKey ? 'text-slate-900 opacity-100' : 'opacity-30 group-hover:opacity-100'}`}/>
    </div>
  </th>
);

function AdminAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        const res = await api.post('/auth/login', { email: formData.email, password: formData.password });
        if (res.data.user.role !== 'admin') {
          setError('Access denied. Admin only.');
        } else {
          setAuth(res.data.user, res.data.token);
        }
      } else {
        await api.post('/auth/create-admin', formData);
        setIsLogin(true);
        setError('Admin created successfully. Please login.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-border">
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-sm">
          <ShieldCheck size={24} className="text-white" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">
          {isLogin ? 'Admin Portal' : 'Create Admin'}
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          {isLogin ? 'Enter your credentials to manage the pet shop.' : 'Register a new administrator account.'}
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold mb-6 flex items-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 outline-none px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all text-sm font-medium" 
                placeholder="John Doe" />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 outline-none pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all text-sm font-medium" 
                placeholder="admin@petshop.com" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 outline-none pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all text-sm font-medium" 
                placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white font-bold text-sm py-3 rounded-xl mt-6 hover:bg-slate-800 transition-all disabled:opacity-70">
            {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            {isLogin ? 'Need an admin account? Create one' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Products
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productSearch, setProductSearch] = useState('');
  const [productForm, setProductForm] = useState({ name: '', description: '', price: '', category: 'Food', pet_type: 'Dog', stock: 100, image_url: '' });

  // Users
  const [userSearch, setUserSearch] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'user' });

  // Orders
  const [orderSearch, setOrderSearch] = useState('');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orderForm, setOrderForm] = useState({ status: 'pending' });

  // Modals
  const [deleteConfirm, setDeleteConfirm] = useState({ type: null, id: null });
  const [actionConfirm, setActionConfirm] = useState(null);

  // Sorting
  const [userSort, setUserSort] = useState({ key: 'created_at', dir: 'desc' });
  const [productSort, setProductSort] = useState({ key: 'created_at', dir: 'desc' });
  const [orderSort, setOrderSort] = useState({ key: 'created_at', dir: 'desc' });

  // Pagination
  const [pages, setPages] = useState({ users: 1, products: 1, orders: 1 });
  const itemsPerPage = 8;

  useEffect(() => {
    document.title = 'PawMart Admin';
    if (user && user.role === 'admin') {
      fetchData();
    }
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
      setUsers(usersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'admin') return <AdminAuth />;

  // ---- Product Handlers ----
  const handleSaveProduct = (e) => {
    e.preventDefault();
    setActionConfirm({
      title: editingProduct ? 'Edit Product?' : 'Add Product?',
      message: `Are you sure you want to ${editingProduct ? 'update details for' : 'add'} this product?`,
      onConfirm: async () => {
        try {
          const formData = new FormData();
          formData.append('name', productForm.name);
          formData.append('description', productForm.description);
          formData.append('price', productForm.price);
          formData.append('category', productForm.category);
          formData.append('pet_type', productForm.pet_type);
          formData.append('stock', productForm.stock);
          
          if (productForm.imageFile) {
            formData.append('image', productForm.imageFile);
          } else if (productForm.image_url) {
            formData.append('image_url', productForm.image_url);
          }

          if (editingProduct) {
            if (productForm.imageFile) {
              await api.put(`/products/${editingProduct.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }});
            } else {
              await api.put(`/products/${editingProduct.id}`, productForm);
            }
          } else {
            if (productForm.imageFile) {
              await api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' }});
            } else {
              await api.post('/products/with-url', productForm);
            }
          }
          setShowProductForm(false);
          setEditingProduct(null);
          setProductForm({ name: '', description: '', price: '', category: 'Food', pet_type: 'Dog', stock: 100, image_url: '', imageFile: null });
          toast.success('Product saved successfully');
          fetchData();
        } catch (err) {
          toast.error('Error saving product');
        }
        setActionConfirm(null);
      }
    });
  };

  const openEditProduct = (p) => {
    setEditingProduct(p);
    setProductForm({ ...p, imageFile: null });
    setShowProductForm(true);
  };

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
      fetchData();
    } catch (err) {
      toast.error(`Error deleting ${deleteConfirm.type}`);
    }
  }

  // ---- User Handlers ----
  const openEditUser = (u) => {
    setEditingUser(u);
    setUserForm({ name: u.name, email: u.email, role: u.role });
    setShowUserModal(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    setActionConfirm({
      title: 'Update User?',
      message: `Are you sure you want to save changes for user ${userForm.email}?`,
      onConfirm: async () => {
        try {
          await api.put(`/users/${editingUser.id}`, userForm);
          setShowUserModal(false);
          toast.success('User updated');
          fetchData();
        } catch (err) { toast.error('Error updating user'); }
        setActionConfirm(null);
      }
    });
  };

  // ---- Order Handlers ----
  const openEditOrder = (o) => {
    setEditingOrder(o);
    setOrderForm({ status: o.status || 'pending' });
    setShowOrderModal(true);
  };

  const handleSaveOrder = (e) => {
    e.preventDefault();
    setActionConfirm({
      title: 'Update Order Format?',
      message: `Are you sure you want to change order #${1000 + parseInt(editingOrder.id)} to ${orderForm.status}?`,
      onConfirm: async () => {
        try {
          await api.put(`/orders/${editingOrder.id}/status`, { status: orderForm.status });
          setShowOrderModal(false);
          toast.success('Order updated');
          fetchData();
        } catch (err) { toast.error('Error updating order'); }
        setActionConfirm(null);
      }
    });
  };

  // Derived Stats
  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + parseFloat(o.total_amount), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;
  const activeUsers = users.filter(u => u.role === 'user').length; // Mock active logic

  // Filters & Sorting Helpers
  const sortData = (data, sort) => {
    return [...data].sort((a, b) => {
      let valA = a[sort.key];
      let valB = b[sort.key];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA === valB) return 0;
      
      const isNumA = !isNaN(parseFloat(valA));
      const isNumB = !isNaN(parseFloat(valB));
      
      if (isNumA && isNumB) {
        valA = parseFloat(valA); valB = parseFloat(valB);
      }
      
      if (valA < valB) return sort.dir === 'asc' ? -1 : 1;
      if (valA > valB) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()));
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()));
  const filteredOrders = orders.filter(o => o.user_name?.toLowerCase().includes(orderSearch.toLowerCase()) || String(o.id).includes(orderSearch));

  const sortedUsers = sortData(filteredUsers, userSort);
  const sortedProducts = sortData(filteredProducts, productSort);
  const sortedOrders = sortData(filteredOrders, orderSort);

  // Pagination Bounds
  const paginatedUsers = sortedUsers.slice((pages.users - 1) * itemsPerPage, pages.users * itemsPerPage);
  const paginatedProducts = sortedProducts.slice((pages.products - 1) * itemsPerPage, pages.products * itemsPerPage);
  const paginatedOrders = sortedOrders.slice((pages.orders - 1) * itemsPerPage, pages.orders * itemsPerPage);

  return (
    <div className="flex h-screen w-full bg-[#f8f9fc] font-sans text-slate-800 overflow-hidden">
      
      <aside className="w-64 bg-white border-r border-[#e5e7eb] flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-[#e5e7eb] shrink-0">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center mr-3">
             <span className="text-white font-black text-sm">P</span>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">PawMart</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          {[
            { id: 'dashboard', icon: Home, label: 'Dashboard' },
            { id: 'users', icon: Users, label: 'Users' },
            { id: 'orders', icon: ShoppingBag, label: 'Orders' },
            { id: 'products', icon: Box, label: 'Products' },
            { id: 'analytics', icon: BarChart, label: 'Analytics' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setPages({ users: 1, products: 1, orders: 1 }); }} 
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${activeTab === tab.id ? 'bg-[#3b4252] text-white shadow-md shadow-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? 'text-white' : 'text-slate-400'}/> {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-[#e5e7eb] shrink-0">
          <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-500 border border-[#e5e7eb] hover:bg-slate-50 transition-colors">
            <LogOut size={16}/> Logout
          </button>
        </div>
      </aside>

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
          {loading ? (
            <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-slate-400" size={32} /></div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div className="space-y-6 animate-in fade-in duration-300">
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

                  {/* Recent Transactions Table */}
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
                          {orders.slice(0, 5).map(o => (
                            <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-3 px-2 text-sm font-bold text-slate-700">#{1000 + parseInt(o.id)}</td>
                              <td className="py-3 px-2 text-sm font-medium text-slate-600">{o.user_name}</td>
                              <td className="py-3 px-2 text-sm text-slate-500">{new Date(o.created_at).toLocaleDateString()}</td>
                              <td className="py-3 px-2 text-sm font-black text-slate-900">Rs {parseFloat(o.total_amount).toFixed(2)}</td>
                              <td className="py-3 px-2">
                                <span className={`px-2 py-0.5 text-[11px] font-bold uppercase rounded-md ${o.status === 'pending' ? 'bg-amber-100 text-amber-700' : o.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
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
              )}

              {activeTab === 'users' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                      <p className="text-sm font-bold text-slate-400 mb-1">Total Users</p>
                      <h4 className="text-3xl font-black text-slate-800">{users.length}</h4>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                      <p className="text-sm font-bold text-slate-400 mb-1">Active Users</p>
                      <h4 className="text-3xl font-black text-slate-800">{activeUsers}</h4>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                      <div className="w-full sm:w-64 relative">
                        <input type="text" placeholder="Search users..." value={userSearch} onChange={e => setUserSearch(e.target.value)} className="w-full bg-slate-50 border-none outline-none px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-slate-200 text-sm font-medium transition-all" />
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                          <tr className="border-b border-slate-100 bg-white">
                            <SortHeader label="Name" sortKey="name" currentSort={userSort} setSort={setUserSort} />
                            <SortHeader label="Email" sortKey="email" currentSort={userSort} setSort={setUserSort} />
                            <SortHeader label="Role" sortKey="role" currentSort={userSort} setSort={setUserSort} />
                            <SortHeader label="Joined" sortKey="created_at" currentSort={userSort} setSort={setUserSort} />
                            <th className="py-4 px-3 font-bold text-slate-400 text-xs tracking-wider text-right uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {paginatedUsers.map(u => (
                            <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                              <td className="py-4 px-2 text-sm font-bold text-slate-700">{u.name}</td>
                              <td className="py-4 px-2 text-sm text-slate-500">{u.email}</td>
                              <td className="py-4 px-2 text-sm font-medium"><span className="bg-slate-100 px-2 py-0.5 rounded-full">{u.role}</span></td>
                              <td className="py-4 px-2 text-sm text-slate-500">{new Date(u.created_at).toLocaleDateString()}</td>
                              <td className="py-4 px-2 text-right">
                                <button onClick={() => openEditUser(u)} className="p-1.5 text-slate-400 hover:text-blue-500"><Edit size={16}/></button>
                                <button onClick={() => { if(u.id === user.id) return toast.error("Cannot delete yourself"); setDeleteConfirm({ type: 'user', id: u.id }) }} disabled={u.id === user.id} className="p-1.5 text-slate-400 hover:text-red-500 disabled:opacity-30"><Trash2 size={16}/></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {filteredUsers.length > itemsPerPage && (
                      <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-100">
                        <button disabled={pages.users === 1} onClick={() => setPages({...pages, users: pages.users - 1})} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Previous</button>
                        <span className="text-sm font-medium text-slate-400">Page {pages.users} of {Math.ceil(filteredUsers.length / itemsPerPage)}</span>
                        <button disabled={pages.users * itemsPerPage >= filteredUsers.length} onClick={() => setPages({...pages, users: pages.users + 1})} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Next</button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                      <input type="text" placeholder="Search products..." value={productSearch} onChange={e => setProductSearch(e.target.value)} className="w-full sm:w-64 bg-slate-50 outline-none px-4 py-2.5 rounded-xl font-medium" />
                      <button onClick={() => { setEditingProduct(null); setProductForm({name:'', description:'', price:'', stock:100, image_url:''}); setShowProductForm(true); }} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm">Add Product</button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                          <tr className="border-b border-slate-100 bg-white">
                            <SortHeader label="Product" sortKey="name" currentSort={productSort} setSort={setProductSort} />
                            <SortHeader label="Price" sortKey="price" currentSort={productSort} setSort={setProductSort} />
                            <SortHeader label="Stock" sortKey="stock" currentSort={productSort} setSort={setProductSort} />
                            <SortHeader label="Sold" sortKey="sold" currentSort={productSort} setSort={setProductSort} />
                            <th className="py-4 px-3 font-bold text-slate-400 text-xs tracking-wider text-right uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {paginatedProducts.map(p => (
                            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-2 text-sm font-bold text-slate-700 flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-slate-100 overflow-hidden shrink-0">
                                   {p.image_url && <img src={getImageUrl(p.image_url)} className="w-full h-full object-cover" alt=""/>}
                                </div>
                                {p.name}
                              </td>
                              <td className="py-4 px-2 text-sm font-bold text-slate-900">Rs {parseFloat(p.price).toFixed(2)}</td>
                              <td className="py-4 px-2 text-sm font-medium"><span className={`${p.stock <= 0 ? 'text-red-500' : 'text-slate-600'}`}>{p.stock}</span></td>
                              <td className="py-4 px-2 text-sm font-medium text-emerald-600">{p.sold || 0}</td>
                              <td className="py-4 px-2 text-right">
                                <button onClick={() => openEditProduct(p)} className="p-1.5 text-slate-400 hover:text-blue-500"><Edit size={16}/></button>
                                <button onClick={() => setDeleteConfirm({ type: 'product', id: p.id })} className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {filteredProducts.length > itemsPerPage && (
                      <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-100">
                        <button disabled={pages.products === 1} onClick={() => setPages({...pages, products: pages.products - 1})} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Previous</button>
                        <span className="text-sm font-medium text-slate-400">Page {pages.products} of {Math.ceil(filteredProducts.length / itemsPerPage)}</span>
                        <button disabled={pages.products * itemsPerPage >= filteredProducts.length} onClick={() => setPages({...pages, products: pages.products + 1})} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Next</button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                      <input type="text" placeholder="Search orders..." value={orderSearch} onChange={e => setOrderSearch(e.target.value)} className="w-full sm:w-64 bg-slate-50 outline-none px-4 py-2.5 rounded-xl font-medium" />
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                          <tr className="border-b border-slate-100 bg-white">
                            <SortHeader label="Order ID" sortKey="id" currentSort={orderSort} setSort={setOrderSort} />
                            <SortHeader label="Customer" sortKey="user_name" currentSort={orderSort} setSort={setOrderSort} />
                            <SortHeader label="Date" sortKey="created_at" currentSort={orderSort} setSort={setOrderSort} />
                            <SortHeader label="Total" sortKey="total_amount" currentSort={orderSort} setSort={setOrderSort} />
                            <SortHeader label="Status" sortKey="status" currentSort={orderSort} setSort={setOrderSort} />
                            <th className="py-4 px-3 font-bold text-slate-400 text-xs tracking-wider text-right uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {paginatedOrders.map(o => (
                            <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-2 font-bold text-sm text-slate-700">#{1000 + parseInt(o.id)}</td>
                              <td className="py-4 px-2">
                                <div className="font-bold text-sm text-slate-800">{o.user_name}</div>
                                <div className="text-xs text-slate-500">{o.user_email}</div>
                              </td>
                              <td className="py-4 px-2 text-sm text-slate-500">{new Date(o.created_at).toLocaleDateString()}</td>
                              <td className="py-4 px-2 font-black text-slate-900 text-sm">Rs {parseFloat(o.total_amount).toFixed(2)}</td>
                              <td className="py-4 px-2">
                                <span className={`px-2 py-1 text-xs font-bold uppercase rounded-md ${getStatusStyles(o.status || 'pending')}`}>
                                  {o.status || 'pending'}
                                </span>
                              </td>
                              <td className="py-4 px-2 text-right">
                                <button onClick={() => openEditOrder(o)} className="text-blue-500 text-xs font-bold hover:underline">Edit Status</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {filteredOrders.length > itemsPerPage && (
                      <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-100">
                        <button disabled={pages.orders === 1} onClick={() => setPages({...pages, orders: pages.orders - 1})} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Previous</button>
                        <span className="text-sm font-medium text-slate-400">Page {pages.orders} of {Math.ceil(filteredOrders.length / itemsPerPage)}</span>
                        <button disabled={pages.orders * itemsPerPage >= filteredOrders.length} onClick={() => setPages({...pages, orders: pages.orders + 1})} className="text-sm font-bold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30">Next</button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue Insights</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                          <span className="font-medium text-slate-500">Average Order Value</span>
                          <span className="font-bold text-slate-900">Rs {orders.length > 0 ? (orders.reduce((sum, o) => sum + parseFloat(o.total_amount), 0) / orders.length).toFixed(2) : '0.00'}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                          <span className="font-medium text-slate-500">Completed Orders Volume</span>
                          <span className="font-bold text-emerald-600">Rs {totalRevenue.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                          <span className="font-medium text-slate-500">Projected Pending Revenue</span>
                          <span className="font-bold text-amber-500">Rs {orders.filter(o=>o.status==='pending').reduce((sum, o) => sum + parseFloat(o.total_amount), 0).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Top Performing Products</h3>
                      <div className="space-y-3">
                        {[...products].sort((a,b)=>b.sold - a.sold).slice(0,4).map(p => (
                          <div key={p.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                               {p.image_url && <img src={getImageUrl(p.image_url)} className="w-full h-full object-cover" alt=""/>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm text-slate-900 truncate">{p.name}</h4>
                              <p className="text-xs font-medium text-slate-500">{p.category} • Rs {p.price}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-black text-sm text-emerald-600">{p.sold} sold</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl">
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                    <h3 className="text-xl font-black text-slate-900 mb-6">Store Configuration</h3>
                    <form onSubmit={(e) => { e.preventDefault(); toast.success('Settings updated globally'); }} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Store Name</label>
                          <input type="text" defaultValue="Paws & Cart" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Support Email</label>
                          <input type="email" defaultValue="support@pawsmart.local" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium text-sm" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Currency Symbol</label>
                          <input type="text" defaultValue="Rs" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Flat Shipping Rate</label>
                          <input type="number" defaultValue="50.00" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium text-sm" />
                        </div>
                      </div>

                      <div className="pt-4 mt-2 border-t border-slate-100">
                        <button type="submit" className="w-full md:w-auto px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm">
                          Save Configuration
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* MODALS */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveProduct} className="bg-white rounded-3xl p-8 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-6">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
            <div className="space-y-4">
              <input type="text" required value={productForm.name} onChange={e=>setProductForm({...productForm, name: e.target.value})} placeholder="Name" className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl" />
              <div className="flex gap-4">
                <input type="number" step="0.01" required value={productForm.price} onChange={e=>setProductForm({...productForm, price: e.target.value})} placeholder="Price" className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl" />
                <input type="number" required value={productForm.stock} onChange={e=>setProductForm({...productForm, stock: e.target.value})} placeholder="Stock" className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl" />
              </div>
              <div className="flex gap-4">
                <select value={productForm.category} onChange={e=>setProductForm({...productForm, category: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl">
                  <option>Food</option><option>Toys</option><option>Clothes</option><option>Packages</option><option>Accessories</option>
                </select>
                <select value={productForm.pet_type} onChange={e=>setProductForm({...productForm, pet_type: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl">
                  <option>Dog</option><option>Cat</option><option>Bird</option><option>Fish</option><option>Small Pet</option>
                </select>
              </div>
              <div className="text-sm font-semibold text-slate-600 mt-2">Product Image</div>
              <input type="file" accept="image/*" onChange={e=>setProductForm({...productForm, imageFile: e.target.files[0]})} className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl text-sm" />
              <div className="text-xs text-slate-400 text-center">- OR USE URL -</div>
              <input type="url" value={productForm.image_url} onChange={e=>setProductForm({...productForm, image_url: e.target.value})} placeholder="https://..." className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl" />
              <textarea value={productForm.description} onChange={e=>setProductForm({...productForm, description: e.target.value})} placeholder="Format complete product description here..." className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none rounded-xl h-32 resize-none" />
            </div>
            <div className="flex gap-4 mt-6">
              <button type="button" onClick={() => setShowProductForm(false)} className="flex-1 p-3 bg-slate-100 font-bold rounded-xl">Cancel</button>
              <button type="submit" className="flex-1 p-3 bg-slate-900 text-white font-bold rounded-xl">Save</button>
            </div>
          </form>
        </div>
      )}

      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveUser} className="bg-white rounded-3xl p-8 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-6">Edit User</h2>
            <div className="space-y-4">
              <input type="text" required value={userForm.name} onChange={e=>setUserForm({...userForm, name: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl" />
              <input type="email" required value={userForm.email} onChange={e=>setUserForm({...userForm, email: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl" />
              <select value={userForm.role} onChange={e=>setUserForm({...userForm, role: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl outline-none">
                 <option value="user">User</option>
                 <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex gap-4 mt-6">
              <button type="button" onClick={() => setShowUserModal(false)} className="flex-1 p-3 bg-slate-100 font-bold rounded-xl">Cancel</button>
              <button type="submit" className="flex-1 p-3 bg-slate-900 text-white font-bold rounded-xl">Save</button>
            </div>
          </form>
        </div>
      )}

      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveOrder} className="bg-white rounded-3xl p-8 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-6">Update Order Status</h2>
            <div className="space-y-4">
              <select value={orderForm.status} onChange={e=>setOrderForm({...orderForm, status: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl outline-none">
                 <option value="pending">Pending</option>
                 <option value="processing">Processing</option>
                 <option value="deployed">Deployed</option>
                 <option value="completed">Completed</option>
                 <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex gap-4 mt-6">
              <button type="button" onClick={() => setShowOrderModal(false)} className="flex-1 p-3 bg-slate-100 font-bold rounded-xl">Cancel</button>
              <button type="submit" className="flex-1 p-3 bg-slate-900 text-white font-bold rounded-xl">Save</button>
            </div>
          </form>
        </div>
      )}

      {actionConfirm && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-in-center">
              <h3 className="text-2xl font-black mb-3 text-slate-900">{actionConfirm.title}</h3>
              <p className="text-slate-500 mb-8 font-medium">{actionConfirm.message}</p>
              <div className="flex gap-4">
                 <button onClick={() => setActionConfirm(null)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Go Back</button>
                 <button onClick={actionConfirm.onConfirm} className="flex-1 py-3 bg-[#2d2217] text-white font-bold rounded-xl hover:bg-[#1a140d] shadow-md transition-colors">Confirm</button>
              </div>
           </div>
        </div>
      )}

      {/* Global Admin Delete Confirm */}
      {deleteConfirm.id && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-in-center">
              <h3 className="text-2xl font-black mb-3 text-slate-900 capitalize">Delete {deleteConfirm.type}?</h3>
              <p className="text-slate-500 mb-8 font-medium">Are you sure you want to completely erase this record? This action cannot be undone.</p>
              <div className="flex gap-4">
                 <button onClick={() => setDeleteConfirm({ type: null, id: null })} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Go Back</button>
                 <button onClick={executeDelete} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-md transition-colors">Erase</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
