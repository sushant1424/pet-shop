import { create } from 'zustand';

const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,
  cart: [],
  favorites: [],
  
  setAuth: (user, token) => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      set({ user, token });
    }
  },
  
  setFavorites: (favorites) => set({ favorites }),
  addFavorite: (product) => set((state) => ({ favorites: [...state.favorites, product] })),
  removeFavorite: (productId) => set((state) => ({ favorites: state.favorites.filter(p => p.id !== productId) })),
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, cart: [], favorites: [] });
  },

  addToCart: (product, quantity = 1) => set((state) => {
    const existing = state.cart.find((item) => item.id === product.id);
    if (existing) {
      return { cart: state.cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) };
    }
    return { cart: [...state.cart, { ...product, quantity }] };
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId),
  })),

  clearCart: () => set({ cart: [] }),
}));

export default useStore;
