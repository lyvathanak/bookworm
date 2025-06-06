<template>
  <div class="main-content" v-if="order">
    <header class="page-header">
      <h1>Order #{{ order.id }}</h1>
      <router-link to="/orders" class="back-link">← Back to Orders</router-link>
    </header>

    <div class="order-details-grid">
        <div class="detail-card">
            <h3>Order Summary</h3>
            <p><strong>Date:</strong> {{ order.date }}</p>
            <p><strong>Total:</strong> ${{ order.total.toFixed(2) }}</p>
            <div class="status-updater">
                <strong>Status:</strong>
                <select v-model="currentStatus" @change="updateStatus">
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Cancelled</option>
                </select>
                <span class="status" :class="order.status.toLowerCase()">{{ order.status }}</span>
            </div>
        </div>

        <div class="detail-card">
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> {{ customer.name }}</p>
            <p><strong>Email:</strong> {{ customer.email }}</p>
            <p><strong>Mobile:</strong> {{ customer.mobile }}</p>
        </div>

        <div class="detail-card items-card">
            <h3>Items in Order</h3>
            <ul>
                <li v-for="item in order.items" :key="item.bookId">
                    <div class="item-info">
                        <span class="item-title">{{ getBook(item.bookId).title }}</span>
                        <span class="item-qty">Qty: {{ item.quantity }}</span>
                    </div>
                    <span class="item-price">${{ (item.quantity * item.price).toFixed(2) }}</span>
                </li>
            </ul>
        </div>
    </div>
  </div>
  <div v-else>
      <p>Loading order details...</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  name: 'OrderDetail',
  setup() {
    const store = useStore();
    const route = useRoute();
    const orderId = parseInt(route.params.id);

    const order = computed(() => store.state.orders.find(o => o.id === orderId));
    const customer = computed(() => store.state.users.find(u => u.id === order.value.userId));
    
    const currentStatus = ref(order.value ? order.value.status : '');

    const getBook = (bookId) => {
        return store.state.books.find(b => b.id === bookId) || {};
    };

    const updateStatus = () => {
        if(confirm(`Are you sure you want to change status to "${currentStatus.value}"?`)) {
            store.dispatch('updateOrderStatus', { orderId, status: currentStatus.value });
        } else {
            // Revert dropdown if user cancels
            currentStatus.value = order.value.status;
        }
    };

    return { order, customer, getBook, currentStatus, updateStatus };
  }
};
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.back-link { color: #415a77; text-decoration: none; }
.order-details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.detail-card {
    background: #fdfdfd; padding: 1.5rem; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.detail-card h3 { margin-bottom: 1rem; }
.detail-card p { margin-bottom: 0.5rem; }
.items-card { grid-column: 1 / -1; }
.items-card ul { list-style: none; }
.items-card li { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #eee; }
.item-qty { color: #777; margin-left: 1rem; }
.status {
  padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; color: white; margin-left: 10px;
}
.status.pending { background-color: #ff9800; }
.status.shipped { background-color: #4caf50; }
.status.cancelled { background-color: #f44336; }
.status-updater select { padding: 5px; border-radius: 5px; border: 1px solid #ccc; margin-left: 10px; }
</style>