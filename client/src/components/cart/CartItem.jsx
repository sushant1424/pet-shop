// The cart item row card used inside the Cart page
import { Trash2 } from 'lucide-react';
import { getImageUrl } from '../../lib/imageUrl';

export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex items-center p-4 bg-card rounded-lg border border-border shadow-sm hover:shadow transition-shadow">
      <div className="w-24 h-24 bg-muted rounded-md border border-border overflow-hidden mr-4 shrink-0">
        {item.image_url
          ? <img src={getImageUrl(item.image_url)} alt={item.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No Image</div>
        }
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-xl mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 font-medium uppercase tracking-wide">{item.category}</p>
        <div className="flex items-center gap-6">
          <span className="font-extrabold text-primary text-lg">Rs {parseFloat(item.price).toFixed(2)}</span>
          <span className="text-sm font-bold border-2 border-border px-3 py-1 rounded-md">Qty: {item.quantity}</span>
        </div>
      </div>
      <div className="pl-6 border-l border-border h-full flex items-center">
        <button onClick={() => onRemove(item.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors" title="Remove item">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
