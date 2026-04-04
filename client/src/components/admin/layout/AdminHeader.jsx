/**
 * AdminHeader Component
 * Shows the title of the current tab and user profile info.
 */
export default function AdminHeader({ activeTab, user }) {
  const getTitle = () => {
    switch(activeTab) {
      case 'cms': return 'Content Management';
      case 'analytics': return 'Analytics Overview';
      default: return `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management`;
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-8 pt-4">
      <h1 className="text-2xl font-bold text-slate-900 capitalize">
        {getTitle()}
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-1.5 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">{user?.name?.charAt(0)}</div>
          <span className="font-semibold text-sm text-slate-700">{user?.name?.split(' ')[0]}</span>
        </div>
      </div>
    </header>
  );
}
