<template>
  <div class="main-content" v-if="user">
    <header class="page-header">
      <h1>User Profile: {{ user.name }}</h1>
      <router-link to="/accounts" class="back-link">← Back to Account Manager</router-link>
    </header>

    <div class="details-grid">
      <div class="detail-card">
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Password:</strong> ********</p>
        <p><strong>Phone:</strong> {{ user.mobile }}</p>
        <p><strong>Date of Birth:</strong> {{ user.dob }}</p>
        <p><strong>Gender:</strong> {{ user.gender }}</p>
        <p><strong>Address:</strong> {{ user.address }}</p>
      </div>

      <div class="detail-card order-history-card">
        <h3>Order History ({{ userOrders.length }})</h3>
        <ul v-if="userOrders.length > 0">
          <li v-for="order in userOrders" :key="order.id">
            <span>Order #{{ order.id }} - {{ order.date }}</span>
            <span class="status" :class="order.status.toLowerCase()">{{ order.status }}</span>
            <router-link :to="`/orders/${order.id}`" class="btn-details">View</router-link>
          </li>
        </ul>
        <p v-else>This user has no order history.</p>
      </div>
    </div>
  </div>
  <div v-else class="main-content"><p>Loading user details...</p></div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  name: 'UserDetail',
  setup() {
    const store = useStore();
    const route = useRoute();
    const userId = parseInt(route.params.id);

    const user = computed(() => store.state.users.find(u => u.id === userId));
    const userOrders = computed(() => {
        if (!user.value) return [];
        return store.state.orders.filter(o => o.userId === userId);
    });

    return { user, userOrders };
  }
};
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.back-link { color: #415a77; text-decoration: none; }
.details-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
.detail-card { background: #fdfdfd; padding: 1.5rem; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.detail-card h3 { margin-bottom: 1rem; }
.detail-card p { margin-bottom: 0.75rem; }
.order-history-card ul { list-style: none; }
.order-history-card li { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid #eee; }
.status { padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; color: white; text-transform: capitalize; }
.status.pending { background-color: #ff9800; }
.status.shipped { background-color: #4caf50; }
.status.cancelled { background-color: #f44336; }
.btn-details { padding: 0.3rem 0.8rem; background-color: #415a77; color: white; text-decoration: none; border-radius: 5px; }
</style>