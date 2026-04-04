import { Link } from 'react-router-dom';

export default function MobileMenu({ isOpen, setOpen, user, onLogoutClick }) {
  if (!isOpen) return null;

  const NAV_ITEMS = [
    { label: '🐕 Dogs', href: '/products?pet_type=Dog' },
    { label: '🐈 Cats', href: '/products?pet_type=Cat' },
    { label: '🥩 Food', href: '/products?category=Food' },
    { label: '🎾 Toys', href: '/products?category=Toys' },
    { label: '📦 Packages', href: '/products?category=Packages' },
  ];

  return (
    <div className="md:hidden py-4 border-t border-border space-y-1">
      {NAV_ITEMS.map(item => (
        <Link key={item.href} to={item.href} onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm font-semibold hover:bg-muted rounded-xl transition-colors">
          {item.label}
        </Link>
      ))}
      
      {user && (
        <Link to="/dashboard" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm font-bold text-primary hover:bg-muted rounded-xl transition-colors">
          📊 Dashboard
        </Link>
      )}

      <div className="pt-4 mt-2 border-t border-border flex gap-3 px-2">
        {user ? (
          <button onClick={() => { setOpen(false); onLogoutClick(); }} className="flex-1 text-sm font-bold text-destructive border border-destructive/30 py-2.5 rounded-xl hover:bg-destructive/10 transition-colors">Logout</button>
        ) : (
          <>
            <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-sm font-bold text-center border border-border py-2.5 rounded-xl hover:bg-muted transition-colors">Login</Link>
            <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 text-sm font-bold text-center bg-primary text-white py-2.5 rounded-xl hover:bg-primary/90 transition-colors">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}
