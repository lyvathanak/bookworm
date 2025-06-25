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

        <div v-if="book.ratings" class="star-rating">
          <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= averageRating }">&#9733;</span>
          <span v-if="averageRating > 0" class="average-rating-text">{{ averageRating.toFixed(1) }} out of 5</span>
          <span v-else class="average-rating-text">No ratings yet</span>
        </div>

        <div class="book-price">${{ book.price.toFixed(2) }}</div>
        <div class="book-description">
          <p>{{ book.description || 'No description available for this book.' }}</p>
        </div>
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
        <img :src="book.image" :alt="book.title" class="book-cover-image" />
      </div>
    </div>
    
    <div class="user-rating-section">
      <h3>Leave Your Rating</h3>
      <div class="user-rating-stars">
        <span 
          v-for="n in 5" 
          :key="n" 
          class="star-input"
          :class="{ filled: n <= (hoverRating || userRating) }"
          @mouseover="hoverRating = n"
          @mouseout="hoverRating = 0"
          @click="submitRating(n)">
          &#9733;
        </span>
      </div>
      <p v-if="ratingMessage" class="rating-message">{{ ratingMessage }}</p>
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
// The <script setup> section remains exactly the same as the previous version.
// No changes are needed there.
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import { cartStore } from '@/store/cart';
import { wishlistStore } from '@/store/wishlist';
import { authStore } from '@/store/auth';

const props = defineProps({ id: String });
const router = useRouter(); 

const book = ref(null);
const isLoading = ref(true);
const quantity = ref(1);

const userRating = ref(0);
const hoverRating = ref(0);
const ratingMessage = ref('');

const isWishlisted = computed(() => {
  if (!book.value) return false;
  return wishlistStore.items.some(item => item.book.bid === book.value.bid);
});

const averageRating = computed(() => {
  if (!book.value || !book.value.ratings || book.value.ratings.length === 0) {
    return 0;
  }
  const total = book.value.ratings.reduce((acc, rating) => acc + rating.star, 0);
  return total / book.value.ratings.length;
});

const fetchBook = async (id) => {
  isLoading.value = true;
  ratingMessage.value = '';
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

const submitRating = async (star) => {
    if (!authStore.isAuthenticated) {
        router.push({ name: 'signin' });
        return;
    }
    userRating.value = star;
    ratingMessage.value = 'Submitting...';

    try {
        await api.createRating(book.value.bid, { star });
        ratingMessage.value = 'Thank you for your rating!';
        await fetchBook(props.id); 
    } catch (error) {
        console.error("Failed to submit rating:", error);
        ratingMessage.value = error.response?.data?.message || 'Failed to submit rating.';
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
/* All previous styles remain */
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
.book-description {
  margin: 1.5rem 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
}
.book-actions { display: flex; align-items: center; gap: 10px; }
.quantity-selector { display: flex; border: 1px solid #ccc; }
.quantity-selector button, .quantity-selector input { border: none; background: #fff; padding: 10px; text-align: center;}
.quantity-selector input { width: 40px; }
.add-to-cart-btn, .wishlist-btn { padding: 10px 15px; border: none; cursor: pointer; }
.add-to-cart-btn { background: #333; color: white; }
.wishlist-btn { background: #eee; }
.wishlist-btn.active { background-color: #e6d430; color: #fff;}
.book-details-section { margin-top: 40px; }
.star-rating {
  margin-top: 10px;
  margin-bottom: 10px;
}

.star {
  color: #ccc;
  font-size: 1.5rem;
}

.star.filled {
  color: #fdd835;
}

.average-rating-text {
  margin-left: 10px;
  font-size: 1.1rem;
  color: #555;
}

/* Updated styles for clarity */
.user-rating-section {
    margin-top: 40px;
    padding: 20px;
    border: 1px dashed #ccc;
    border-radius: 8px;
    background-color: #fafafa;
}

.user-rating-section h3 {
    margin-top: 0;
    margin-bottom: 15px;
    text-align: center;
}

.user-rating-stars {
    display: flex;
    justify-content: center;
}

.user-rating-stars .star-input {
    font-size: 2.5rem; /* Made larger to be more obvious */
    color: #ccc;
    cursor: pointer; /* This is the critical line */
    transition: color 0.2s, transform 0.2s;
}

.user-rating-stars .star-input:hover {
    transform: scale(1.1); /* Add a little hover effect */
}

.user-rating-stars .star-input.filled {
    color: #fdd835;
}

.rating-message {
    margin-top: 15px;
    text-align: center;
    color: #28a745;
    font-style: italic;
}
</style>