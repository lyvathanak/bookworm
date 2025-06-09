<template>
  <div class="checkout-container">
    <h1>Check out</h1>
    
    <div class="account-section">
      <p>Do you have an account?</p>
      <div class="radio-group">
        <label>
          <input type="radio" name="account" value="yes" v-model="hasAccount"> Yes
        </label>
        <label>
          <input type="radio" name="account" value="no" v-model="hasAccount"> No
        </label>
      </div>
    </div>

    <div class="login-form" v-if="hasAccount === 'yes'">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password">
      </div>
      <div class="form-options">
        <label>
          <input type="checkbox" v-model="rememberMe"> Remember me
        </label>
        <a href="#" class="forgot-password">Forgot password?</a>
      </div>
      <button class="sign-in-btn">Sign in</button>
    </div>

    <div class="delivery-section">
      <h2>Choose your delivery option</h2>
      <div class="delivery-options">
        <label>
          <input type="radio" name="delivery" value="address" v-model="deliveryOption"> Delivery address
        </label>
        <label>
          <input type="radio" name="delivery" value="pickup" v-model="deliveryOption"> Shell-pick up
        </label>
      </div>

      <div class="address-form" v-if="deliveryOption === 'address'">
        <div class="form-group">
          <label>*Location</label>
          <select v-model="selectedLocation">
            <option disabled value="">Select address</option>
            <option value="phnom_penh">Phnom Penh, Cambodia</option>
            <!-- Add more locations as needed -->
          </select>
        </div>
        <div class="form-group">
          <label>*Detail</label>
          <textarea v-model="addressDetail" placeholder="Street 123, Infront of ABC building..."></textarea>
        </div>
      </div>
    </div>

    <div class="payment-section">
      <h2>Choose your Payment method</h2>
      <div class="payment-options">
        <label>
          <input type="radio" name="payment" value="aba" v-model="paymentMethod"> ABA
        </label>
        <label>
          <input type="radio" name="payment" value="acleda" v-model="paymentMethod"> ACLEDA
        </label>
        <label>
          <input type="radio" name="payment" value="paypal" v-model="paymentMethod"> PayPal
        </label>
        <label>
          <input type="radio" name="payment" value="cod" v-model="paymentMethod"> Cash on Deliver
        </label>
      </div>
    </div>

    <div class="summary-section">
      <h2>Check out summary</h2>
      <div class="summary-details">
        <div class="summary-row">
          <span>Subtotal ({{ totalItems }} items)</span>
          <span>${{ formatPrice(subtotal) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax (8%)</span>
          <span>${{ formatPrice(tax) }}</span>
        </div>
        <div class="summary-row">
          <span>Delivery</span>
          <span>${{ formatPrice(deliveryOption === 'pickup' ? 0 : shipping) }}</span>
        </div>
        <div class="summary-row">
          <span>Payment:</span>
          <span>{{ paymentMethodDisplay }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${{ formatPrice(finalTotal) }}</span>
        </div>
      </div>
      <p class="summary-note">Check your check out summary before process to payment</p>
      <button class="checkout-btn" @click="processCheckout" :disabled="!canCheckout">Process to checkout</button>
    </div>

    <!-- Transaction Success Popup -->
    <div v-if="showSuccessPopup" class="success-popup">
      <div class="popup-content">
        <div class="success-icon">✓</div>
        <h2>Transaction Successful!</h2>
        <p>Your order has been processed successfully.</p>
        <div class="transaction-details">
          <p><strong>Order Total:</strong> ${{ formatPrice(finalTotal) }}</p>
          <p><strong>Payment Method:</strong> {{ paymentMethodDisplay }}</p>
          <p><strong>Delivery:</strong> {{ deliveryOption === 'pickup' ? 'Shell-pick up' : 'Delivery address' }}</p>
        </div>
        <button class="success-btn" @click="handleSuccessfulCheckout">Successfully</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const hasAccount = ref('no')
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const deliveryOption = ref('address')
const selectedLocation = ref('')
const addressDetail = ref('')
const paymentMethod = ref('cod')

// Cart state
const cartItems = ref([])

// Constants
const taxRate = 0.08 // 8% tax
const shippingRate = 5.99 // Fixed shipping cost

// Popup state
const showSuccessPopup = ref(false)

// Computed properties
const paymentMethodDisplay = computed(() => {
  const methods = {
    'aba': 'ABA',
    'acleda': 'ACLEDA',
    'paypal': 'PayPal',
    'cod': 'Cash on Deliver'
  }
  return methods[paymentMethod.value]
})

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''))
    return sum + (price * item.quantity)
  }, 0)
})

const tax = computed(() => subtotal.value * taxRate)

const shipping = computed(() => cartItems.value.length > 0 ? shippingRate : 0)

const finalTotal = computed(() => {
  const shippingCost = deliveryOption.value === 'pickup' ? 0 : shipping.value
  return subtotal.value + tax.value + shippingCost
})

const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

const canCheckout = computed(() => {
  if (cartItems.value.length === 0) return false
  if (deliveryOption.value === 'address' && (!selectedLocation.value || !addressDetail.value)) return false
  return true
})

// Methods
const formatPrice = (price) => {
  return typeof price === 'number' ? price.toFixed(2) : parseFloat(price.replace('$', '')).toFixed(2)
}

const loadCartFromStorage = () => {
  const saved = localStorage.getItem('bookworm-cart')
  if (saved) {
    cartItems.value = JSON.parse(saved)
  }
}

const processCheckout = () => {
  if (!canCheckout.value) return
  
  // Show success popup
  showSuccessPopup.value = true
}

const handleSuccessfulCheckout = () => {
  // Clear cart
  cartItems.value = []
  localStorage.setItem('bookworm-cart', JSON.stringify([]))
  
  // Hide popup
  showSuccessPopup.value = false
  
  // Navigate to home page
  router.push({ name: 'home' })
}

onMounted(() => {
  loadCartFromStorage()
  
  // Redirect to cart if no items
  if (cartItems.value.length === 0) {
    router.push({ name: 'cart' })
  }
})
</script>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1, h2 {
  color: #333;
  margin-bottom: 20px;
}

.account-section, .delivery-section, .payment-section, .summary-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
}

.radio-group, .payment-options, .delivery-options {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="email"],
.form-group input[type="password"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group textarea {
  height: 80px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.forgot-password {
  color: #0066cc;
  text-decoration: none;
}

.sign-in-btn, .checkout-btn {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.sign-in-btn:hover, .checkout-btn:hover {
  background-color: #45a049;
}

.checkout-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.summary-details {
  margin-bottom: 15px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.summary-row.total {
  font-weight: bold;
  font-size: 18px;
  border-bottom: none;
  margin-top: 10px;
  padding-top: 15px;
  border-top: 2px solid #001F3F;
}

.summary-note {
  color: #666;
  font-style: italic;
  margin-bottom: 15px;
}

.summary-section {
  align-self: flex-end;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #ffffff;
}

input[type="radio"], input[type="checkbox"] {
  margin-right: 8px;
}

/* Success Popup Styles */
.success-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
}

.success-icon {
  font-size: 60px;
  color: #4CAF50;
  margin-bottom: 20px;
}

.popup-content h2 {
  color: #4CAF50;
  margin-bottom: 15px;
  font-size: 28px;
}

.popup-content p {
  margin-bottom: 20px;
  color: #333;
  font-size: 16px;
}

.transaction-details {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  text-align: left;
}

.transaction-details p {
  margin-bottom: 10px;
  color: #555;
}

.success-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.success-btn:hover {
  background-color: #45a049;
}
</style>