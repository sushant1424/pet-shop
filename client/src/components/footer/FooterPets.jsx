import { Link } from 'react-router-dom';
import { Cat, Dog, Fish, Bird, Rabbit } from 'lucide-react';

export default function FooterPets() {
  const PETS = [
    { label: 'Dogs', icon: Dog, type: 'Dog' },
    { label: 'Cats', icon: Cat, type: 'Cat' },
    { label: 'Birds', icon: Bird, type: 'Bird' },
    { label: 'Fish', icon: Fish, type: 'Fish' },
    { label: 'Rabbits', icon: Rabbit, type: 'Rabbit' },
  ];

  return (
    <div>
      <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6 text-slate-100">Shop by Pet</h4>
      <ul className="space-y-4 text-sm font-medium">
        {PETS.map(({ label, icon: Icon, type }) => (
          <li key={label}>
            <Link
              to={`/products?pet_type=${type}`}
              className="flex items-center gap-3 hover:text-white transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#3d3025] flex items-center justify-center group-hover:bg-[#bf6f3a] transition-all">
                <Icon size={14} className="text-[#c9b99a] group-hover:text-white" />
              </div>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
