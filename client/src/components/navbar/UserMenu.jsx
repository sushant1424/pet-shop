import { Link } from 'react-router-dom';
import { LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';

export default function UserMenu({ user, onLogoutClick }) {
  return (
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
        <button onClick={onLogoutClick} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut size={16}/> Logout
        </button>
      </div>
    </div>
  );
}
