import { Tag } from 'lucide-react';

export default function PromoBannerForm({ promo, setPromo, onSubmit }) {
  const labelCls = 'block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2';
  const inputCls = 'w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium text-base transition-colors';

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600"><Tag size={16} /></div>
        <div>
          <h3 className="text-sm font-black text-slate-900">Promotional Banner</h3>
          <p className="text-[11px] text-slate-400 font-medium">Top-of-site strip for sales.</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className={labelCls}>Message</label>
            <input type="text" value={promo.message} onChange={e => setPromo({ ...promo, message: e.target.value })} className={inputCls} />
          </div>
          <div className="w-24 shrink-0">
            <label className={labelCls}>Color</label>
            <input type="color" value={promo.bgColor} onChange={e => setPromo({ ...promo, bgColor: e.target.value })} className="w-full h-10 rounded-lg cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-xs font-bold text-slate-700">Enable Banner</span>
          <button type="button" onClick={() => setPromo(p => ({ ...p, enabled: !p.enabled }))} className={`w-10 h-5 rounded-full transition-colors relative ${promo.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${promo.enabled ? 'left-5' : 'left-0.5'}`} />
          </button>
        </div>
        <button type="submit" className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors text-xs">Save Promo</button>
      </form>
    </div>
  );
}
