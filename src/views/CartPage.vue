<template>
  <div class="cart-page">
    <div class="breadcrumb">
      <router-link to="/">Home</router-link> / <span>Cart</span>
    </div>
    <div class="cart-container">
      <h1>Your cart</h1>
      <div v-if="cartStore.isLoading" class="empty-cart">Loading...</div>
      <div v-else-if="cartStore.items.length === 0" class="empty-cart">
        <p>Your cart is empty</p>
        <button @click="goToHome" class="continue-btn">Continue Shopping</button>
      </div>
      <div v-else>
        <div class="cart-header">
          <div class="header-item">Item</div>
          <div class="header-quantity">Quantity</div>
          <div class="header-price">Price</div>
          <div class="header-total">Total Price</div>
        </div>
        <div class="cart-item" v-for="item in cartStore.items" :key="item.cart_id">
          <div class="item-details">
            <img v-if="item.book.image" :src="item.book.image" :alt="item.book.title" class="item-image" />
            <div v-else class="item-image-placeholder">No Image</div>
            <div class="item-info">
              <h3 class="item-title">{{ item.book.title }}</h3>
            </div>
          </div>
          <div class="item-quantity">
            <button @click="cartStore.updateItemQuantity(item.cart_id, item.amount - 1)" class="quantity-btn">-</button>
            <span class="quantity">{{ item.amount }}</span>
            <button @click="cartStore.updateItemQuantity(item.cart_id, item.amount + 1)" class="quantity-btn">+</button>
          </div>
          <div class="item-price">${{ item.book.price.toFixed(2) }}</div>
          <div class="item-total">${{ (item.book.price * item.amount).toFixed(2) }}</div>
          <button @click="confirmRemoveItem(item.cart_id)" class="remove-btn">
             <i class="fas fa-trash-alt"></i>
          </button>
        </div>
        <div class="shopping-summary">
          <h2>Shopping Summary</h2>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${{ cartStore.subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Tax (10%)</span>
            <span>${{ cartStore.tax.toFixed(2) }}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>
          <button @click="proceedToCheckout" class="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { cartStore } from '@/store/cart';

const router = useRouter();

onMounted(() => {
  cartStore.fetchCart();
});

const goToHome = () => router.push({ name: 'home' });
const proceedToCheckout = () => router.push({ name: 'checkout' });

const confirmRemoveItem = (cartItemId) => {
  if (confirm('Are you sure you want to remove this item?')) {
    cartStore.removeItem(cartItemId);
  }
};
</script>

<style scoped>
/* Use existing styles from the original CartPage.vue */
.cart-page { max-width: 900px; margin: auto; padding: 20px; }
.cart-container { background: #fff; padding: 20px; border-radius: 8px; }
.breadcrumb { margin-bottom: 20px; }
h1 { text-align: center; margin-bottom: 20px; }
.empty-cart { text-align: center; padding: 40px; }
.cart-header { display: grid; grid-template-columns: 3fr 1fr 1fr 1fr 40px; font-weight: bold; padding-bottom: 10px; border-bottom: 1px solid #ccc; }
.header-item { grid-column: 1; }
.header-quantity, .header-price, .header-total { text-align: center; }
.cart-item { display: grid; grid-template-columns: 3fr 1fr 1fr 1fr 40px; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee; }
.item-details { display: flex; align-items: center; gap: 15px; }
.item-image { width: 60px; height: 90px; object-fit: contain; }
.item-image-placeholder {
  width: 60px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #aaa;
  font-size: 0.8rem;
  text-align: center;
  border-radius: 4px;
}
.item-quantity { display: flex; align-items: center; justify-content: center; }
.item-price, .item-total { text-align: center; }
.remove-btn { background: none; border: none; cursor: pointer; color: #999; }
.shopping-summary { max-width: 400px; margin-left: auto; margin-top: 30px; background: #f9f9f9; padding: 20px; border-radius: 8px; }
.summary-row { display: flex; justify-content: space-between; padding: 8px 0; }
.summary-row.total { font-weight: bold; font-size: 1.2rem; }
.checkout-btn { width: 100%; padding: 12px; margin-top: 20px; background-color: #e6d430; border: none; cursor: pointer; }
</style>