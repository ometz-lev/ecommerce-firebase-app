// This file defines the Redux slice for managing the shopping cart state in the application.
//It includes actions for adding, removing, and updating items in the cart, as well as clearing the entire cart.  

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, CartItem } from '../types/Product';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to add a product to the cart. If the product already exists, it increments the count.
    addToCart(state, action: PayloadAction<Product>) {
      const prod = action.payload;
      const existing = state.items.find((i) => i.id === prod.id);
      if (existing) {
        existing.count += 1;
      } else {
        state.items.push({ ...prod, count: 1 });
      }
    },
    // Action to remove a product from the cart by its ID.
    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    removeOneFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        if (existing.count > 1) {
          existing.count -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
    },
    // Action to update the count of a specific product in the cart. Ensures the count is at least 1.
    updateCount(state, action: PayloadAction<{ id: string; count: number }>) {
      const { id, count } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) existing.count = Math.max(1, count);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, removeOneFromCart, updateCount, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
