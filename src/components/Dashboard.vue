<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
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

    <div class="main-grid">
      <div class="grid-item notification-panel">
        <div class="panel-header">
            <h3>Notification</h3>
            <div class="tabs">
                <button class="tab-btn active">Today</button>
                <button class="tab-btn">This week</button>
                <button class="tab-btn">This Month</button>
            </div>
        </div>
        <ul>
          <li v-for="note in notifications" :key="note.id">
            <p>{{ note.text }}</p>
            <span>{{ note.timestamp }}</span>
          </li>
        </ul>
      </div>

      <div class="grid-item book-report-panel">
        <div class="panel-header">
          <h3>Total Book Report</h3>
          <select class="time-filter">
            <option>weekly</option>
            <option>monthly</option>
            <option>yearly</option>
          </select>
        </div>
        <div class="donut-chart-container">
          <div class="donut-chart">
            <div class="donut-inner">
                <span>{{ stockStatus.inStock }}%</span>
                <p>weekly book</p>
            </div>
            <svg width="150" height="150" viewBox="0 0 36 36" class="donut-svg">
                <path class="donut-ring" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ff6384" stroke-width="3"></path>
                <path class="donut-segment" :stroke-dasharray="`${stockStatus.inStock}, 100`" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4bc0c0" stroke-width="3" stroke-dashoffset="25"></path>
            </svg>
          </div>
          <div class="chart-legend">
            <div><span class="legend-dot sold-out"></span> Sold out</div>
            <div><span class="legend-dot in-stock"></span> In stock</div>
          </div>
        </div>
      </div>
      
      <div class="grid-item summary-panel">
        <h3>Summary</h3>
        <div class="summary-item">
          <div class="summary-label">
            <span>Income</span>
            <span>{{ summary.income }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: summary.income + '%' }"></div>
          </div>
        </div>
        <div class="summary-item">
          <div class="summary-label">
            <span>Profit</span>
            <span>{{ summary.profit }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress profit" :style="{ width: summary.profit + '%' }"></div>
          </div>
        </div>
        <div class="summary-item">
          <div class="summary-label">
            <span>Expenses</span>
            <span>{{ summary.expenses }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress expenses" :style="{ width: summary.expenses + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="grid-item order-panel">
        <h3>Order</h3>
        <ul>
          <li v-for="(order, index) in orders" :key="index">
            <p>#{{order.id}}</p>
            <span>{{order.user}} {{ order.details }}</span>
            <span class="timestamp">{{order.timestamp}}</span>
          </li>
        </ul>
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
    return {
      stats: computed(() => store.state.stats),
      notifications: computed(() => store.state.notifications),
      orders: computed(() => store.state.orders),
      summary: computed(() => store.state.summary),
      stockStatus: computed(() => store.state.stockStatus)
    };
  }
};
</script>

<style scoped>
/* Styles remain the same */
.dashboard {
    flex-grow: 1;
    padding: 2rem;
    background-color: #fff;
}
.dashboard-header {
    margin-bottom: 2rem;
}
h1 {
    font-size: 2.5rem;
    color: #0d1b2a;
}
p {
    color: #777;
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
.main-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 1.5rem;
}
.grid-item {
    background: #fdfdfd;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}
.panel-header h3 { color: #0d1b2a; }
.notification-panel ul, .order-panel ul {
    list-style: none;
}
.notification-panel li, .order-panel li {
    border-bottom: 1px solid #eee;
    padding: 1rem 0;
}
.notification-panel li:last-child, .order-panel li:last-child {
    border-bottom: none;
}
.notification-panel span, .order-panel .timestamp {
    color: #999;
    font-size: 0.8rem;
    float: right;
}
.tabs .tab-btn {
    border: none;
    background: none;
    padding: 5px 10px;
    cursor: pointer;
    color: #777;
}
.tabs .tab-btn.active {
    font-weight: bold;
    color: #0d1b2a;
    border-bottom: 2px solid #415a77;
}
.book-report-panel .time-filter {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
}
.donut-chart-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
}
.donut-chart {
    position: relative;
    width: 150px;
    height: 150px;
}
.donut-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
.donut-inner span {
    font-size: 1.5rem;
    font-weight: bold;
}
.donut-svg { transform: rotate(-90deg); }
.donut-ring { stroke: #ff6384; }
.donut-segment {
    animation: donut-fill 2s ease-out forwards;
}
@keyframes donut-fill { to { stroke-dasharray: 100, 100; } }
.chart-legend div { margin-bottom: 0.5rem; }
.legend-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
}
.legend-dot.sold-out { background-color: #ff6384; }
.legend-dot.in-stock { background-color: #4bc0c0; }
.summary-item {
    margin-bottom: 1rem;
}
.summary-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}
.progress-bar {
    background-color: #e0e0e0;
    border-radius: 10px;
    height: 10px;
}
.progress-bar .progress {
    height: 100%;
    border-radius: 10px;
    background-color: #42a5f5;
}
.progress-bar .progress.profit { background-color: #66bb6a; }
.progress-bar .progress.expenses { background-color: #ef5350; }
</style>