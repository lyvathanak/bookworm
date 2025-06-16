<template>
  <div class="book-list">
    <!-- Header Navigation -->
    <div class="profile-header">
      <div class="profile-info">
        <img :src="authorImage" alt="Author Image" class="profile-image" />
        <div class="profile-details">
          <h2>{{ authorName }}</h2>
          <button class="follow-btn">+ Follow</button>
        </div>
      </div>
      <nav class="nav-links">
        <router-link to="/author/james-clear" class="nav-link">Home</router-link>
        <router-link to="/author/james-clear/books" class="nav-link active">Books</router-link>
      </nav>
    </div>

    <!-- Books Section -->
    <div class="books-section">
      <h2>Books</h2>
      <div class="book-grid">
        <div class="book-item" v-for="book in books" :key="book.id">
          <div class="book-cover" @click="goToBookDetail(book.id)">
            <img :src="book.coverImage" :alt="book.title" class="book-cover-img" />
          </div>
          <h3 class="book-title">{{ book.title }}</h3>
          <p class="book-author">{{ book.author }}</p>
          <div class="book-rating">
            <span v-for="i in 5" :key="i" :class="['star', getStarClass(i, book.rating)]">★</span>
          </div>
          <div class="book-price-cart">
            <span class="book-price">{{ book.price }}</span>
            <button class="add-to-cart-btn" @click="addToCart(book)">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import book7Image from '@/assets/book7.png'; // Adjust the image path as needed

// Router for navigation
const router = useRouter();

// Author data
const authorName = ref('James Clear');
const authorImage = ref('https://www.jordanharbinger.com/wp-content/uploads/2018/10/108-james-clear-showart.jpg'); // Replace with actual image URL

// Books data (multiple copies of Atomic Habits as shown in the image)
const books = ref([
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: '$32.00',
    rating: 4.5,
    coverImage: book7Image,
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: '$32.00',
    rating: 4.5,
    coverImage: book7Image,
  },
  {
    id: 3,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: '$32.00',
    rating: 4.5,
    coverImage: book7Image,
  },
  {
    id: 4,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: '$32.00',
    rating: 4.5,
    coverImage: book7Image,
  },
]);

// Navigate to book detail page
const goToBookDetail = (bookId) => {
  router.push({ name: 'book-description', params: { id: bookId } });
};

// Add to cart function
const addToCart = (book) => {
  try {
    const cartItem = {
      id: book.id,
      title: book.title,
      author: book.author,
      price: parseFloat(book.price.replace('$', '')),
      coverImage: book.coverImage,
      quantity: 1,
    };
    localStorage.setItem('cartItems', JSON.stringify([cartItem])); // Overwrites cart with one item
    alert(`"${book.title}" added to cart!`);
    router.push({ name: 'cart' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    alert('Failed to add item to cart. Please try again.');
  }
};

// Star rating helper
const getStarClass = (position, rating) => {
  if (rating >= position) return 'filled';
  else if (rating >= position - 0.5) return 'half-filled';
  return '';
};
</script>

<style scoped>
.book-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
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

.star {
  color: #ccc;
  font-size: 18px;
}

.star.filled {
  color: #e6d430;
}

.star.half-filled {
  position: relative;
  color: #ccc;
}

.star.half-filled::before {
  content: '★';
  position: absolute;
  color: #e6d430;
  width: 50%;
  overflow: hidden;
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