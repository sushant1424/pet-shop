import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import api from '../../../lib/api';

export default function SettingsTab() {
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({
    name: 'Paws & Cart',
    supportEmail: 'support@pawsmart.local',
    currency: 'Rs',
    shippingRate: 50
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data.store_config) setConfig(res.data.store_config);
      } catch (err) { } finally { setLoading(false); }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/settings/store_config', config);
      toast.success('Settings updated globally');
    } catch (err) {
      toast.error('Failed to update settings');
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-slate-400" /></div>;

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
                value={config.name} 
                onChange={(e) => setConfig({...config, name: e.target.value})}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium text-sm" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Support Email</label>
              <input 
                type="email" 
                value={config.supportEmail} 
                onChange={(e) => setConfig({...config, supportEmail: e.target.value})}
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
                value={config.currency} 
                onChange={(e) => setConfig({...config, currency: e.target.value})}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium text-sm" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Flat Shipping Rate</label>
              <input 
                type="number" 
                value={config.shippingRate} 
                onChange={(e) => setConfig({...config, shippingRate: Number(e.target.value)})}
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
