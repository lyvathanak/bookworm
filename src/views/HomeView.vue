<template>
  <div class="home-view">
    <div v-if="isLoading" class="loading">Loading books...</div>
    <div v-else-if="books.length === 0" class="empty-state">
      <h2>No books found.</h2>
      <p>Try adjusting your search or check back later!</p>
    </div>
    <div v-else class="book-grid">
      <div class="book-item" v-for="book in books" :key="book.bid">
        <div class="book-cover" @click="goToBookDetail(book.bid)">
          <img
            v-if="book.image"
            :src="book.image"
            :alt="book.title"
            class="book-cover-img"
          />
          <div v-else class="book-cover-placeholder">
            <span>No Image</span>
          </div>
        </div>
        <h3 class="book-title">{{ book.title }}</h3>
        <router-link
          v-if="book.author"
          :to="`/author/${book.author.author_id}`"
          class="book-author-link"
        >
          <p class="book-author">{{ book.author.author_name }}</p>
        </router-link>
        
        <div class="book-rating">
          <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= getAverageRating(book) }">&#9733;</span>
        </div>

        <div class="book-price-cart">
          <span class="book-price">${{ book.price.toFixed(2) }}</span>
          <button class="add-to-cart-btn" @click="addToCart(book)">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/services/api';
import { cartStore } from '@/store/cart';
import { authStore } from '@/store/auth';

const router = useRouter();
const route = useRoute();
const books = ref([]);
const isLoading = ref(true);

const fetchBooks = async () => {
  isLoading.value = true;
  try {
    const params = {};
    if (route.query.search) {
      params.search = route.query.search;
    }
    if (route.query.genre) {
      params.genre = route.query.genre;
    }
    const { data } = await api.getBooks(params);
    books.value = data;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    books.value = [];
  } finally {
    isLoading.value = false;
  }
};

// FUNCTION TO CALCULATE AVERAGE RATING
const getAverageRating = (book) => {
  if (!book.ratings || book.ratings.length === 0) {
    return 0;
  }
  const total = book.ratings.reduce((acc, rating) => acc + rating.star, 0);
  return total / book.ratings.length;
};


onMounted(fetchBooks);
watch(() => [route.query.search, route.query.genre], fetchBooks);

const goToBookDetail = (bookId) => {
  router.push({ name: 'book-description', params: { id: bookId } });
};

const addToCart = (book) => {
  if (!authStore.isAuthenticated) {
    router.push({name: 'signin'});
    return;
  }
  cartStore.addItem(book.bid, 1);
};
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.loading, .empty-state {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #666;
}
.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}
.book-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  background: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
}
.book-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
.book-cover {
  width: 100%;
  height: 300px;
  margin-bottom: 15px;
  cursor: pointer;
}
.book-cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #aaa;
  font-size: 0.9rem;
  border-radius: 4px;
}
.book-cover-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.book-title {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 5px;
}
.book-author-link {
  text-decoration: none;
}
.book-author {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 10px 0;
}
.book-author:hover {
  color: #000;
}

/* RATING STYLES */
.book-rating {
  margin-bottom: 10px;
}
.star {
  color: #ccc;
  font-size: 1rem;
}
.star.filled {
  color: #fdd835;
}

.book-price-cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}
.book-price {
  font-weight: bold;
  color: #333;
}
.add-to-cart-btn {
  background-color: #e6d430;
  color: #333;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}
</style>