<template>
  <div class="checkout-container">
    <h1>Checkout</h1>

    <div class="delivery-section">
      <h2>Choose your delivery option</h2>
      <div class="delivery-options">
        <label>
          <input type="radio" name="delivery" value="address" v-model="deliveryOption" /> Delivery address
        </label>
        <label>
          <input type="radio" name="delivery" value="pickup" v-model="deliveryOption" /> Shelf-pick up
        </label>
      </div>

      <div class="address-form" v-if="deliveryOption === 'address'">
        <div class="form-group">
          <label>*Location</label>
          <select v-model="selectedLocation" v-if="selectedLocation !== 'other'">
            <option disabled value="">Select address</option>
            <option value="phnom_penh">Phnom Penh, Cambodia</option>
            <option value="siem_reap">Siem Reap, Cambodia</option>
            <option value="battambang">Battambang, Cambodia</option> 
            <option value="kampot">Kampot, Cambodia</option>
            <option value="sihanoukville">Sihanoukville, Cambodia</option>
            <option value="kep">Kep, Cambodia</option>
            <option value="kompong_cham">Kompong Cham, Cambodia</option>
            <option value="kompong_thom">Kompong Thom, Cambodia</option>
            <option value="preah_sihanouk">Preah Sihanouk, Cambodia</option>
            <option value="other">Other</option> 
          </select>
          <div v-if="selectedLocation === 'other'" class="custom-location-container">
            <input 
              type="text" 
              v-model="customLocation" 
              placeholder="Enter your location"
              class="custom-location-input"
            />
            <button class="back-to-select-btn" @click="selectedLocation = ''">
              Back to list
            </button>
          </div>
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
          <input type="radio" name="payment" value="aba" v-model="paymentMethod" />
          <img src="https://i.pinimg.com/736x/77/36/ae/7736ae2399f3c7c51519425a7c2e4e14.jpg" alt="ABA" class="payment-logo" />
          ABA
        </label>
        <label>
          <input type="radio" name="payment" value="acleda" v-model="paymentMethod" />
          <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/32/e4/f5/32e4f531-484a-a51d-8847-f6039f6cbe99/AppIcon-0-0-1x_U007emarketing-0-8-0-0-sRGB-85-220.png/1200x630wa.png" alt="ACLEDA" class="payment-logo" />
          ACLEDA
        </label>
        <label>
          <input type="radio" name="payment" value="paypal" v-model="paymentMethod" />
          <img src="https://static.vecteezy.com/system/resources/previews/047/750/208/non_2x/paypal-icon-transparent-background-free-png.png" alt="PayPal" class="payment-logo" />
          PayPal
        </label>
        <label>
          <input type="radio" name="payment" value="cod" v-model="paymentMethod" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="payment-icon">
            <path d="M12 2v20M2 12h20" />
          </svg>
          Cash on Deliver
        </label>
      </div>
    </div>

    <div class="summary-section">
      <h2>Check out summary</h2>
      <p>Check your check out summary before process to payment</p>
      
      <div class="cart-items-preview" v-if="cartItems.length > 0">
        <h3>Order Items ({{ cartItems.length }})</h3>
        <div v-for="item in cartItems" :key="item.id" class="cart-item-preview">
          <img :src="item.coverImage || '/placeholder.svg?height=50&width=40'" :alt="item.title" class="item-image" />
          <div class="item-details">
            <span class="item-title">{{ item.title }}</span>
            <span class="item-quantity">Qty: {{ item.quantity }}</span>
          </div>
          <span class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
      </div>
      
      <div class="summary-details">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax</span>
          <span>${{ tax.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Delivery</span>
          <span>${{ deliveryFee.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Payment:</span>
          <span>{{ paymentMethodDisplay }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>
      </div>
      <button class="checkout-btn" @click="processCheckout" :disabled="isProcessing">
        {{ isProcessing ? 'Processing...' : 'Process to checkout' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '@/store/auth'

const router = useRouter()
const deliveryOption = ref('address')
const selectedLocation = ref('')
const customLocation = ref('')
const addressDetail = ref('')
const paymentMethod = ref('cod')
const cartItems = ref([])
const isProcessing = ref(false)

const parsePrice = (price) => {
  if (typeof price === 'number') return price
  if (typeof price === 'string') {
    const cleanPrice = price.replace(/[^0-9.]/g, '')
    const parsed = parseFloat(cleanPrice)
    return isNaN(parsed) ? 0 : parsed
  }
  return 0
}

onMounted(() => {
  const storedCart = localStorage.getItem('cartItems')
  if (storedCart) {
    cartItems.value = JSON.parse(storedCart).map(item => ({
      ...item,
      quantity: item.quantity ? parseInt(item.quantity) : 1,
      price: parsePrice(item.price)
    }))
  }
})

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (parsePrice(item.price) * (parseInt(item.quantity) || 1)), 0)
})

const tax = computed(() => subtotal.value * 0.2)
const deliveryFee = computed(() => deliveryOption.value === 'address' ? 2.5 : 0)
const total = computed(() => subtotal.value + tax.value + deliveryFee.value)
const paymentMethodDisplay = computed(() => ({
  'aba': 'ABA',
  'acleda': 'ACLEDA',
  'paypal': 'PayPal',
  'cod': 'Cash on Deliver'
}[paymentMethod.value] || 'Select a payment method'))

const processCheckout = async () => {
  if (cartItems.value.length === 0) {
    alert('Your cart is empty.')
    return
  }

  if (deliveryOption.value === 'address') {
    if (selectedLocation.value === 'other' && !customLocation.value) {
      alert('Please enter your location.')
      return
    } else if (selectedLocation.value !== 'other' && !selectedLocation.value) {
      alert('Please select a location.')
      return
    }
    if (!addressDetail.value) {
      alert('Please provide address details.')
      return
    }
  }

  if (!paymentMethod.value) {
    alert('Please select a payment method.')
    return
  }

  isProcessing.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 2000))

    if (authStore.isAuthenticated) {
      cartItems.value.forEach(item => {
        authStore.addOrder({
          title: item.title,
          author: item.author,
          coverImage: item.coverImage,
          quantity: item.quantity,
          price: parsePrice(item.price),
          format: item.format || 'Paperback',
          paymentMethod: paymentMethodDisplay.value,
          deliveryOption: deliveryOption.value,
          orderDate: new Date().toISOString(),
          status: 'Order in Progress'
        })
      })
      localStorage.removeItem('cartItems')
      window.dispatchEvent(new CustomEvent('cart-updated'))
      alert('Checkout successful! Thank you for your purchase.')
      router.push('/profile?section=orders')
    } else if (localStorage.getItem('signupData')) {
      router.push('/auth/signin?redirect=/checkout')
    } else {
      router.push('/auth/signup?redirect=/checkout')
    }
  } catch (error) {
    console.error('Checkout error:', error)
    alert('Checkout failed. Please try again.')
  } finally {
    isProcessing.value = false
  }
}
</script>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

h2 {
  color: #333;
  margin-bottom: 15px;
  font-size: 20px;
}

.account-section,
.delivery-section,
.payment-section {
  width: 100%;
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
}

.radio-group,
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.payment-options label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.payment-logo {
  width: 50px;
  height: 20px;
}

.payment-icon {
  margin-right: 10px;
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
  resize: none;
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

.forgot-password:hover {
  text-decoration: underline;
}

.sign-in-btn {
  width: 100%;
  padding: 12px;
  background-color: #1a2526;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.sign-in-btn:hover {
  background-color: #2a3536;
}

.summary-section {
  align-self: flex-end;
  width: 350px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
}

.cart-items-preview {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.cart-items-preview h3 {
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #333;
}

.cart-item-preview {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  background: white;
  border-radius: 6px;
}

.item-image {
  width: 40px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-title {
  font-size: 12px;
  font-weight: 600;
  color: #333;
  line-height: 1.2;
}

.item-quantity {
  font-size: 11px;
  color: #666;
}

.item-price {
  font-size: 12px;
  font-weight: 600;
  color: #0a1f44;
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
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background-color: #e6d430;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.checkout-btn:hover:not(:disabled) {
  background-color: #d6c420;
}

input[type="radio"],
input[type="checkbox"] {
  margin-right: 8px;
}

.custom-location-container {
  display: flex;
  gap: 10px;
}

.custom-location-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.back-to-select-btn {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 12px;
  cursor: pointer;
  font-size: 12px;
}

.back-to-select-btn:hover {
  background-color: #e0e0e0;
}

@media (max-width: 768px) {
  .checkout-container {
    padding: 10px;
  }

  .summary-section {
    width: 100%;
  }
}
</style>