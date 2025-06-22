<template>
  <div v-if="isLoading" class="loading-state">Loading...</div>
  <div v-else-if="book" class="book-description-page">
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-link home">Home</router-link>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">{{ book.title }}</span>
    </div>
    <div class="book-main-content">
      <div class="book-info">
        <h1 class="book-title">{{ book.title }}</h1>
        <p v-if="book.author">
            by <router-link :to="`/author/${book.author.author_id}`" class="author-link">{{ book.author.author_name }}</router-link>
        </p>
        <div class="book-price">${{ book.price.toFixed(2) }}</div>
        <div class="book-actions">
          <div class="quantity-selector">
            <button @click="quantity > 1 ? quantity-- : 1">-</button>
            <input type="text" :value="quantity" readonly />
            <button @click="quantity++">+</button>
          </div>
          <button class="add-to-cart-btn" @click="handleAddToCart">ADD TO CART</button>
          <button class="wishlist-btn" @click="handleToggleWishlist" :class="{ active: isWishlisted }">
             <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
      <div class="book-cover">
        <img :src="`http://localhost:5000/${book.image}`" :alt="book.title" class="book-cover-image" />
      </div>
    </div>
    <div class="book-details-section">
      <h2 class="section-title">Details</h2>
      <p><b>Genre:</b> {{ book.genre }}</p>
      <p><b>Published Year:</b> {{ book.published_year }}</p>
      <p><b>ISBN:</b> {{ book.isbn }}</p>
      <p><b>Stock:</b> {{ book.stock > 0 ? 'In Stock' : 'Out of Stock' }}</p>
    </div>
  </div>
  <div v-else class="loading-state">Book not found.</div>
</template>


<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router'; // Removed 'useRoute'
import api from '@/services/api';
import { cartStore } from '@/store/cart';
import { wishlistStore } from '@/store/wishlist';
import { authStore } from '@/store/auth';

const props = defineProps({ id: String });
const router = useRouter(); // 'useRoute' is no longer needed here

const book = ref(null);
const isLoading = ref(true);
const quantity = ref(1);


const isWishlisted = computed(() => {
  if (!book.value) return false;
  return wishlistStore.items.some(item => item.book.bid === book.value.bid);
});

const fetchBook = async (id) => {
  isLoading.value = true;
  try {
    const { data } = await api.getBookById(id);
    book.value = data;
  } catch (error) {
    console.error("Failed to fetch book:", error);
    book.value = null;
  } finally {
    isLoading.value = false;
  }
};

const handleAddToCart = () => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'signin' });
    return;
  }
  if (book.value) {
    cartStore.addItem(book.value.bid, quantity.value);
  }
};

const handleToggleWishlist = () => {
    if (!authStore.isAuthenticated) {
    router.push({ name: 'signin' });
    return;
  }
  if (book.value) {
    wishlistStore.toggleWishlist(book.value);
  }
};

onMounted(() => {
  fetchBook(props.id);
  wishlistStore.fetchWishlist();
});

watch(() => props.id, (newId) => {
  fetchBook(newId);
});
</script>

<style scoped>
.book-description-page { max-width: 1000px; margin: auto; padding: 20px; }
.loading-state { text-align: center; padding: 50px; font-size: 1.2rem; }
.breadcrumb { margin-bottom: 20px; }
.book-main-content { display: flex; flex-wrap: wrap; gap: 40px; }
.book-info { flex: 1; min-width: 300px; }
.book-cover { flex-shrink: 0; width: 300px; }
.book-cover-image { width: 100%; border-radius: 8px; }
.book-title { font-size: 2.2rem; margin-bottom: 0.5rem; }
.author-link { color: #007bff; text-decoration: none; font-size: 1.1rem; }
.book-price { font-size: 2rem; color: #e6d430; margin: 1rem 0; }
.book-actions { display: flex; align-items: center; gap: 10px; }
.quantity-selector { display: flex; border: 1px solid #ccc; }
.quantity-selector button, .quantity-selector input { border: none; background: #fff; padding: 10px; text-align: center;}
.quantity-selector input { width: 40px; }
.add-to-cart-btn, .wishlist-btn { padding: 10px 15px; border: none; cursor: pointer; }
.add-to-cart-btn { background: #333; color: white; }
.wishlist-btn { background: #eee; }
.wishlist-btn.active { background-color: #e6d430; color: #fff;}
.book-details-section { margin-top: 40px; }
</style>