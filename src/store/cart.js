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
      // --- FIX: Improved Error Handling ---
      let errorMessage = 'An unexpected error occurred.';
      if (error.response && error.response.data && error.response.data.message) {
        // Handle structured API errors (e.g., "Out of stock")
        errorMessage = error.response.data.message;
      } else if (error.message) {
        // Handle network errors or other exceptions
        errorMessage = error.message;
      }
      
      console.error("Failed to add to cart:", errorMessage);
      alert(`Could not add item to cart: ${errorMessage}`);
      // ------------------------------------
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

  async clearCart() {
    try {
        await apiClient.delete('/cart/clear');
        this.items = [];
    } catch (error) {
        console.error("Failed to clear cart:", error);
    }
  }
});