import { Link } from 'react-router-dom';

export default function FooterLinks() {
  const LINKS = [
    { label: 'Home', to: '/' },
    { label: 'All Products', to: '/products' },
    { label: 'My Dashboard', to: '/dashboard' },
    { label: 'Shopping Cart', to: '/cart' },
    { label: 'Login', to: '/login' },
    { label: 'Create Account', to: '/signup' },
  ];

  return (
    <div>
      <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Quick Links</h4>
      <ul className="space-y-4 text-sm font-medium">
        {LINKS.map(link => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="hover:text-white hover:translate-x-1 transition-all inline-block"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
