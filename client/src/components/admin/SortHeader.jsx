import { ArrowUpDown } from 'lucide-react';

/**
 * SortHeader Component
 * A reusable table header component that allows users to sort data by clicking on it.
 * It shows an up/down arrow icon next to the column name.
 */
export default function SortHeader({ label, sortKey, currentSort, setSort }) {
  // This function toggles the sort direction (asc to desc) or sets a new column to sort by
  const handleSortClick = () => {
    setSort(prev => ({
      key: sortKey, 
      dir: prev.key === sortKey && prev.dir === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <th 
      onClick={handleSortClick}
      className="py-4 px-3 font-bold text-slate-400 text-xs tracking-wider cursor-pointer hover:text-slate-700 transition-colors select-none group"
    >
      <div className="flex items-center gap-1.5 uppercase">
        {label} 
        {/* The arrow icon changes opacity based on whether this column is currently active */}
        <ArrowUpDown 
          size={12} 
          className={`transition-opacity ${currentSort.key === sortKey ? 'text-slate-900 opacity-100' : 'opacity-30 group-hover:opacity-100'}`}
        />
      </div>
    </th>
  );
}
