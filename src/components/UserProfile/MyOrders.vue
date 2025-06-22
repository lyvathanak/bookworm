<template>
  <div>
    <h3>My Order History</h3>
    <div v-if="isLoading">Loading orders...</div>
    <div v-else-if="orders.length === 0">You have no past orders.</div>
    <div v-else>
      <div v-for="order in orders" :key="order.order_id" class="order-card">
        <p><strong>Order ID:</strong> #{{order.order_id}}</p>
        <p><strong>Date:</strong> {{new Date(order.created_at).toLocaleDateString()}}</p>
        <p><strong>Total:</strong> ${{order.total.toFixed(2)}}</p>
        <p><strong>Status:</strong> {{order.status}}</p>
        <ul>
          <li v-for="item in order.items" :key="item.id">
            {{item.quantity}} x {{item.book.title}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const orders = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const { data } = await api.getMyOrders();
    orders.value = data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.order-card { border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 8px; }
ul { padding-left: 20px; }
</style>