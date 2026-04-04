import { Megaphone } from 'lucide-react';

export default function HeroBannerForm({ hero, setHero, onSubmit }) {
  const labelCls = 'block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2';
  const inputCls = 'w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium text-base transition-colors';

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600"><Megaphone size={16} /></div>
        <div>
          <h3 className="text-sm font-black text-slate-900">Hero Banner</h3>
          <p className="text-[11px] text-slate-400 font-medium">Main text on the Landing page.</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Badge Text</label>
            <input type="text" value={hero.badge} onChange={e => setHero({ ...hero, badge: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>CTA Label</label>
            <input type="text" value={hero.ctaLabel} onChange={e => setHero({ ...hero, ctaLabel: e.target.value })} className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Main Headline</label>
          <input type="text" value={hero.headline} onChange={e => setHero({ ...hero, headline: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Subtext</label>
          <textarea value={hero.subtext} onChange={e => setHero({ ...hero, subtext: e.target.value })} rows={2} className={`${inputCls} resize-none`} />
        </div>
        
        {/* Live Preview */}
        <div className="p-4 rounded-xl bg-[#fdf8f3] border border-[#e8ddd0]">
          <p className="text-[10px] font-bold text-[#bf6f3a] uppercase tracking-widest mb-1">{hero.badge}</p>
          <p className="text-base font-black text-[#2d2217] leading-tight mb-1">{hero.headline}</p>
          <p className="text-xs text-[#7d7162] mb-3">{hero.subtext}</p>
          <span className="bg-[#bf6f3a] text-white text-[11px] font-bold px-3 py-1.5 rounded-full inline-block">{hero.ctaLabel}</span>
        </div>
        
        <button type="submit" className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors text-xs">
          Save Hero Content
        </button>
      </form>
    </div>
  );
}
