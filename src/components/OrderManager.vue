<template>
  <div class="main-content">
    <header class="page-header">
      <h1>Order Manager</h1>
      <p>Filter and view all customer orders</p>
    </header>

    <div class="toolbar">
      <div class="filter-tabs">
        <button @click="filterStatus = 'All'" :class="{active: filterStatus === 'All'}">All</button>
        <button @click="filterStatus = 'Pending'" :class="{active: filterStatus === 'Pending'}">Pending</button>
        <button @click="filterStatus = 'Shipped'" :class="{active: filterStatus === 'Shipped'}">Shipped</button>
        <button @click="filterStatus = 'Cancelled'" :class="{active: filterStatus === 'Cancelled'}">Cancelled</button>
      </div>
       <input type="search" v-model="searchTerm" placeholder="Search by Order ID or User Name..." class="search-input" />
    </div>

    <div class="order-table">
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
  name: 'OrderManager',
  setup() {
    const store = useStore();
    const searchTerm = ref('');
    const filterStatus = ref('All');

    const orders = computed(() => store.state.orders);
    const users = computed(() => store.state.users);
    
    const getUserName = (userId) => {
        const user = users.value.find(u => u.id === userId);
        return user ? user.name : 'Unknown User';
    };

    const filteredOrders = computed(() => {
      return orders.value.filter(order => {
        const statusMatch = filterStatus.value === 'All' || order.status === filterStatus.value;
        const searchMatch = !searchTerm.value ||
          order.id.toString().includes(searchTerm.value) ||
          getUserName(order.userId).toLowerCase().includes(searchTerm.value.toLowerCase());
        return statusMatch && searchMatch;
      });
    });

    return { searchTerm, filterStatus, filteredOrders, getUserName };
  }
};
</script>

<style scoped>
.main-content {
  flex-grow: 1; padding: 2rem; background-color: #fff;
}
.page-header {
  margin-bottom: 2rem; color: #0d1b2a;
}
.toolbar {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;
}
.filter-tabs button {
  padding: 0.5rem 1rem; border: 1px solid #ddd; background-color: #f9f9f9;
  border-radius: 5px; cursor: pointer; margin-right: 5px;
}
.filter-tabs button.active {
  background-color: #1b263b; color: white; border-color: #1b263b;
}
.search-input {
  padding: 0.5rem; border: 1px solid #ccc; border-radius: 5px; width: 300px;
}
.order-table table {
  width: 100%; border-collapse: collapse; text-align: left;
}
.order-table th, .order-table td {
  padding: 1rem; border-bottom: 1px solid #eee;
}
.order-table th {
  background-color: #1b263b; color: white;
}
.status {
  padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; color: white; text-transform: capitalize;
}
.status.pending { background-color: #ff9800; }
.status.shipped { background-color: #4caf50; }
.status.cancelled { background-color: #f44336; }
.btn-details {
    padding: 0.3rem 0.8rem;
    background-color: #415a77;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}
</style>