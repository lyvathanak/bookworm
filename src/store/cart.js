import { reactive } from 'vue';
import apiClient from '@/services/api';

export const cartStore = reactive({
  items: [],
  isLoading: false,

  get subtotal() {
    return this.items.reduce((total, item) => total + item.book.price * item.amount, 0);
  },
  
  get tax() {
    return this.subtotal * 0.10;
  },

  get total() {
    return this.subtotal + this.tax;
  },

  async fetchCart() {
    this.isLoading = true;
    try {
      const { data } = await apiClient.get('/cart');
      this.items = data;
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      this.items = [];
    } finally {
      this.isLoading = false;
    }
  },

  async addItem(bookId, quantity) {
    this.isLoading = true;
    try {
      await apiClient.post('/cart/add', { bookId, quantity });
      await this.fetchCart();
      alert('Item added to cart!');
    } catch (error) {
      console.error("Failed to add to cart:", error?.response?.data?.message);
      alert(`Could not add item to cart: ${error?.response?.data?.message}`);
    } finally {
      this.isLoading = false;
    }
  },

  async updateItemQuantity(cartItemId, quantity) {
     if (quantity < 1) {
       await this.removeItem(cartItemId);
       return;
     }
    try {
      await apiClient.patch(`/cart/item/${cartItemId}`, { quantity });
      await this.fetchCart();
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  },

  async removeItem(cartItemId) {
    try {
      await apiClient.delete(`/cart/item/${cartItemId}`);
      await this.fetchCart();
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  },

  // FIX: Use the single, more efficient backend endpoint to clear the cart
  async clearCart() {
    try {
        await apiClient.delete('/cart/clear');
        this.items = []; // Clear the items on the frontend immediately
    } catch (error) {
        console.error("Failed to clear cart:", error);
    }
  }
});