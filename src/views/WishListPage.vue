<template>
  <div class="wishlist-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <router-link to="/home" class="breadcrumb-link home">Home</router-link>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">Wish List</span>
    </div>
    
    <!-- Page Title -->
    <h1 class="page-title">Wishlist</h1>
    
    <!-- Empty Wishlist Message -->
    <div v-if="wishlistItems.length === 0" class="empty-wishlist">
      <div class="empty-icon">
        <i class="far fa-heart"></i>
      </div>
      <h2>Your wishlist is empty</h2>
      <p>Browse our books and add items you like to your wishlist!</p>
      <router-link to="/home" class="browse-books-btn">Browse Books</router-link>
    </div>
    
    <!-- Books Grid -->
    <template v-else>
      <div class="books-grid">
        <!-- Dynamic Book Items -->
        <div class="book-item" v-for="item in displayedItems" :key="item.id">
          <div class="book-cover" @click="goToBookDetail(item.id)">
            <img v-if="item.image || item.coverImage" :src="item.image || item.coverImage" :alt="item.title" class="book-cover-img">
            <div v-else class="book-cover-placeholder"></div>
          </div>
          <h3 class="book-title">{{ item.title }}</h3>
          <p class="book-author">{{ item.author || 'Unknown Author' }}</p>
          <div class="book-actions">
            <span class="book-price">{{ item.price }}</span>
            <div class="action-buttons">
              <button class="remove-btn" @click="removeFromWishlist(item.id)" title="Remove from wishlist">
                <i class="fas fa-trash-alt"></i>
              </button>
              <button class="add-to-cart-btn" @click="addToCart(item)">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- More Button - Only show if there are more items to display -->
      <div class="more-container" v-if="hasMoreItems">
        <button class="more-btn" @click="loadMore">More</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Wishlist state
const wishlistItems = ref([])
const displayCount = ref(8)
const cartItems = ref([])

// Load wishlist items from localStorage (using consistent key)
const loadWishlist = () => {
  try {
    const savedWishlist = JSON.parse(localStorage.getItem('bookworm-wishlist') || '[]')
    wishlistItems.value = savedWishlist
  } catch (error) {
    console.error('Error loading wishlist:', error)
    wishlistItems.value = []
  }
}

// Load cart items from localStorage
const loadCart = () => {
  try {
    cartItems.value = JSON.parse(localStorage.getItem('bookworm-cart') || '[]')
  } catch (error) {
    console.error('Error loading cart:', error)
    cartItems.value = []
  }
}

// Computed property to determine which items to display
const displayedItems = computed(() => {
  return wishlistItems.value.slice(0, displayCount.value)
})

// Determine if there are more items to show
const hasMoreItems = computed(() => {
  return displayCount.value < wishlistItems.value.length
})

// Function to navigate to book details
const goToBookDetail = (bookId) => {
  router.push({ name: 'book-description', params: { id: bookId } })
}

// Function to remove item from wishlist
const removeFromWishlist = (bookId) => {
  // Update local state
  wishlistItems.value = wishlistItems.value.filter(item => item.id !== bookId)
  
  // Update localStorage with consistent key
  localStorage.setItem('bookworm-wishlist', JSON.stringify(wishlistItems.value))
}

// Function to add item to cart
const addToCart = (book) => {
  // Check if item is already in cart
  const existingItem = cartItems.value.find(item => item.id === book.id)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.value.push({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image || book.coverImage,
      isbn: `ISBN${book.id}${Math.floor(Math.random() * 1000000)}`,
      quantity: 1
    })
  }
  
  // Save to localStorage with consistent key
  localStorage.setItem('bookworm-cart', JSON.stringify(cartItems.value))
  
  // Show confirmation
  alert(`"${book.title}" added to cart!`)
}

// Load more items function
const loadMore = () => {
  displayCount.value += 8
  if (displayCount.value > wishlistItems.value.length) {
    displayCount.value = wishlistItems.value.length
  }
}

// Load data on component mount
onMounted(() => {
  loadWishlist()
  loadCart()
})
</script>

<style scoped>
.wishlist-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.breadcrumb {
  margin-bottom: 20px;
  font-size: 14px;
}

.breadcrumb-link {
  text-decoration: none;
}

.home {
  color: #e6d430;
}

.breadcrumb-separator {
  margin: 0 5px;
  color: #666;
}

.breadcrumb-current {
  color: #666;
}

.page-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 28px;
  color: #333;
}

/* Empty wishlist styles */
.empty-wishlist {
  text-align: center;
  padding: 40px 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 40px;
}

.empty-icon {
  font-size: 60px;
  color: #ddd;
  margin-bottom: 20px;
}

.empty-wishlist h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.empty-wishlist p {
  color: #666;
  margin-bottom: 20px;
}

.browse-books-btn {
  display: inline-block;
  background-color: #e6d430;
  color: #333;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.browse-books-btn:hover {
  background-color: #d6c420;
}

/* Books grid styles */
.books-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 40px;
}

.book-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.book-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.book-cover {
  margin-bottom: 15px;
  aspect-ratio: 2/3;
  overflow: hidden;
  cursor: pointer;
  border-radius: 4px;
}

.book-cover-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.book-cover-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
}

.book-title {
  font-size: 16px;
  margin: 0 0 5px 0;
  font-weight: 600;
  color: #333;
}

.book-author {
  font-size: 14px;
  margin: 0 0 10px 0;
  color: #666;
}

.book-actions {
  display: flex;
  flex-direction: column;
  margin-top: auto;
}

.book-price {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.add-to-cart-btn {
  flex: 1;
  background-color: #e6d430;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #d6c420;
}

.remove-btn {
  background-color: #f5f5f5;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #ffebee;
  color: #f44336;
}

.more-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.more-btn {
  background-color: #e6d430;
  border: none;
  padding: 10px 40px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.more-btn:hover {
  background-color: #d6c420;
}

@media (max-width: 1024px) {
  .books-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .books-grid {
    grid-template-columns: 1fr;
  }
}
</style>