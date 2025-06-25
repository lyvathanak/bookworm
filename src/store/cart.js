import { reactive } from 'vue';
// FIX: The import should be named 'api' to match the export from api.js
import api from '@/services/api'; 

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
      const { data } = await api.getCart(); // Correctly uses the api object
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
      // FIX: Use the 'addToCart' method from the 'api' service
      await api.addToCart({ bookId, quantity });
      await this.fetchCart();
      alert('Item added to cart!');
    } catch (error) {
      let errorMessage = 'An unexpected error occurred.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      console.error("Failed to add to cart:", errorMessage);
      alert(`Could not add item to cart: ${errorMessage}`);
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
      // Correctly uses the api object
      await api.updateCartItem(cartItemId, { quantity });
      await this.fetchCart();
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  },

  async removeItem(cartItemId) {
    try {
      // Correctly uses the api object
      await api.removeCartItem(cartItemId);
      await this.fetchCart();
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  },

  async clearCart() {
    try {
        // Correctly uses the api object
        await api.clearCart();
        this.items = [];
    } catch (error) {
        console.error("Failed to clear cart:", error);
    }
  }
});