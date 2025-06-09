<template>
  <div class="cart-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <span @click="goHome">Home</span> / <span>Cart</span>
    </div>

    <!-- Main Cart Section -->
    <div class="cart-container">
      <h1>Your cart</h1>

      <!-- Empty Cart State -->
      <div v-if="cartItems.length === 0" class="empty-cart">
        <div class="empty-cart-content">
          <h2>Your cart is empty</h2>
          <p>Add some books to get started!</p>
          <button @click="continueShopping" class="continue-btn">Continue Shopping</button>
        </div>
      </div>

      <!-- Cart Items Table -->
      <div v-else class="cart-table">
        <div class="cart-header">
          <div class="header-item">Item</div>
          <div class="header-quantity">Quantity</div>
          <div class="header-price">Price</div>
          <div class="header-total">Total Price</div>
        </div>

        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-details">
            <div class="item-image">
              <img :src="item.image || '/placeholder.svg?height=120&width=80'" :alt="item.title">
            </div>
            <div class="item-info">
              <div class="item-isbn">{{ item.isbn }}</div>
              <div class="item-title">{{ item.title }}</div>
              <div class="item-author">{{ item.author }}</div>
            </div>
          </div>
          <div class="item-quantity">
            <button @click="decreaseQuantity(item.id)" class="quantity-btn" :disabled="item.quantity <= 1">-</button>
            <input 
              type="number" 
              min="1" 
              :value="item.quantity" 
              @input="updateQuantity(item.id, $event.target.value)"
              class="quantity-input"
            >
            <button @click="increaseQuantity(item.id)" class="quantity-btn">+</button>
          </div>
          <div class="item-price">${{ formatPrice(item.price) }}</div>
          <div class="item-total">${{ formatPrice(parseFloat(item.price.replace('$', '')) * item.quantity) }}</div>
          <button @click="removeItem(item.id)" class="remove-btn">×</button>
        </div>

        <div class="divider"></div>
      </div>

      <!-- Shopping Summary -->
      <div v-if="cartItems.length > 0" class="shopping-summary">
        <h2>Shopping Summary</h2>
        <p class="summary-note">Check your shopping summary before checkout</p>

        <div class="summary-row">
          <span>Subtotal ({{ totalItems }} items)</span>
          <span>${{ formatPrice(subtotal) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax (8%)</span>
          <span>${{ formatPrice(tax) }}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>${{ formatPrice(shipping) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${{ formatPrice(total) }}</span>
        </div>

        <div class="action-buttons">
          <button @click="checkout" class="checkout-btn">Checkout</button>
          <button @click="continueShopping" class="continue-btn">Continue Shopping</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Cart state
const cartItems = ref([])

// Constants
const taxRate = 0.08 // 8% tax
const shippingRate = 5.99 // Fixed shipping cost

// Computed properties
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''))
    return sum + (price * item.quantity)
  }, 0)
})

const tax = computed(() => subtotal.value * taxRate)

const shipping = computed(() => cartItems.value.length > 0 ? shippingRate : 0)

const total = computed(() => subtotal.value + tax.value + shipping.value)

const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

// Methods
const formatPrice = (price) => {
  if (typeof price === 'number') {
    return price.toFixed(2)
  } else {
    return parseFloat(price.replace('$', '')).toFixed(2)
  }
}

const updateQuantity = (itemId, newQuantity) => {
  const quantity = parseInt(newQuantity)
  if (quantity < 1) return
  
  const item = cartItems.value.find(item => item.id === itemId)
  if (item) {
    item.quantity = quantity
    saveCartToStorage()
  }
}

const increaseQuantity = (itemId) => {
  const item = cartItems.value.find(item => item.id === itemId)
  if (item) {
    item.quantity++
    saveCartToStorage()
  }
}

const decreaseQuantity = (itemId) => {
  const item = cartItems.value.find(item => item.id === itemId)
  if (item && item.quantity > 1) {
    item.quantity--
    saveCartToStorage()
  }
}

const removeItem = (itemId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId)
  saveCartToStorage()
}

const saveCartToStorage = () => {
  localStorage.setItem('bookworm-cart', JSON.stringify(cartItems.value))
}

const loadCartFromStorage = () => {
  const saved = localStorage.getItem('bookworm-cart')
  if (saved) {
    cartItems.value = JSON.parse(saved)
  }
}

const checkout = () => {
  // Navigate to checkout page
  router.push({ name: 'checkout' })
}

const continueShopping = () => {
  // Navigate to home page
  router.push({ name: 'home' })
}

const goHome = () => {
  // Navigate to home page
  router.push({ name: 'home' })
}

onMounted(() => {
  loadCartFromStorage()
})
</script>

<style scoped>
.cart-page {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333333;
  background-color: #ffffff;
}

.breadcrumb {
  margin-bottom: 20px;
  color: #666666;
  font-size: 14px;
}

.breadcrumb span {
  cursor: pointer;
}

.breadcrumb span:hover {
  text-decoration: underline;
  color: #4CAF50;
}

.cart-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

h1 {
  color: #333333;
  font-size: 24px;
  margin-bottom: 20px;
}

h2 {
  color: #333333;
  font-size: 20px;
  margin-bottom: 15px;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
}

.empty-cart-content h2 {
  color: #666666;
  margin-bottom: 10px;
}

.empty-cart-content p {
  color: #999999;
  margin-bottom: 20px;
}

.cart-table {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #001F3F;
}

.cart-header {
  display: flex;
  background-color: #001F3F;
  padding: 15px;
  font-weight: bold;
  color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}

.cart-header > div {
  flex: 1;
}

.header-item {
  flex: 3 !important;
}

.cart-item {
  display: flex;
  padding: 15px;
  align-items: center;
  background-color: #ffffff;
  position: relative;
}

.item-details {
  flex: 3;
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-image img {
  width: 80px;
  height: 120px;
  object-fit: cover;
  background-color: #e9e9e9;
  border-radius: 4px;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-isbn {
  color: #666666;
  font-size: 12px;
}

.item-title {
  font-weight: bold;
  margin: 5px 0;
  color: #333333;
  font-size: 16px;
}

.item-author {
  color: #666666;
  font-size: 14px;
}

.item-quantity {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #e0e0e0;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.quantity-btn:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input {
  width: 50px;
  padding: 8px;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.item-price, .item-total {
  flex: 1;
  text-align: center;
  color: #333333;
  font-weight: bold;
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 25px;
  height: 25px;
  border: none;
  background-color: #ff4444;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background-color: #cc0000;
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 0 15px;
}

.shopping-summary {
  align-self: flex-end;
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #ffffff;
}

.summary-note {
  color: #666666;
  font-style: italic;
  margin-bottom: 20px;
  font-size: 14px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  color: #333333;
}

.summary-row.total {
  font-weight: bold;
  font-size: 18px;
  border-bottom: none;
  color: #333333;
  margin-top: 10px;
  padding-top: 15px;
  border-top: 2px solid #001F3F;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.checkout-btn, .continue-btn {
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s;
}

.checkout-btn {
  background-color: #FFD700;
  color: #001F3F;
}

.checkout-btn:hover {
  background-color: #e6c200;
}

.continue-btn {
  background-color: #f5f5f5;
  color: #333333;
  border: 1px solid #e0e0e0;
}

.continue-btn:hover {
  background-color: #e9e9e9;
}

@media (max-width: 768px) {
  .cart-item {
    flex-wrap: wrap;
    padding-right: 40px;
  }
  
  .item-details {
    flex-basis: 100%;
    margin-bottom: 15px;
  }
  
  .item-quantity, .item-price, .item-total {
    flex-basis: 33.33%;
    margin-bottom: 10px;
  }
  
  .shopping-summary {
    width: 100%;
  }
}
</style>