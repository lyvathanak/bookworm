<template>
  <div class="wishlist-page">
    <h1 class="page-title">My Wishlist</h1>
    <div v-if="wishlistStore.isLoading">Loading...</div>
    <div v-else-if="wishlistStore.items.length === 0" class="empty-wishlist">
      <h2>Your wishlist is empty</h2>
    </div>
    <div v-else class="books-grid">
      <div class="book-item" v-for="item in wishlistStore.items" :key="item.wishid">
        <div class="book-cover-container" @click="goToBookDetail(item.book.bid)">
          <img v-if="item.book.image" :src="item.book.image" :alt="item.book.title" class="book-cover-img"/>
          <div v-else class="book-cover-placeholder">No Image</div>
        </div>
        <h3 class="book-title">{{ item.book.title }}</h3>
        <p class="book-author">{{ item.book.author.author_name }}</p>
        <div class="book-actions">
           <span class="book-price">${{ item.book.price.toFixed(2) }}</span>
           <button class="remove-btn" @click="wishlistStore.toggleWishlist(item.book)" title="Remove">Remove</button>
           <button class="add-to-cart-btn" @click="cartStore.addItem(item.book.bid, 1)">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { wishlistStore } from '@/store/wishlist';
import { cartStore } from '@/store/cart';

const router = useRouter();

onMounted(() => {
  wishlistStore.fetchWishlist();
});

const goToBookDetail = (bookId) => {
  router.push({ name: 'book-description', params: { id: bookId } });
};
</script>

<style scoped>
.wishlist-page { max-width: 1200px; margin: auto; padding: 20px; }
.page-title { text-align: center; margin-bottom: 40px; }
.books-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
.book-item { border: 1px solid #eee; padding: 15px; border-radius: 8px; text-align: center; }
.book-cover-container { cursor: pointer; margin-bottom: 10px; }
.book-cover-img { width: 100%; height: 250px; object-fit: contain; }
.book-cover-placeholder {
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #aaa;
  font-size: 1rem;
  border-radius: 4px;
}
.book-title { font-weight: bold; }
.book-author { color: #666; font-size: 0.9em; }
.book-actions { margin-top: 10px; }
.remove-btn, .add-to-cart-btn { border: none; padding: 8px 12px; cursor: pointer; border-radius: 4px; }
.remove-btn { background-color: #f5f5f5; }
.add-to-cart-btn { background-color: #e6d430; }
</style>