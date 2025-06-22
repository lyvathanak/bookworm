import { reactive } from 'vue';
import api from '@/services/api';

export const cartStore = reactive({
  items: [],
  isLoading: false,

  get subtotal() {
    return this.items.reduce((total, item) => total + item.book.price * item.amount, 0);
  },
  
  get tax() {
    return this.subtotal * 0.10; // 10% tax
  },

  get total() {
    return this.subtotal + this.tax;
  },

  async fetchCart() {
    this.isLoading = true;
    try {
      const { data } = await api.getCart();
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
      await api.addToCart({ bookId, quantity });
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
      await api.updateCartItem(cartItemId, { quantity });
      await this.fetchCart();
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  },

  async removeItem(cartItemId) {
    try {
      await api.removeCartItem(cartItemId);
      await this.fetchCart();
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  },

  async clearCart() {
    // To implement this, you'd need a backend endpoint like `DELETE /cart/clear`
    for (const item of this.items) {
      await this.removeItem(item.cart_id);
    }
  }
});