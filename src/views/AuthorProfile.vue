<template>
  <div v-if="isLoading" class="loading-state">Loading author...</div>
  <div v-else-if="author" class="author-profile">
    <div class="profile-header">
      <div class="profile-info">
        <i class="fas fa-user-circle profile-icon"></i>
        <div class="profile-details">
          <h1>{{ author.author_name }}</h1>
          <button @click="toggleFollow" class="follow-btn">
            {{ isFollowing ? 'Unfollow' : '+ Follow' }}
          </button>
        </div>
      </div>
    </div>

    <div class="profile-content">
      <div class="bio-section">
        <h2>About the Author</h2>
        <p class="bio-text">{{ author.bio || 'No biography available.' }}</p>
      </div>

      <div class="books-section">
        <h2>Books by {{ author.author_name }}</h2>
        <div v-if="author.books && author.books.length > 0" class="book-grid">
          <div class="book-item" v-for="book in author.books" :key="book.bid">
            <div class="book-cover" @click="goToBookDetail(book.bid)">
              <img :src="book.image" :alt="book.title" class="book-cover-img" />
            </div>
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-price">${{ book.price.toFixed(2) }}</p>
          </div>
        </div>
        <p v-else>This author has no books listed yet.</p>
      </div>
    </div>
  </div>
  <div v-else class="loading-state">Author not found.</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import { authStore } from '@/store/auth';

const props = defineProps({ id: String });
const router = useRouter();

const author = ref(null);
const isLoading = ref(true);
const isFollowing = ref(false); 

const fetchAuthor = async (authorId) => {
  isLoading.value = true;
  try {
    const { data } = await api.getAuthorById(authorId);
    author.value = data;
    if (data && typeof data.is_following !== 'undefined') {
      isFollowing.value = data.is_following;
    }
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

const toggleFollow = async () => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'signin' });
    return;
  }

  try {
    if (isFollowing.value) {
      await api.unfollowAuthor(props.id);
      isFollowing.value = false;
    } else {
      await api.followAuthor(props.id);
      isFollowing.value = true;
    }
  } catch (error) {
    console.error('Failed to update follow status:', error);
    if (error.response && error.response.status === 409) {
        alert("You are already following this author.");
        isFollowing.value = true;
    } else {
        alert('Could not update follow status. Please try again.');
    }
  }
};

onMounted(() => {
  fetchAuthor(props.id);
});

watch(() => props.id, (newId) => {
  fetchAuthor(newId);
});
</script>

<style scoped>
:root {
  --dark-blue: #001F3F;
  --gold: #FFD700;
}
.author-profile {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  background-color: #f4f7f6;
}
.profile-header {
  background-color: #001F3F;
  color: white;
  padding: 40px 20px;
  border-radius: 0 0 30px 30px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
}
.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
.profile-icon {
  font-size: 80px;
  color: #FFD700;
  background-color: white;
  border-radius: 50%;
  padding: 10px;
  border: 4px solid #001F3F;
}
.profile-details h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
}
.follow-btn {
  padding: 10px 25px;
  background: #FFD700;
  color: #001F3F;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 10px;
  transition: background-color 0.3s, transform 0.2s;
}
.follow-btn:hover {
  background-color: #f0c400;
  transform: scale(1.05);
}
.profile-content {
  padding: 0 20px;
}
.bio-section, .books-section {
  background: #ffffff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-bottom: 2rem;
}
.bio-section h2, .books-section h2 {
  font-size: 1.8rem;
  color: #001F3F;
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #FFD700;
}
.bio-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  text-align: center;
}
.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 25px;
}
.book-item {
  text-align: center;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.book-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
}
.book-cover {
  cursor: pointer;
}
.book-cover-img {
  width: 100%;
  height: 270px;
  object-fit: contain;
  border-radius: 4px;
}
.book-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 10px 0 5px;
  color: #001F3F;
}
.book-price {
  color: #555;
  font-weight: bold;
}
.loading-state {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
}
</style>