<template>
  <div class="checkout-page">
    <h1>Checkout</h1>
    <div class="checkout-container">
      <div class="checkout-details">
        <h3>Delivery Address</h3>
        <p>Please enter your full delivery address. This will be used for shipping.</p>
        <textarea v-model="address" placeholder="e.g., #123, Street 456, Sangkat Boeung Keng Kang, Khan Boeung Keng Kang, Phnom Penh"></textarea>
      </div>

      <div class="summary-section">
        <h2>Order Summary</h2>
        <div v-if="cartStore.items.length > 0">
          <div v-for="item in cartStore.items" :key="item.cart_id" class="summary-item">
             <span>{{ item.amount }} x {{ item.book.title }}</span>
             <span>${{ (item.book.price * item.amount).toFixed(2) }}</span>
          </div>
          <hr class="summary-hr">
          <div class="summary-row total">
            <span>Total</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>
          <button class="checkout-btn" @click="processCheckout" :disabled="isProcessing || !address.trim()">
            {{ isProcessing ? 'Processing...' : 'Place Order' }}
          </button>
        </div>
        <div v-else>
            <p>Your cart is empty. Please add items to your cart before checking out.</p>
             <button @click="router.push('/')" class="continue-btn">Continue Shopping</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { cartStore } from '@/store/cart';
import api from '@/services/api'; // Correctly import the API service

const router = useRouter();
const isProcessing = ref(false);
const address = ref('');

onMounted(() => {
  if (cartStore.items.length === 0) {
    cartStore.fetchCart();
  }
});

const processCheckout = async () => {
  if (cartStore.items.length === 0 || !address.value.trim()) {
    alert('Please provide a delivery address and ensure your cart is not empty.');
    return;
  }
  
  isProcessing.value = true;

  const orderData = {
    address: address.value,
    items: cartStore.items.map(item => ({
      bookId: item.book.bid,
      quantity: item.amount,
    })),
  };

  try {
    // THIS IS THE FIX: Call the specific `createOrder` function from our api service
    const { data: newOrder } = await api.createOrder(orderData);
    
    // Simulate successful payment
    await api.simulatePaymentSuccess(newOrder.order_id);

    await cartStore.clearCart();
    
    alert('Checkout successful! Your order has been placed.');
    router.push({ name: 'profile', query: { section: 'orders' } });

  } catch (error) {
    console.error('Checkout error:', error);
    alert('Checkout failed. Please try again.');
  } finally {
    isProcessing.value = false;
  }
};
</script>

<style scoped>
.checkout-page { max-width: 900px; margin: auto; padding: 20px; }
h1, h2 { text-align: center; margin-bottom: 20px; }
.checkout-container { display: flex; gap: 30px; flex-wrap: wrap-reverse; }
.checkout-details { flex: 2; min-width: 300px; }
.checkout-details h3, .summary-section h2 { margin-top: 0; }
.summary-section { flex: 1; background: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #eee; min-width: 280px;}
textarea { width: 100%; min-height: 100px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
.summary-item, .summary-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
.summary-hr { border: 0; border-top: 1px solid #eee; margin: 15px 0; }
.total { font-weight: bold; font-size: 1.2rem; }
.checkout-btn, .continue-btn { width: 100%; padding: 12px; margin-top: 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
.checkout-btn { background-color: #e6d430; color: #333; }
.checkout-btn:disabled { background-color: #ccc; cursor: not-allowed; }
.continue-btn { background-color: #f0f0f0; }
</style>