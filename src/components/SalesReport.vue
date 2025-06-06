<template>
  <div class="main-content">
    <header class="page-header">
      <h1>Sales Report</h1>
      <p>Review sales, revenue, and order metrics</p>
    </header>

    <div class="kpi-grid">
        <div class="kpi-card">
            <h4>Total Revenue</h4>
            <p>${{ totalRevenue.toFixed(2) }}</p>
        </div>
        <div class="kpi-card">
            <h4>Total Orders</h4>
            <p>{{ totalOrders }}</p>
        </div>
        <div class="kpi-card">
            <h4>Average Order Value</h4>
            <p>${{ averageOrderValue.toFixed(2) }}</p>
        </div>
    </div>

    <div class="data-table">
      <h3>All Orders</h3>
      <input type="search" v-model="searchTerm" placeholder="Search orders..." class="search-input" />
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td>#{{ order.id }}</td>
            <td>{{ getUserName(order.userId) }}</td>
            <td>{{ order.date }}</td>
            <td>${{ order.total.toFixed(2) }}</td>
            <td>
              <span class="status" :class="order.status.toLowerCase()">{{ order.status }}</span>
            </td>
            <td>
              <router-link :to="`/orders/${order.id}`" class="btn-details">View</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'SalesReport',
  setup() {
    const store = useStore();
    const searchTerm = ref('');

    const orders = computed(() => store.state.orders);
    const users = computed(() => store.state.users);
    
    const getUserName = (userId) => users.value.find(u => u.id === userId)?.name || 'Unknown';

    const filteredOrders = computed(() => {
        if (!searchTerm.value) return orders.value;
        const lowerSearch = searchTerm.value.toLowerCase();
        return orders.value.filter(order =>
            order.id.toString().includes(lowerSearch) ||
            getUserName(order.userId).toLowerCase().includes(lowerSearch)
        );
    });
    
    const totalRevenue = computed(() => orders.value.reduce((sum, order) => order.status === 'Shipped' ? sum + order.total : sum, 0));
    const totalOrders = computed(() => orders.value.length);
    const averageOrderValue = computed(() => totalOrders.value > 0 ? totalRevenue.value / orders.value.filter(o=>o.status === 'Shipped').length : 0);

    return { searchTerm, filteredOrders, getUserName, totalRevenue, totalOrders, averageOrderValue };
  }
};
</script>

<style scoped>
.main-content { flex-grow: 1; padding: 2rem; background-color: #fff; }
.page-header { margin-bottom: 2rem; }
.kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
.kpi-card { background: #fdfdfd; padding: 1.5rem; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: center; }
.kpi-card h4 { margin-bottom: 0.5rem; color: #777; }
.kpi-card p { font-size: 2rem; font-weight: bold; color: #1b263b; }
.data-table h3 { margin-bottom: 1rem; }
.search-input { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 1rem; }
table { width: 100%; border-collapse: collapse; text-align: left; }
th, td { padding: 1rem; border-bottom: 1px solid #eee; }
th { background-color: #1b263b; color: white; }
.status { padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; color: white; text-transform: capitalize; }
.status.pending { background-color: #ff9800; }
.status.shipped { background-color: #4caf50; }
.status.cancelled { background-color: #f44336; }
.btn-details { padding: 0.3rem 0.8rem; background-color: #415a77; color: white; text-decoration: none; border-radius: 5px; }
</style>