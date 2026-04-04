/**
 * UserStatsCards
 * Shows summary counts of users for the admin dash.
 */
export default function UserStatsCards({ users }) {
  const CARDS = [
    { label: 'Total Users',  value: users.length,                                 color: 'text-slate-400' },
    { label: 'Active Users', value: users.filter(u => u.role === 'user').length, color: 'text-emerald-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {CARDS.map((c, idx) => (
        <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className={`text-sm font-bold mb-1 ${c.color}`}>{c.label}</p>
          <h4 className="text-3xl font-black text-slate-800">{c.value}</h4>
        </div>
      ))}
    </div>
  );
}
