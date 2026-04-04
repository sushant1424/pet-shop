import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function NavDropdown({ label, items }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg hover:bg-muted transition-colors">
        {label} <ChevronDown size={15} className="group-hover:rotate-180 transition-transform"/>
      </button>
      <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl border border-border shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {items.map(item => (
          <Link key={item.href} to={item.href} className="flex items-center px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
