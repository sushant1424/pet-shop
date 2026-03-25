import { Link } from 'react-router-dom';
import { Cat, Dog, Fish, Bird, Rabbit, Mail, Phone, MapPin, Globe, Heart, Share2 } from 'lucide-react';

/**
 * Footer Component
 * Shared footer displayed on public-facing pages (Landing, Products).
 * Contains navigation links, pet category shortcuts, contact info, and social links.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2d2217] text-[#c9b99a] mt-auto">
      {/* Main Footer Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Column 1 — Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-white font-black text-xl tracking-tight">PawMart</span>
          </div>
          <p className="text-sm leading-relaxed mb-6 text-[#a89880]">
            Your one-stop destination for premium pet supplies — food, toys, clothing, and accessories for every furry, feathered, or finned friend.
          </p>
          {/* Social Icons */}
          <div className="flex gap-3">
            {[Globe, Heart, Share2].map((Icon, i) => (
              <button
                key={i}
                className="w-9 h-9 rounded-full bg-[#3d3025] hover:bg-[#bf6f3a] flex items-center justify-center transition-colors"
                aria-label="Social link"
              >
                <Icon size={16} className="text-[#c9b99a]" />
              </button>
            ))}
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: 'Home', to: '/' },
              { label: 'All Products', to: '/products' },
              { label: 'My Dashboard', to: '/dashboard' },
              { label: 'Shopping Cart', to: '/cart' },
              { label: 'Login', to: '/login' },
              { label: 'Create Account', to: '/signup' },
            ].map(link => (
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

        {/* Column 3 — Shop by Pet */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Shop by Pet</h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: 'Dogs', icon: Dog, type: 'Dog' },
              { label: 'Cats', icon: Cat, type: 'Cat' },
              { label: 'Birds', icon: Bird, type: 'Bird' },
              { label: 'Fish', icon: Fish, type: 'Fish' },
              { label: 'Rabbits', icon: Rabbit, type: 'Rabbit' },
            ].map(({ label, icon: Icon, type }) => (
              <li key={label}>
                <Link
                  to={`/products?pet_type=${type}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors group"
                >
                  <Icon size={15} className="text-[#bf6f3a] group-hover:scale-110 transition-transform" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-[#bf6f3a] mt-0.5 shrink-0" />
              <span className="text-[#a89880]">Thamel, Kathmandu, Nepal</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[#bf6f3a] shrink-0" />
              <span className="text-[#a89880]">+977 01-4567890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-[#bf6f3a] shrink-0" />
              <span className="text-[#a89880]">support@pawmart.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#3d3025]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#7d6e5d]">
            © {currentYear} PawMart. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-[#7d6e5d]">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
