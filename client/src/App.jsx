import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import Cart from './pages/Cart.jsx';
import useStore from './store/useStore.js';
import api from './lib/api.js';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { user, setFavorites } = useStore();

  useEffect(() => {
    if (user && !isAdminRoute) {
      api.get(`/users/${user.id}/favourites`)
        .then(res => setFavorites(res.data))
        .catch(console.error);
    }
  }, [user]);

  return (
    <div className={`min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden`}>
      {!isAdminRoute && <Navbar />}
      <main className={`flex-1 w-full ${isAdminRoute ? 'h-screen flex' : ''}`}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
