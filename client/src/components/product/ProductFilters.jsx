// Sidebar filter panel for the public Products page
export default function ProductFilters({ petTypeParam, categoryParam, handleFilter }) {
  const PET_TYPES = ['Dog', 'Cat', 'Bird', 'Fish', 'Small Pet'];
  const CATEGORIES = ['Food', 'Toys', 'Clothes', 'Packages', 'Accessories'];

  const RadioGroup = ({ name, options, active, allLabel }) => (
    <div className="space-y-2">
      {options.map(opt => (
        <label key={opt} className="flex items-center gap-2.5 cursor-pointer hover:text-primary transition-colors">
          <input type="radio" name={name} value={opt} checked={active === opt} onChange={e => handleFilter(name, e.target.value)} className="accent-primary w-4 h-4" />
          <span className="text-sm font-medium">{opt}</span>
        </label>
      ))}
      <label className="flex items-center gap-2.5 cursor-pointer hover:text-primary transition-colors pt-2 border-t border-border/50">
        <input type="radio" name={name} value="" checked={!active} onChange={() => handleFilter(name, '')} className="accent-primary w-4 h-4" />
        <span className="text-sm font-medium">{allLabel}</span>
      </label>
    </div>
  );

  return (
    <aside className="w-full md:w-56 lg:w-64 bg-white p-5 rounded-2xl border border-border shadow-sm h-fit shrink-0">
      <div className="flex items-center gap-2 font-bold text-base mb-5 pb-3 border-b border-border">
        🔽 Filters
      </div>
      <div className="mb-6">
        <h4 className="font-bold mb-3 text-xs text-muted-foreground uppercase tracking-wider">Pet Type</h4>
        <RadioGroup name="pet_type" options={PET_TYPES} active={petTypeParam} allLabel="All Pets" />
      </div>
      <div>
        <h4 className="font-bold mb-3 text-xs text-muted-foreground uppercase tracking-wider">Category</h4>
        <RadioGroup name="category" options={CATEGORIES} active={categoryParam} allLabel="All Categories" />
      </div>
    </aside>
  );
}
