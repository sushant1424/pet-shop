import toast from 'react-hot-toast';

/**
 * SettingsTab Component
 * A functional UI mockup for global admin settings.
 * It demonstrates how forms work in React.
 */
export default function SettingsTab() {
  
  // handleSubmit is called when the user clicks 'Save Configuration'
  // e.preventDefault() stops the page from refreshing when the form submits
  const handleSubmit = (e) => {
    e.preventDefault();
    // Show a success popup to the user
    toast.success('Settings updated globally');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
        
        <h3 className="text-xl font-black text-slate-900 mb-6">Store Configuration</h3>
        
        {/* The form calls our handleSubmit function automatically when saved */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Top input row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Store Name</label>
              <input 
                type="text" 
                defaultValue="Paws & Cart" 
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium text-sm" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Support Email</label>
              <input 
                type="email" 
                defaultValue="support@pawsmart.local" 
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium text-sm" 
              />
            </div>
          </div>
          
          {/* Bottom input row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Currency Symbol</label>
              <input 
                type="text" 
                defaultValue="Rs" 
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium text-sm" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Flat Shipping Rate</label>
              <input 
                type="number" 
                defaultValue="50.00" 
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium text-sm" 
              />
            </div>
          </div>

          {/* Save Button Container */}
          <div className="pt-4 mt-2 border-t border-slate-100">
            <button 
              type="submit" 
              className="w-full md:w-auto px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
            >
              Save Configuration
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
