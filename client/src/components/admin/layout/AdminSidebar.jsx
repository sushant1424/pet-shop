import { Home, Users, Box, ShoppingBag, Megaphone, BarChart, Settings, LogOut } from 'lucide-react';

/**
 * AdminSidebar Component
 * Handles the left-hand navigation menu for the admin panel.
 */
export default function AdminSidebar({ activeTab, setActiveTab, onLogoutClick }) {
  const TABS = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'orders', icon: ShoppingBag, label: 'Orders' },
    { id: 'products', icon: Box, label: 'Products' },
    { id: 'cms', icon: Megaphone, label: 'Content CMS' },
    { id: 'analytics', icon: BarChart, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#e5e7eb] flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-[#e5e7eb] shrink-0">
        <span className="font-extrabold text-xl tracking-tight text-slate-900">PawMart</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
        {TABS.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} 
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${activeTab === tab.id ? 'bg-[#3b4252] text-white shadow-md shadow-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
          >
            <tab.icon size={18} className={activeTab === tab.id ? 'text-white' : 'text-slate-400'}/> 
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-[#e5e7eb] shrink-0">
        <button 
          onClick={onLogoutClick} 
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-500 border border-[#e5e7eb] hover:bg-slate-50 transition-colors"
        >
          <LogOut size={16}/> Logout
        </button>
      </div>
    </aside>
  );
}
