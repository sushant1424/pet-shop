import { useState } from 'react';
import toast from 'react-hot-toast';
import { Megaphone, Tag, AlertCircle } from 'lucide-react';

export default function CmsTab() {
  const [hero, setHero] = useState({
    headline: 'Your Pet Deserves the Best',
    subtext: 'From premium food to fun toys — everything your pet needs.',
    ctaLabel: 'Shop Now',
    badge: 'Get 50% Off',
  });

  const [promo, setPromo] = useState({
    enabled: true,
    message: 'Free shipping on all orders above Rs 500!',
    bgColor: '#bf6f3a',
  });

  const [announcement, setAnnouncement] = useState({
    enabled: false,
    message: 'We are temporarily closed on public holidays.',
    type: 'info',
  });

  const handleSaveHero = (e) => { e.preventDefault(); toast.success('Hero saved!'); };
  const handleSavePromo = (e) => { e.preventDefault(); toast.success('Promo saved!'); };
  const handleSaveAnnouncement = (e) => { e.preventDefault(); toast.success('Announcement saved!'); };

  const inputCls = 'w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-slate-400 font-medium text-sm transition-colors';
  const labelCls = 'block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5';
  const sectionCls = 'bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]';

  return (
    <div className="animate-in fade-in duration-300 max-w-6xl">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        
        {/* LEFT COLUMN: HERO BANNER */}
        <div className={sectionCls}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600"><Megaphone size={16} /></div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Hero Banner</h3>
              <p className="text-[11px] text-slate-400 font-medium">Main text on the Landing page.</p>
            </div>
          </div>

          <form onSubmit={handleSaveHero} className="space-y-4">
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

        {/* RIGHT COLUMN: PROMO & ANNOUNCEMENT */}
        <div className="space-y-6">
          
          {/* Promo Banner */}
          <div className={sectionCls}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600"><Tag size={16} /></div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Promotional Banner</h3>
                <p className="text-[11px] text-slate-400 font-medium">Top-of-site strip for sales.</p>
              </div>
            </div>

            <form onSubmit={handleSavePromo} className="space-y-4">
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

          {/* Announcement */}
          <div className={sectionCls}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600"><AlertCircle size={16} /></div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Site Announcement</h3>
                <p className="text-[11px] text-slate-400 font-medium">Global alert message.</p>
              </div>
            </div>

            <form onSubmit={handleSaveAnnouncement} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className={labelCls}>Message</label>
                  <input type="text" value={announcement.message} onChange={e => setAnnouncement({ ...announcement, message: e.target.value })} className={inputCls} />
                </div>
                <div className="w-32 shrink-0">
                  <label className={labelCls}>Type</label>
                  <select value={announcement.type} onChange={e => setAnnouncement({ ...announcement, type: e.target.value })} className={inputCls}>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="success">Success</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs font-bold text-slate-700">Enable Announcement</span>
                <button type="button" onClick={() => setAnnouncement(a => ({ ...a, enabled: !a.enabled }))} className={`w-10 h-5 rounded-full transition-colors relative ${announcement.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${announcement.enabled ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
              <button type="submit" className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors text-xs">Save Alert</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
