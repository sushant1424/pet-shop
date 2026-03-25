import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useStore from '../store/useStore';
import { ShoppingCart, LogOut, LayoutDashboard, ChevronDown, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

const APP_NAME = 'PawMart';

export default function Navbar() {
  const { user, cart, logout } = useStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out.');
    navigate('/');
    setMobileOpen(false);
    setLogoutModal(false);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="flex justify-between h-16 items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <span className="text-xl font-extrabold tracking-tight text-foreground">{APP_NAME}</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {[
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
              ].map(nav => (
                <div key={nav.label} className="relative group">
                  <button className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg hover:bg-muted transition-colors">
                    {nav.label} <ChevronDown size={15} className="group-hover:rotate-180 transition-transform"/>
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl border border-border shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    {nav.dropdown.map(item => (
                      <Link key={item.href} to={item.href} className="flex items-center px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-colors">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[11px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative group hidden md:block">
                  <button className="flex items-center gap-2 text-sm font-semibold bg-muted px-3 py-2 rounded-xl hover:bg-secondary transition-colors border border-border">
                    <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center text-white text-xs font-black uppercase">{user.name.charAt(0)}</div>
                    <span>{user.name.split(' ')[0]}</span>
                    <ChevronDown size={15} className="text-muted-foreground group-hover:rotate-180 transition-transform"/>
                  </button>
                  <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl border border-border shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="px-4 py-2 border-b border-border mb-1">
                      <p className="font-bold text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Link to="/dashboard" className="flex items-center px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors gap-2">
                      <LayoutDashboard size={16}/> Dashboard
                    </Link>
                    <div className="border-t border-border my-1"/>
                    <button onClick={() => setLogoutModal(true)} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                      <LogOut size={16}/> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link to="/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground px-4 py-2 rounded-xl hover:bg-muted transition-colors">Login</Link>
                  <Link to="/signup" className="text-sm font-bold bg-primary text-primary-foreground px-5 py-2 rounded-xl hover:bg-primary/90 transition-colors shadow-sm">Sign up</Link>
                </div>
              )}

              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors">
                {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden py-4 border-t border-border space-y-1">
              {[
                { label: '🐕 Dogs', href: '/products?pet_type=Dog' },
                { label: '🐈 Cats', href: '/products?pet_type=Cat' },
                { label: '🥩 Food', href: '/products?category=Food' },
                { label: '🎾 Toys', href: '/products?category=Toys' },
                { label: '📦 Packages', href: '/products?category=Packages' },
              ].map(item => (
                <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-semibold hover:bg-muted rounded-xl transition-colors">
                  {item.label}
                </Link>
              ))}
              
              {user && (
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-bold text-primary hover:bg-muted rounded-xl transition-colors">
                  📊 Dashboard
                </Link>
              )}

              <div className="pt-4 mt-2 border-t border-border flex gap-3 px-2">
                {user ? (
                  <button onClick={() => { setMobileOpen(false); setLogoutModal(true); }} className="flex-1 text-sm font-bold text-destructive border border-destructive/30 py-2.5 rounded-xl hover:bg-destructive/10 transition-colors">Logout</button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-sm font-bold text-center border border-border py-2.5 rounded-xl hover:bg-muted transition-colors">Login</Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1 text-sm font-bold text-center bg-primary text-white py-2.5 rounded-xl hover:bg-primary/90 transition-colors">Sign up</Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {logoutModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-2xl font-black mb-3 text-slate-900">Logout?</h3>
            <p className="text-slate-500 mb-8 font-medium">Are you sure you want to sign out of your account?</p>
            <div className="flex gap-4">
              <button onClick={() => setLogoutModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleLogout} className="flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-md transition-all hover:bg-primary/90">Yes, Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
