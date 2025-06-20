<template>
  <div class="cart-page">
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb">
      <span @click="goToHome">Home</span> / <span>Cart</span>
    </div>

    <!-- Main Cart Content -->
    <div class="cart-container">
      <h1>Your cart</h1>

      <!-- Cart Items Section -->
      <div class="cart-items">
        <div v-if="cartItems.length === 0" class="empty-cart">
          <p>Your cart is empty</p>
          <button @click="goToHome" class="continue-btn">Continue Shopping</button>
        </div>

        <div v-else>
          <!-- Cart Header -->
          <div class="cart-header">
            <div class="header-item">Item</div>
            <div class="header-quantity">Quantity</div>
            <div class="header-price">Price</div>
            <div class="header-total">Total Price</div>
          </div>

          <!-- Cart Item List -->
          <div class="cart-item" v-for="item in cartItems" :key="item.id">
            <div class="item-details">
              <img :src="item.coverImage" :alt="item.title" class="item-image" />
              <div class="item-info">
                <h3 class="item-title">{{ item.title }}</h3>
                <p class="item-author">{{ item.author }}</p>
              </div>
            </div>
            <div class="item-quantity">
              <button @click="decreaseQuantity(item)" class="quantity-btn">-</button>
              <span class="quantity">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
            </div>
            <div class="item-price">${{ item.price.toFixed(2) }}</div>
            <div class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</div>
            <button @click="confirmRemoveItem(item.id)" class="remove-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M10 11v6M14 11v6M5 6l1 13h12l1-13" />
              </svg>
            </button>
          </div>

          <!-- Shopping Summary -->
          <div class="shopping-summary">
            <h2>Shopping Summary</h2>
            <p>Check your shopping summary before checkout</p>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Tax</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
            <button @click="proceedToCheckout" class="checkout-btn">Checkout</button>
            <button @click="goToHome" class="continue-btn">Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartItems = ref([]);

// Helper function to parse price from string or number
const parsePrice = (price) => {
  if (typeof price === 'number') {
    return price;
  }
  if (typeof price === 'string') {
    const cleanPrice = price.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleanPrice);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

// Load cart items from localStorage when component mounts
onMounted(() => {
  try {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      cartItems.value = JSON.parse(storedCart).map(item => ({
        ...item,
        quantity: item.quantity ? parseInt(item.quantity) : 1,
        price: parsePrice(item.price)
      }));
      updateCart();
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    cartItems.value = [];
  }
});

// Navigation functions
const goToHome = () => {
  router.push({ name: 'home' });
};

const proceedToCheckout = () => {
  router.push({ name: 'checkout' });
};

// Cart manipulation functions
const increaseQuantity = (item) => {
  item.quantity++;
  updateCart();
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
    updateCart();
  }
};

const confirmRemoveItem = (id) => {
  if (confirm('Are you sure you want to remove this item from the cart?')) {
    cartItems.value = cartItems.value.filter((item) => item.id !== id);
    updateCart();
  }
};

const updateCart = () => {
  try {
    const cleanedCart = cartItems.value.map(item => ({
      ...item,
      price: parsePrice(item.price),
      quantity: parseInt(item.quantity) || 1
    }));
    localStorage.setItem('cartItems', JSON.stringify(cleanedCart));
    window.dispatchEvent(new CustomEvent('cart-updated'));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Computed properties for totals
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    const price = parsePrice(item.price);
    const quantity = parseInt(item.quantity) || 1;
    return sum + (price * quantity);
  }, 0);
});

const tax = computed(() => {
  return subtotal.value * 0.2; // 20% tax rate
});

const total = computed(() => {
  return subtotal.value + tax.value;
});
</script>

<style scoped>
.cart-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.breadcrumb {
  margin-bottom: 20px;
  color: #e6d430;
  font-size: 14px;
}

.breadcrumb span {
  cursor: pointer;
}

.breadcrumb span:hover {
  text-decoration: underline;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  text-transform: lowercase;
}

.empty-cart {
  text-align: center;
  padding: 40px;
  background: #f9f9f9;
  border-radius: 8px;
}

.empty-cart p {
  margin-bottom: 20px;
  font-size: 18px;
  color: #666;
}

.cart-header {
  display: flex;
  padding: 15px 0;
  background: #1a2526;
  color: #fff;
  font-weight: bold;
  margin-bottom: 15px;
  border-radius: 8px;
}

.cart-header > div {
  flex: 1;
  text-align: center;
}

.header-item {
  flex: 3 !important;
  text-align: left;
  padding-left: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.item-details {
  flex: 3;
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-image {
  width: 80px;
  height: 120px;
  object-fit: contain;
  border: 1px solid #eee;
  border-radius: 4px;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.item-author {
  font-size: 14px;
  color: #666;
}

.item-quantity {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:hover {
  background: #f5f5f5;
}

.quantity {
  font-size: 16px;
  min-width: 20px;
  text-align: center;
}

.item-price,
.item-total {
  flex: 1;
  text-align: center;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  margin-left: 10px;
}

.remove-btn:hover {
  color: #e74c3c;
}

.shopping-summary {
  margin-top: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  max-width: 400px;
  margin-left: auto;
}

.shopping-summary h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.shopping-summary p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.summary-row.total {
  font-weight: bold;
  font-size: 18px;
  border-bottom: none;
  margin-top: 15px;
}

.checkout-btn,
.continue-btn {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.checkout-btn {
  background-color: #e6d430;
  color: #333;
}

.checkout-btn:hover {
  background-color: #d6c420;
}

.continue-btn {
  background: none;
  color: #333;
}

.continue-btn:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .cart-header {
    display: none;
  }

  .cart-item {
    flex-wrap: wrap;
    position: relative;
    padding: 15px 0;
  }

  .item-details {
    flex: 1 0 100%;
    margin-bottom: 15px;
  }

  .item-price,
  .item-quantity,
  .item-total {
    flex: 1;
    text-align: left;
    margin-bottom: 10px;
  }

  .remove-btn {
    position: absolute;
    top: 15px;
    right: 0;
  }

  .shopping-summary {
    max-width: 100%;
  }
}
</style>