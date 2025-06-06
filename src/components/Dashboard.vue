<template>
  <div class="main-content">
    <header class="page-header">
      <h1>Dashboard</h1>
      <p>Welcome back, Admin!</p>
    </header>

    <div class="stats-grid">
      <div class="stat-card"><h4>Total Revenue</h4><p>${{ totalRevenue.toFixed(2) }}</p><router-link to="/reports/sales">View Sales Report</router-link></div>
      <div class="stat-card"><h4>Pending Orders</h4><p>{{ pendingOrdersCount }}</p><router-link to="/orders">Manage Orders</router-link></div>
      <div class="stat-card"><h4>New Reviews</h4><p>{{ pendingReviewsCount }}</p><router-link to="/reviews">Manage Reviews</router-link></div>
      <div class="stat-card"><h4>Total Users</h4><p>{{ totalUsers }}</p><router-link to="/accounts">Manage Users</router-link></div>
    </div>

    <div class="main-grid">
      <div class="grid-item sales-chart-panel">
          <h3>Monthly Sales (USD)</h3>
          <div class="bar-chart">
            <div class="bar" v-for="month in monthlySales" :key="month.name" :style="{ height: month.value + '%' }"><span class="tooltip">${{ month.revenue.toFixed(0) }}</span></div>
          </div>
          <div class="chart-labels">
            <span v-for="month in monthlySales" :key="month.name">{{ month.name }}</span>
          </div>
      </div>

      <div class="right-column">
          <div class="grid-item list-panel">
              <h3><font-awesome-icon icon="boxes-stacked" /> Inventory Breakdown</h3>
              <div class="pie-chart-container">
                  <div class="pie-chart" :style="pieChartStyle"></div>
                  <div class="pie-legend">
                      <div><span class="legend-dot physical"></span> Physical Books</div>
                      <div><span class="legend-dot ebook"></span> E-Books</div>
                  </div>
              </div>
          </div>
          <div class="grid-item list-panel">
              <h3><font-awesome-icon icon="award" /> Top Selling Products</h3>
              <ul><li v-for="book in topSellingBooks" :key="book.id"><span>{{ book.title }}</span><span class="list-value">{{ book.sales }} sold</span></li></ul>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'DashboardView',
  setup() {
    const store = useStore();
    const breakdown = computed(() => store.getters.inventoryBreakdown);
    const pieChartStyle = computed(() => ({
        background: `conic-gradient(#007bff ${breakdown.value.physical}%, #28a745 0)`
    }));

    return {
      totalRevenue: computed(() => store.getters.totalRevenue),
      pendingOrdersCount: computed(() => store.getters.pendingOrdersCount),
      pendingReviewsCount: computed(() => store.getters.pendingReviewsCount),
      totalUsers: computed(() => store.state.users.length),
      monthlySales: computed(() => store.getters.monthlySales),
      topSellingBooks: computed(() => store.getters.topSellingBooks),
      inventoryBreakdown: breakdown,
      pieChartStyle
    };
  }
};
</script>

<style scoped>
.main-content { flex-grow: 1; padding: 2rem; background-color: #fff; }
.page-header { margin-bottom: 2rem; }
h1 { font-size: 2.5rem; color: #0d1b2a; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
.stat-card { background: #fdfdfd; padding: 1.5rem; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.stat-card h4 { color: #777; margin-bottom: 0.5rem; }
.stat-card p { font-size: 2.2rem; font-weight: bold; color: #1b263b; margin-bottom: 1rem; }
.stat-card a { text-decoration: none; color: #415a77; }
.main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
.grid-item { background: #fdfdfd; padding: 1.5rem; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.right-column { display: flex; flex-direction: column; gap: 1.5rem; }
.list-panel ul { list-style: none; }
.list-panel li { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #eee; }
.list-panel li:last-child { border: none; }
.list-value { color: #777; }
.sales-chart-panel h3, .list-panel h3 { margin-bottom: 1rem; }
.bar-chart { display: flex; align-items: flex-end; justify-content: space-between; height: 250px; border-left: 1px solid #ccc; border-bottom: 1px solid #ccc; padding-left: 10px; }
.bar { width: 4%; background-color: #415a77; transition: height 0.5s ease-out; position: relative; }
.bar:hover { background-color: #7789a8; }
.bar .tooltip { position: absolute; top: -25px; left: 50%; transform: translateX(-50%); background: #333; color: white; padding: 2px 5px; border-radius: 3px; font-size: 0.8rem; white-space: nowrap; opacity: 0; transition: opacity 0.2s; }
.bar:hover .tooltip { opacity: 1; }
.chart-labels { display: flex; justify-content: space-between; margin-top: 0.5rem; }
/* Pie Chart Styles */
.pie-chart-container { display: flex; align-items: center; gap: 1rem; margin-top: 1rem; }
.pie-chart { width: 100px; height: 100px; border-radius: 50%; }
.pie-legend div { margin-bottom: 0.5rem; display: flex; align-items: center; }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; margin-right: 10px; }
.legend-dot.physical { background-color: #007bff; }
.legend-dot.ebook { background-color: #28a745; }
</style>