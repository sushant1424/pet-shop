import { Globe, Heart, Share2 } from 'lucide-react';

export default function FooterBrand() {
  return (
    <div className="flex flex-col gap-5">
      <span className="text-white font-black text-2xl tracking-tighter uppercase">PawMart</span>
      <p className="text-sm leading-relaxed text-[#a89880] max-w-xs">
        Your one-stop destination for premium pet supplies — food, toys, clothing, and accessories for every furry, feathered, or finned friend.
      </p>
      <div className="flex gap-3">
        {[Globe, Heart, Share2].map((Icon, i) => (
          <button
            key={i}
            className="w-10 h-10 rounded-2xl bg-[#3d3025] hover:bg-[#bf6f3a] hover:text-white flex items-center justify-center transition-all hover:-translate-y-1 shadow-lg"
            aria-label="Social link"
          >
            <Icon size={18} className="text-[#c9b99a]" />
          </button>
        ))}
      </div>
    </div>
  );
}
