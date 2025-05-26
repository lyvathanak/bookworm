<template>
  <div class="orders-container">
    <h1 class="orders-title">My Orders</h1>
    <div class="orders-list" v-if="orders.length">
      <div class="order-item" v-for="order in orders" :key="order.id">
        <span class="order-id">Order #{{ order.id }}</span>
        <span class="order-date">{{ order.date }}</span>
        <span class="order-total">Total: ${{ order.total }}</span>
        <span class="order-status">{{ order.status }}</span>
      </div>
    </div>
    <p v-else class="no-orders">You have no orders yet.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'


const orders = ref([
  { id: 1, date: 'May 25, 2025', total: 29.98, status: 'Delivered' },
  { id: 2, date: 'May 20, 2025', total: 15.99, status: 'Processing' }
])
</script>

<style scoped>
.orders-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.orders-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.order-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.order-id, .order-date, .order-total, .order-status {
  padding: 5px;
  text-align: center;
}

.order-id {
  font-weight: 600;
}

.order-status {
  color: #2ecc71;
}

.no-orders {
  text-align: center;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .orders-title {
    font-size: 20px;
  }

  .order-item {
    grid-template-columns: 1fr;
    text-align: left;
  }

  .order-id, .order-date, .order-total, .order-status {
    margin-bottom: 5px;
  }
}
</style>