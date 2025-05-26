<template>
  <div class="checkout-container">
    <h1>Check out</h1>

    <div class="account-section">
      <p>Do you have an account?</p>
      <div class="radio-group">
        <label>
          <input type="radio" name="account" value="yes" v-model="hasAccount" /> Yes
        </label>
        <label>
          <input type="radio" name="account" value="no" v-model="hasAccount" /> No
        </label>
      </div>
    </div>

    <div class="login-form" v-if="hasAccount === 'yes'">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="form-options">
        <label>
          <input type="checkbox" v-model="rememberMe" /> Remember me
        </label>
        <a href="#" class="forgot-password">Forgot password?</a>
      </div>
      <button class="sign-in-btn" @click="signIn">Sign in</button>
    </div>

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
      <button class="checkout-btn" @click="processCheckout">Process to checkout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// State for account section
const hasAccount = ref('no');
const email = ref('');
const password = ref('');
const rememberMe = ref(false);

// State for delivery section
const deliveryOption = ref('address');
const selectedLocation = ref('');
const addressDetail = ref('');

// State for payment section
const paymentMethod = ref('cod');

// State for cart items
const cartItems = ref([]);

// Router for navigation
const router = useRouter();

// Load cart items from localStorage on mount
onMounted(() => {
  try {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      cartItems.value = JSON.parse(storedCart).map(item => ({
        ...item,
        quantity: item.quantity ? parseInt(item.quantity) : 1,
      }));
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
});

// Computed properties for summary
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const tax = computed(() => {
  return subtotal.value * 0.2; // 20% tax rate to match the cart page
});

const deliveryFee = computed(() => {
  return deliveryOption.value === 'address' ? 2.5 : 0; // $2.5 for delivery, $0 for shelf-pick up
});

const total = computed(() => {
  return subtotal.value + tax.value + deliveryFee.value;
});

const paymentMethodDisplay = computed(() => {
  const methods = {
    'aba': 'ABA',
    'acleda': 'ACLEDA',
    'paypal': 'PayPal',
    'cod': 'Cash on Deliver',
  };
  return methods[paymentMethod.value] || 'Select a payment method';
});

// Methods
const signIn = () => {
  // Simulate sign-in (replace with actual authentication logic)
  if (email.value && password.value) {
    alert('Signed in successfully!');
  } else {
    alert('Please enter email and password.');
  }
};

const processCheckout = () => {
  // Validate delivery details if delivery option is selected
  if (deliveryOption.value === 'address' && (!selectedLocation.value || !addressDetail.value)) {
    alert('Please provide location and address details.');
    return;
  }

  // Validate payment method
  if (!paymentMethod.value) {
    alert('Please select a payment method.');
    return;
  }

  // Simulate checkout process
  alert('Checkout successful! Thank you for your purchase.');

  // Clear cart from localStorage
  localStorage.removeItem('cartItems');

  // Navigate back to home page
  router.push({ name: 'home' });
};
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
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
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

.summary-note {
  color: #666;
  font-style: italic;
  margin-bottom: 15px;
  font-size: 14px;
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
}

.checkout-btn:hover {
  background-color: #d6c420;
}

input[type="radio"],
input[type="checkbox"] {
  margin-right: 8px;
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