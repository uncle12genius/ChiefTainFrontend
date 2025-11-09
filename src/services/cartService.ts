import { api } from './api';
import { Cart } from '../types/cart.types';

export const cartService = {
  async getCart(): Promise<Cart> {
    const response = await api.get<Cart>('/cart');
    return response.data;
  },

  async addToCart(productId: string, quantity: number): Promise<Cart> {
    const response = await api.post<Cart>('/cart/items', {
      productId,
      quantity,
    });
    return response.data;
  },

  async updateQuantity(cartItemId: string, quantity: number): Promise<Cart> {
    const response = await api.put<Cart>(`/cart/items/${cartItemId}`, {
      quantity,
    });
    return response.data;
  },

  async removeFromCart(cartItemId: string): Promise<Cart> {
    const response = await api.delete<Cart>(`/cart/items/${cartItemId}`);
    return response.data;
  },

  async clearCart(): Promise<void> {
    await api.delete('/cart');
  },
};