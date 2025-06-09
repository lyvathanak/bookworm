<template>
  <div class="my-wishlist">
    <div class="section-header">
      <h2>My Wishlist</h2>
    </div>
    
    <div v-if="wishlistItems.length === 0" class="empty-state">
      <i class="fas fa-heart empty-icon"></i>
      <p>Your wishlist is empty</p>
      <router-link to="/home" class="browse-btn">Browse Books</router-link>
    </div>
    
    <div v-else class="wishlist-container">
      <div class="wishlist-stack">
        <div v-for="item in wishlistItems" :key="item.id" class="wishlist-item">
          <div class="book-cover">
            <img :src="item.coverImage || '/placeholder.svg?height=150&width=100'" :alt="item.title" class="book-cover-img" />
          </div>
          <div class="book-details">
            <h3 class="book-title">{{ item.title }}</h3>
            <p class="book-author">{{ item.author }}</p>
            <div class="book-price">${{ item.price.toFixed(2) }}</div>
            <div class="book-availability">✓ Available</div>
            <div class="book-actions">
              <input type="number" v-model.number="item.quantity" min="1" class="quantity-input" />
              <button @click="addToCart(item)" class="add-to-cart-btn">Add to Cart</button>
            </div>
            <a href="#" @click.prevent="removeFromWishlist(item.id)" class="remove-link">Remove</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'MyWishlist',
  setup() {
    const wishlistItems = ref([])

    const loadWishlist = () => {
      try {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
        wishlistItems.value = savedWishlist.map(item => ({
          ...item,
          price: parseFloat(item.price.replace('$', '')) || 0,
          quantity: item.quantity || 1
        }))
      } catch (error) {
        console.error('Error loading wishlist:', error)
        wishlistItems.value = []
      }
    }

    const removeFromWishlist = (bookId) => {
      wishlistItems.value = wishlistItems.value.filter(item => item.id !== bookId)
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems.value))
      window.dispatchEvent(new CustomEvent('wishlist-updated'))
    }

    const addToCart = (item) => {
      try {
        const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]')
        const existingItem = existingCart.find(cartItem => cartItem.id === item.id)
        if (existingItem) {
          existingItem.quantity += item.quantity
        } else {
          existingCart.push({ ...item, quantity: item.quantity })
        }
        localStorage.setItem('cartItems', JSON.stringify(existingCart))
        window.dispatchEvent(new CustomEvent('cart-updated'))
        alert('Added to cart successfully!')
      } catch (error) {
        console.error('Error adding to cart:', error)
        alert('Error adding to cart. Please try again.')
      }
    }

    onMounted(() => {
      loadWishlist()
    })

    return {
      wishlistItems,
      removeFromWishlist,
      addToCart
    }
  }
}
</script>

<style scoped>
.my-wishlist {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 0 auto;
  max-width: 800px;
}

.section-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.section-header h2 {
  font-size: 24px;
  color: #666;
  margin: 0;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-icon {
  font-size: 60px;
  color: #ddd;
  margin-bottom: 20px;
}

.browse-btn {
  display: inline-block;
  background-color: #e6d430;
  color: #333;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.browse-btn:hover {
  background-color: #d4c02a;
}

.wishlist-container {
  position: relative;
}

.wishlist-stack {
  max-height: 400px; /* Adjust height as needed */
  overflow-y: auto; /* Vertical scroll */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wishlist-item {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 15px;
  min-width: 0;
  flex-shrink: 0;
}

.book-cover {
  flex-shrink: 0;
  margin-right: 15px;
}

.book-cover-img {
  height: 150px;
  width: 100px;
  object-fit: cover;
}

.book-details {
  flex-grow: 1;
}

.book-title {
  margin: 0 0 5px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.book-author {
  margin: 0 0 5px 0;
  color: #666;
  font-size: 14px;
}

.book-price {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
}

.book-availability {
  color: #28a745;
  font-size: 12px;
  margin-bottom: 10px;
}

.book-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.quantity-input {
  width: 60px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

.add-to-cart-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #c82333;
}

.remove-link {
  display: block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.remove-link:hover {
  text-decoration: underline;
}

/* Custom scrollbar styling */
.wishlist-stack::-webkit-scrollbar {
  width: 8px;
}

.wishlist-stack::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.wishlist-stack::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

@media (max-width: 768px) {
  .wishlist-item {
    min-width: 250px;
  }
  .book-cover-img {
    height: 120px;
    width: 80px;
  }
}
</style>