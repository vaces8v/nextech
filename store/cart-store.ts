import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IProductCard } from "@/components/ProductCard/ProductCard";

interface CartState {
  cart: IProductCard[];
  addToCart: (product: IProductCard) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          // Check if product is already in cart
          const existingProduct = state.cart.find(
            (item) => item.id === product.id,
          );

          if (existingProduct) {
            return state; // Do not add duplicate
          }

          return { cart: [...state.cart, product] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // name of the item in the storage (must be unique)
      // Optional: customize storage (localStorage by default)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
