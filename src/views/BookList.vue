<template>
  <div class="book-list" v-if="author">
    <div class="profile-header">
      <div class="profile-info">
        <img v-if="author.avatar" :src="`${imageUrlBase}/${author.avatar}`" alt="Author Image" class="profile-image" />
        <div v-else class="profile-image-placeholder"></div>
        <div class="profile-details">
          <h2>{{ author.author_name }}</h2>
          <button @click="toggleFollow" :class="['follow-btn', { 'is-following': isFollowing }]">
            {{ isFollowing ? 'Unfollow' : '+ Follow' }}
          </button>
        </div>
      </div>
      <nav class="nav-links">
        <router-link :to="`/author/${authorId}`" class="nav-link">Home</router-link>
        <router-link :to="`/author/${authorId}/books`" class="nav-link active">Books</router-link>
      </nav>
    </div>

    <div class="books-section">
      <h2>Books by {{ author.author_name }}</h2>
      <div v-if="isLoading" class="loading">Loading books...</div>
      <div v-else-if="author.books && author.books.length === 0" class="empty-state">
        <p>This author has no books yet.</p>
      </div>
      <div v-else class="book-grid">
        <div class="book-item" v-for="book in author.books" :key="book.bid">
          <div class="book-cover" @click="goToBookDetail(book.bid)">
            <img v-if="book.image" :src="`${imageUrlBase}/${book.image}`" :alt="book.title" class="book-cover-img" />
             <div v-else class="book-cover-placeholder">
               <span>No Image</span>
             </div>
          </div>
          <h3 class="book-title">{{ book.title }}</h3>
          <p class="book-author">{{ author.author_name }}</p>
          <div class="book-price-cart">
            <span class="book-price">${{ book.price.toFixed(2) }}</span>
            <button class="add-to-cart-btn" @click="handleAddToCart(book)">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="isLoading" class="loading">Loading author details...</div>
  <div v-else class="empty-state">
    <h2>Author not found.</h2>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/services/api'; // Assuming you have this service
import { cartStore } from '@/store/cart';
import { authStore } from '@/store/auth';

const router = useRouter();
const route = useRoute();

const author = ref(null);
const isLoading = ref(true);
const isFollowing = ref(false); // Placeholder for follow status

// Use the environment variable for the base URL of images
const imageUrlBase = process.env.VUE_APP_API_URL;
const authorId = computed(() => route.params.id);

// Fetch author and their books from the backend
const fetchAuthorDetails = async () => {
  isLoading.value = true;
  try {
    const { data } = await api.getAuthorById(authorId.value);
    author.value = data;
    // Here you would also check if the current user is following this author
    // and set isFollowing.value accordingly.
  } catch (error) {
    console.error("Failed to fetch author details:", error);
    author.value = null;
  } finally {
    isLoading.value = false;
  }
};

// Navigate to a book's detail page
const goToBookDetail = (bookId) => {
  router.push({ name: 'book-description', params: { id: bookId } });
};

// Add a book to the cart
const handleAddToCart = (book) => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'signin' });
    return;
  }
  cartStore.addItem(book.bid, 1);
  alert(`"${book.title}" added to cart!`);
};

const toggleFollow = async () => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'signin' });
    return;
  }

  try {
    if (isFollowing.value) {
      // If currently following, call unfollow API
      await api.unfollowAuthor(authorId.value);
      isFollowing.value = false;
    } else {
      // If not following, call follow API
      await api.followAuthor(authorId.value);
      isFollowing.value = true;
    }
  } catch (error) {
    console.error('Failed to update follow status:', error);
    alert('Could not update follow status. Please try again.');
  }
};

onMounted(() => {
  if (authorId.value) {
    fetchAuthorDetails();
  }
});

</script>

<style scoped>
.book-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.loading, .empty-state {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #666;
}
.profile-header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   background: #fff;
   padding: 10px 20px;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   margin-bottom: 20px;
}
.profile-info {
   display: flex;
   align-items: center;
   gap: 15px;
}
.profile-image {
   width: 50px;
   height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.profile-image-placeholder {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f0f0f0;
}
.profile-details h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}
.follow-btn {
  padding: 5px 15px;
  background: #e0e0e0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}
.follow-btn.is-following {
  background-color: #d0d0d0;
}
.follow-btn:hover {
  background: #d0d0d0;
}
.nav-links {
  display: flex;
  gap: 20px;
}
.nav-link {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;
}
.nav-link.active {
  border-bottom: 2px solid #333;
}
.books-section {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.books-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}
.book-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}
.book-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.book-cover {
  width: 100%;
  height: 300px;
  margin-bottom: 15px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}
.book-cover-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
.book-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #333;
}
.book-author {
  font-size: 14px;
  color: #666;
  margin: 0 0 10px 0;
}
.book-rating {
  margin-bottom: 10px;
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
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
.add-to-cart-btn:hover {
  background-color: #d6c420;
}
@media (max-width: 1024px) {
  .book-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  .book-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .book-grid {
    grid-template-columns: 1fr;
  }
}
</style>