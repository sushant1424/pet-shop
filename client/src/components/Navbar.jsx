import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useStore from '../store/useStore';
import { ShoppingCart, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

import NavDropdown from './navbar/NavDropdown';
import UserMenu from './navbar/UserMenu';
import MobileMenu from './navbar/MobileMenu';
import LogoutModal from './navbar/LogoutModal';

const APP_NAME = 'PawMart';

const NAV_DATA = [
  { label: 'Animals', dropdown: [
    { label: '🐕 Dog', href: '/products?pet_type=Dog' },
    { label: '🐈 Cat', href: '/products?pet_type=Cat' },
    { label: '🦜 Bird', href: '/products?pet_type=Bird' },
    { label: '🐠 Fish', href: '/products?pet_type=Fish' },
    { label: '🐹 Small Pet', href: '/products?pet_type=Small Pet' },
  ]},
  { label: 'Categories', dropdown: [
    { label: '🥩 Food', href: '/products?category=Food' },
    { label: '🎾 Toys', href: '/products?category=Toys' },
    { label: '👗 Clothes', href: '/products?category=Clothes' },
    { label: '📦 Packages', href: '/products?category=Packages' },
    { label: '🎀 Accessories', href: '/products?category=Accessories' },
  ]},
];

/**
 * Navbar component
 * Responsible for site-wide navigation and user account access.
 */
export default function Navbar() {
  const { user, cart, logout } = useStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully.');
    navigate('/');
    setMobileOpen(false);
    setLogoutModal(false);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center gap-6">
            <Link to="/" className="flex items-center shrink-0">
              <span className="text-xl font-extrabold tracking-tight text-foreground">{APP_NAME}</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {NAV_DATA.map(nav => <NavDropdown key={nav.label} label={nav.label} items={nav.dropdown} />)}
            </div>

            <div className="flex items-center gap-3">
              <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-colors">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <UserMenu user={user} onLogoutClick={() => setLogoutModal(true)} />
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link to="/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground px-4 py-2 rounded-xl transition-colors">Login</Link>
                  <Link to="/signup" className="text-sm font-black bg-primary text-primary-foreground px-6 py-2 rounded-xl hover:bg-primary/90 transition-all shadow-lg active:scale-95 shadow-primary/20">Sign up</Link>
                </div>
              )}

              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors text-slate-500">
                {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
              </button>
            </div>
          </div>

          <MobileMenu isOpen={mobileOpen} setOpen={setMobileOpen} user={user} onLogoutClick={() => setLogoutModal(true)} />
        </div>
      </nav>

      <LogoutModal isOpen={logoutModal} onClose={() => setLogoutModal(false)} onConfirm={handleLogout} />
    </>
  );
}
