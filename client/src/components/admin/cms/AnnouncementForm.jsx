import { AlertCircle } from 'lucide-react';

export default function AnnouncementForm({ announcement, setAnnouncement, onSubmit }) {
  const labelCls = 'block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2';
  const inputCls = 'w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium text-base transition-colors';

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600"><AlertCircle size={16} /></div>
        <div>
          <h3 className="text-sm font-black text-slate-900">Site Announcement</h3>
          <p className="text-[11px] text-slate-400 font-medium">Global alert message.</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
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
  );
}
