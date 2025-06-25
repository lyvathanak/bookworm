<template>
  <div class="my-orders">
    <h2>My Orders</h2>

    <div v-if="orders.length === 0" class="empty-state">
      <i class="fas fa-shopping-bag empty-icon"></i>
      <p>No orders yet</p>
      <router-link to="/home" class="browse-btn">Start Shopping</router-link>
    </div>

    <div v-else class="orders-table">
      <div class="table-header">
        <div class="header-cell">Order Details</div>
        <div class="header-cell">Quantity</div>
        <div class="header-cell">Price</div>
        <div class="header-cell">Status</div>
      </div>

      <div class="orders-scroll-container" :style="{ maxHeight: '400px', overflowY: 'auto' }">
        <div v-for="order in orders" :key="order.order_id" class="order-row">
          <div class="order-detail">
            <div class="book-info">
              <h4>Order #{{ order.order_id }}</h4>
              <p>{{ new Date(order.created_at).toLocaleDateString() }}</p>
              <ul>
                <li v-for="item in order.items" :key="item.id">
                  {{ item.quantity }} x {{ item.book.title }}
                </li>
              </ul>
            </div>
          </div>
          <div class="order-quantity"></div>
          <div class="order-price">${{ order.total.toFixed(2) }}</div>
          <div class="order-status" :class="getStatusClass(order.status)">
            {{ order.status }}
          </div>
        </div>
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

const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'delivered':
      return 'status-delivered';
    case 'shipped':
      return 'status-shipped';
    case 'order in progress':
    default:
      return 'status-progress';
  }
};
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
  background-color: #0a1f44;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.browse-btn:hover {
  background-color: #083a6b;
}

.orders-table {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  background-color: #0a1f44;
  color: white;
  padding: 15px 20px;
  font-weight: 600;
  flex-shrink: 0;
}

.orders-scroll-container {
  max-height: 400px;
  overflow-y: auto;
  flex-grow: 1;
}

.order-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 20px;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.order-row:last-child {
  border-bottom: none;
}

.order-detail {
  display: flex;
  align-items: center;
  gap: 15px;
}

.book-info h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.book-info p {
  margin: 0 0 5px 0;
  color: #666;
  font-size: 14px;
}

.book-info ul {
  padding-left: 20px;
  margin: 0;
}

.order-quantity, .order-price, .order-status {
  text-align: center;
  font-weight: 500;
}

.order-price {
  color: #28a745;
  font-weight: 600;
}

.status-progress {
  color: #ffc107;
}

.status-shipped {
  color: #17a2b8;
}

.status-delivered {
  color: #28a745;
}

@media (max-width: 768px) {
  .table-header {
    display: none;
  }

  .order-row {
    grid-template-columns: 1fr;
    gap: 15px;
    text-align: left;
  }

  .order-quantity, .order-price, .order-status {
    text-align: left;
  }
}
</style>