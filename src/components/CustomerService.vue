<template>
  <div class="main-content">
    <header class="page-header">
      <h1>Customer Service</h1>
      <p>Name: Overview</p>
    </header>
    <div class="stats-grid">
      <div class="stat-card book-card">
        <h3>Book <font-awesome-icon icon="book-open" /></h3>
        <p>{{ stats.books }} new book added</p>
      </div>
      <div class="stat-card user-card">
        <h3>User <font-awesome-icon icon="user" /></h3>
        <p>{{ (stats.users / 1000).toFixed(1) }}K user</p>
      </div>
      <div class="stat-card sale-card">
        <h3>Sale <font-awesome-icon icon="shopping-cart" /></h3>
        <p>{{ (stats.sales / 1000).toFixed(0) }}K+</p>
      </div>
      <div class="stat-card order-card">
        <h3>Order <font-awesome-icon icon="chart-line" /></h3>
        <p>{{ (stats.orders / 1000).toFixed(1) }}K+</p>
      </div>
    </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'CustomerService',
  setup() {
    const store = useStore();
    return {
      stats: computed(() => store.state.stats),
    };
  }
};
</script>

<style scoped>
.main-content {
  flex-grow: 1;
  padding: 2rem;
  background-color: #fff;
}
.page-header {
  margin-bottom: 2rem;
  color: #0d1b2a;
}
.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
}
.stat-card {
    padding: 1.5rem;
    border-radius: 10px;
    color: #333;
}
.stat-card h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}
.book-card { background-color: #ffcdd2; }
.user-card { background-color: #fff9c4; }
.sale-card { background-color: #c8e6c9; }
.order-card { background-color: #b3e5fc; }
</style>