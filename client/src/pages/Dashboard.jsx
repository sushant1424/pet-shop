import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Heart, Loader2, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import useStore from '../store/useStore';

// We import the smaller, modular pieces of our Dashboard so this file doesn't get thousands of lines long
import OrdersTab from '../components/dashboard/OrdersTab';
import FavoritesTab from '../components/dashboard/FavoritesTab';
import ProfileTab from '../components/dashboard/ProfileTab';

/**
 * Dashboard Component
 * The main user portal where customers can see their orders and update their profile.
 * We use state to track which "Tab" is currently selected.
 */
export default function Dashboard() {
  // Pull our global user object from Zustand (our global state manager)
  const { user, favorites } = useStore();
  const navigate = useNavigate();
  
  // Local state for the Dashboard
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // Defaults to showing "orders" first

  // useEffect runs code automatically when the page loads
  useEffect(() => {
    // Security check: If there is no user logged in, kick them back to the login page immediately
    if (!user) {
      navigate('/login');
      return;
    }
    
    // We create a fast async function to download their order history
    const fetchData = async () => {
      try {
        const ordersRes = await api.get('/orders');
        // Save the downloaded orders into our local 'orders' state variable
        setOrders(ordersRes.data);
      } catch (err) {
        toast.error('Failed to load orders');
      } finally {
        // Hide the spinning circle once the download finishes or fails
        setLoading(false);
      }
    };
    
    // Execute the download
    fetchData();
  }, [user, navigate]); // The array [] tells React to only re-run this if `user` or `navigate` changes

  // Renders a loading circle while `loading` is true
  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
      
      {/* Top Banner: User Profile Overview */}
      <div className="bg-card rounded-2xl p-8 border border-border shadow-sm mb-8 flex items-center gap-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl font-bold uppercase shrink-0">
          {user?.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      {/* Navigation Tabs (Clicking these changes the 'activeTab' state) */}
      <div className="flex gap-4 border-b border-border mb-8 overflow-x-auto whitespace-nowrap hide-scroll">
        <button 
          onClick={() => setActiveTab('orders')}
          className={`pb-4 px-4 font-semibold text-lg transition-colors border-b-2 ${activeTab === 'orders' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          <div className="flex items-center gap-2"><Package size={20} /> Order History</div>
        </button>
        <button 
          onClick={() => setActiveTab('favorites')}
          className={`pb-4 px-4 font-semibold text-lg transition-colors border-b-2 ${activeTab === 'favorites' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          <div className="flex items-center gap-2"><Heart size={20} /> Favorites ({favorites.length})</div>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`pb-4 px-4 font-semibold text-lg transition-colors border-b-2 ${activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          <div className="flex items-center gap-2"><UserIcon size={20} /> Profile</div>
        </button>
      </div>

      {/* 
        Below we use "Conditional Rendering" (&&).
        If activeTab === 'orders' is true, it renders the <OrdersTab /> component.
        We pass data down to these components using "props", like 'orders={orders}'.
      */}
      {activeTab === 'orders' && <OrdersTab orders={orders} setOrders={setOrders} />}
      
      {activeTab === 'favorites' && <FavoritesTab favorites={favorites} />}
      
      {activeTab === 'profile' && <ProfileTab />}
      
    </div>
  );
}
