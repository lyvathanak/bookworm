<template>
  <div v-if="isLoading" class="loading-state">Loading author...</div>
  <div v-else-if="author" class="author-profile">
    <div class="profile-header">
      <div class="profile-info">
        <img :src="author.avatar ? `http://localhost:5000/${author.avatar}` : 'https://via.placeholder.com/50'" alt="Author Image" class="profile-image" />
        <div class="profile-details">
          <h2>{{ author.author_name }}</h2>
          <button class="follow-btn">+ Follow</button>
        </div>
      </div>
    </div>

    <div class="profile-content">
      <h1>{{ author.author_name }}</h1>
      <div class="bio-section">
        <img :src="author.avatar ? `http://localhost:5000/${author.avatar}` : 'https://via.placeholder.com/150'" alt="Author Bio Image" class="bio-image" />
        <p class="bio-text">{{ author.bio || 'No biography available.' }}</p>
      </div>
    </div>

    <div class="books-section">
      <h2>Books by {{ author.author_name }}</h2>
      <div v-if="author.books && author.books.length > 0" class="book-grid">
        <div class="book-item" v-for="book in author.books" :key="book.bid">
          <div class="book-cover" @click="goToBookDetail(book.bid)">
            <img :src="`http://localhost:5000/${book.image}`" :alt="book.title" class="book-cover-img" />
          </div>
          <h3 class="book-title">{{ book.title }}</h3>
          <p class="book-price">${{ book.price.toFixed(2) }}</p>
        </div>
      </div>
      <p v-else>This author has no books listed yet.</p>
    </div>
  </div>
  <div v-else class="loading-state">Author not found.</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router'; // 'useRoute' has been removed
import api from '@/services/api';

const props = defineProps({ id: String });
const router = useRouter(); // We only need the router, not the route object

const author = ref(null);
const isLoading = ref(true);

const fetchAuthor = async (authorId) => {
  isLoading.value = true;
  try {
    const { data } = await api.getAuthorById(authorId);
    author.value = data;
  } catch (error) {
    console.error("Failed to fetch author:", error);
    author.value = null;
  } finally {
    isLoading.value = false;
  }
};

const goToBookDetail = (bookId) => {
  router.push({ name: 'book-description', params: { id: bookId } });
};

onMounted(() => {
  fetchAuthor(props.id);
});

watch(() => props.id, (newId) => {
  fetchAuthor(newId);
});
</script>

<style scoped>
/* Copied and adapted styles from the original AuthorProfile */
.author-profile { max-width: 1200px; margin: 0 auto; padding: 20px; }
.profile-header { display: flex; justify-content: space-between; align-items: center; background: #fff; padding: 10px 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; }
.profile-info { display: flex; align-items: center; gap: 15px; }
.profile-image { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; }
.profile-details h2 { margin: 0; font-size: 18px; }
.follow-btn { padding: 5px 15px; background: #e0e0e0; border: none; border-radius: 5px; cursor: pointer; }
.profile-content { background: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: center; }
.bio-section { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 20px; }
.bio-image { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; }
.bio-text { max-width: 600px; text-align: left; }
.books-section { padding: 20px; background: #fff; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.books-section h2 { margin-bottom: 20px; }
.book-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; }
.book-item { text-align: center; }
.book-cover { cursor: pointer; }
.book-cover-img { width: 100%; height: 270px; object-fit: contain; }
.book-title { font-size: 1rem; font-weight: 600; margin: 10px 0 5px; }
.book-price { color: #666; }
.loading-state { text-align: center; padding: 50px; font-size: 1.2rem; }
</style>