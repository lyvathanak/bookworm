<template>
  <div class="my-wishlist">
    <h2>My Wishlist</h2>
    
    <div v-if="wishlistItems.length === 0" class="empty-state">
      <i class="fas fa-heart empty-icon"></i>
      <p>Your wishlist is empty</p>
      <router-link to="/home" class="browse-btn">Browse Books</router-link>
    </div>
    
    <div v-else class="wishlist-grid">
      <div v-for="item in wishlistItems" :key="item.id" class="wishlist-item">
        <div class="book-image-container">
          <img :src="item.coverImage || '/placeholder.svg?height=200&width=150'" :alt="item.title" class="wishlist-book-image" />
          <button @click="removeFromWishlist(item.id)" class="remove-wishlist-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="wishlist-book-info">
          <h4>{{ item.title }}</h4>
          <p>{{ item.author }}</p>
          <div class="book-price">${{ item.price }}</div>
          <button @click="addToCart(item)" class="add-to-cart-btn">
            <i class="fas fa-shopping-cart"></i>
            Add to Cart
          </button>
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
        wishlistItems.value = savedWishlist
      } catch (error) {
        console.error('Error loading wishlist:', error)
        wishlistItems.value = []
      }
    }

    const removeFromWishlist = (bookId) => {
      wishlistItems.value = wishlistItems.value.filter(item => item.id !== bookId)
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems.value))
      
      // Dispatch event to update wishlist count in navbar
      window.dispatchEvent(new CustomEvent('wishlist-updated'))
    }

    const addToCart = (item) => {
      try {
        // Get existing cart
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
        
        // Check if item already in cart
        const existingItem = existingCart.find(cartItem => cartItem.id === item.id)
        
        if (existingItem) {
          existingItem.quantity += 1
        } else {
          existingCart.push({ ...item, quantity: 1 })
        }
        
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(existingCart))
        
        // Dispatch event to update cart count
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
h2 {
  font-size: 24px;
  color: #666;
  margin-bottom: 25px;
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

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.wishlist-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.wishlist-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.book-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.wishlist-book-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-wishlist-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  color: #dc3545;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.remove-wishlist-btn:hover {
  background: white;
  color: #c82333;
}

.wishlist-book-info {
  padding: 20px;
}

.wishlist-book-info h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
}

.wishlist-book-info p {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 14px;
}

.book-price {
  font-size: 18px;
  font-weight: 700;
  color: #0a1f44;
  margin-bottom: 15px;
}

.add-to-cart-btn {
  width: 100%;
  background-color: #0a1f44;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #083a6b;
}

@media (max-width: 768px) {
  .wishlist-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
}
</style>