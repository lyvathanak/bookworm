import { reactive } from 'vue';
import api from '@/services/api';
import { authStore } from './auth';

export const wishlistStore = reactive({
  items: [],
  isLoading: false,

  async fetchWishlist() {
    if (!authStore.isAuthenticated) return;
    this.isLoading = true;
    try {
      const { data } = await api.getWishlist();
      this.items = data;
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      this.items = [];
    } finally {
      this.isLoading = false;
    }
  },

  async toggleWishlist(book) {
    const isWishlisted = this.items.some(item => item.book.bid === book.bid);

    try {
      if (isWishlisted) {
        await api.removeFromWishlist(book.bid);
         alert(`"${book.title}" removed from wishlist.`);
      } else {
        await api.addToWishlist({ bookId: book.bid });
        alert(`"${book.title}" added to wishlist!`);
      }
      await this.fetchWishlist();
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      alert('Could not update wishlist.');
    }
  },
});