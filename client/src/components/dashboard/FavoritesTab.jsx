import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import ProductCard from '../ProductCard';

/**
 * FavoritesTab Component
 * Shows products the user liked. Imports the standard ProductCard to retain uniform design.
 */
export default function FavoritesTab({ favorites }) {
  // Pagination State
  const [favoritesPage, setFavoritesPage] = useState(1);
  const itemsPerPage = 6; // 6 cards fits nicely in a 2x3 grid

  // Slice the favorites array to only show the current page
  const paginatedFavorites = favorites.slice((favoritesPage - 1) * itemsPerPage, favoritesPage * itemsPerPage);
  const totalFavoritesPages = Math.ceil(favorites.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* If the user has no favorites, show empty box */}
        {favorites.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-card rounded-xl border border-border">
            <Heart size={48} className="mx-auto text-muted-foreground opacity-20 mb-4" />
            <p className="text-xl font-medium text-muted-foreground">No favorites yet.</p>
          </div>
        ) : (
          // Use our global `<ProductCard />` component, passing down each 'fav' object as a prop
          paginatedFavorites.map(fav => <ProductCard key={fav.id} product={fav} />)
        )}
      </div>
      
      {/* Dynamic Pagination Controls */}
      {totalFavoritesPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-8">
          <button onClick={() => setFavoritesPage(p => Math.max(1, p - 1))} disabled={favoritesPage === 1} className="p-2 border border-border rounded-lg bg-card hover:bg-muted disabled:opacity-50 transition-colors"><ChevronLeft size={20} /></button>
          <span className="font-semibold text-sm">Page {favoritesPage} of {totalFavoritesPages}</span>
          <button onClick={() => setFavoritesPage(p => Math.min(totalFavoritesPages, p + 1))} disabled={favoritesPage === totalFavoritesPages} className="p-2 border border-border rounded-lg bg-card hover:bg-muted disabled:opacity-50 transition-colors"><ChevronRight size={20} /></button>
        </div>
      )}
    </div>
  );
}
