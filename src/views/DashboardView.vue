<template>
    <div class="dashboard">
      <!-- Dashboard Header -->
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <div class="user-info">
          <span>Name/ Overview</span>
        </div>
      </div>
  
      <!-- Statistics Cards -->
      <div class="stat-cards">
        <div class="stat-card book-card">
          <div class="stat-title">
            <h2>Book</h2>
            <i class="book-icon"></i>
          </div>
          <p class="stat-value">100 new book added</p>
        </div>
        
        <div class="stat-card user-card">
          <div class="stat-title">
            <h2>User</h2>
            <i class="user-icon"></i>
          </div>
          <p class="stat-value">112K user</p>
        </div>
        
        <div class="stat-card sale-card">
          <div class="stat-title">
            <h2>Sale</h2>
            <i class="sale-icon"></i>
          </div>
          <p class="stat-value">600K+</p>
        </div>
        
        <div class="stat-card order-card">
          <div class="stat-title">
            <h2>Order</h2>
            <i class="order-icon"></i>
          </div>
          <p class="stat-value">1K+</p>
        </div>
      </div>
  
      <!-- Dashboard Widgets -->
      <div class="dashboard-widgets">
        <!-- Notifications Widget -->
        <div class="widget notification-widget">
          <div class="widget-header">
            <h3>Notification</h3>
          </div>
          <div class="tabs">
            <div class="tab active">Today</div>
            <div class="tab">This week</div>
            <div class="tab">This Month</div>
          </div>
          <div class="notification-list">
            <div class="notification-item">
              <p>Great selection of books! Found exactly what I was looking for.</p>
              <span class="timestamp">5min ago</span>
            </div>
            <div class="notification-item">
              <p>Fast shipping and excellent customer service. Highly recommend!</p>
              <span class="timestamp">5min ago</span>
            </div>
            <div class="notification-item">
              <p>Great selection of books! Found exactly what I was looking for.</p>
              <span class="timestamp">5min ago</span>
            </div>
          </div>
        </div>
  
        <!-- Book Report Widget -->
        <div class="widget book-report-widget">
          <div class="widget-header">
            <h3>Total Book Report</h3>
            <div class="report-period">
              <select>
                <option>weekly</option>
                <option>monthly</option>
                <option>yearly</option>
              </select>
            </div>
          </div>
          <div class="chart-container">
            <doughnut-chart></doughnut-chart>
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <span class="legend-color sold-out"></span>
              <span class="legend-text">Sold out</span>
            </div>
            <div class="legend-item">
              <span class="legend-color in-stock"></span>
              <span class="legend-text">In stock</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Bottom Widgets -->
      <div class="dashboard-widgets">
        <!-- Summary Widget -->
        <div class="widget summary-widget">
          <div class="widget-header">
            <h3>Summary</h3>
          </div>
          <div class="summary-list">
            <div class="summary-item">
              <div class="summary-info">
                <span class="summary-label">Income</span>
                <span class="summary-value">92%</span>
              </div>
              <div class="progress-bar">
                <div class="progress income" style="width: 92%"></div>
              </div>
            </div>
            <div class="summary-item">
              <div class="summary-info">
                <span class="summary-label">Profite</span>
                <span class="summary-value">82%</span>
              </div>
              <div class="progress-bar">
                <div class="progress profit" style="width: 82%"></div>
              </div>
            </div>
            <div class="summary-item">
              <div class="summary-info">
                <span class="summary-label">Expenses</span>
                <span class="summary-value">40%</span>
              </div>
              <div class="progress-bar">
                <div class="progress expenses" style="width: 40%"></div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Orders Widget -->
        <div class="widget orders-widget">
          <div class="widget-header">
            <h3>Order</h3>
          </div>
          <div class="orders-list">
            <div class="order-item">
              <div class="order-details">
                <div class="order-id">#937485</div>
                <div class="order-description">Jessse placed new order for 'Computer networking' books.</div>
              </div>
              <div class="order-time">1min ago</div>
            </div>
            <div class="order-item">
              <div class="order-details">
                <div class="order-id">#937485</div>
                <div class="order-description">Jessse placed new order for 'Computer networking' books.</div>
              </div>
              <div class="order-time">1min ago</div>
            </div>
            <div class="order-item">
              <div class="order-details">
                <div class="order-id">#937485</div>
                <div class="order-description">Jessse placed new order for 'Computer networking' books.</div>
              </div>
              <div class="order-time">1min ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import DoughnutChart from '@/components/DoughnutChart.vue'
  
  export default {
    name: 'DashboardView',
    components: {
      DoughnutChart
    }
  }
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
  }
  
  .dashboard-header {
    background-color: #00204e;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .dashboard-header h1 {
    font-size: 26px;
    font-weight: bold;
    color: #FFD700;
  }
  
  .user-info {
    font-size: 14px;
  }
  
  .stat-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-top: 20px;
  }
  
  .stat-card {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  
  .book-card {
    background-color: #ffdddd;
  }
  
  .user-card {
    background-color: #fffadd;
  }
  
  .sale-card {
    background-color: #e8ffdd;
  }
  
  .order-card {
    background-color: #ddf5ff;
  }
  
  .stat-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  
  .stat-title h2 {
    font-size: 22px;
    font-weight: bold;
    color: #FFD700;
  }
  
  .stat-value {
    font-size: 16px;
  }
  
  .dashboard-widgets {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }
  
  .widget {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  
  .widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .widget-header h3 {
    font-size: 18px;
    font-weight: bold;
  }
  
  .tabs {
    display: flex;
    margin-bottom: 15px;
  }
  
  .tab {
    padding: 8px 15px;
    cursor: pointer;
    color: #666;
  }
  
  .tab.active {
    color: #333;
    font-weight: bold;
  }
  
  .notification-list, .orders-list {
    display: flex;
    flex-direction: column;
  }
  
  .notification-item, .order-item {
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
  }
  
  .timestamp, .order-time {
    color: #999;
    font-size: 12px;
  }
  
  .chart-container {
    height: 200px;
    display: flex;
    justify-content: center;
    margin: 15px 0;
  }
  
  .chart-legend {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
  }
  
  .legend-color {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
  }
  
  .sold-out {
    background-color: #ff5252;
  }
  
  .in-stock {
    background-color: #2196f3;
  }
  
  .summary-item {
    margin-bottom: 15px;
  }
  
  .summary-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  
  .progress-bar {
    width: 100%;
    height: 10px;
    background-color: #eee;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .progress {
    height: 100%;
    border-radius: 5px;
  }
  
  .income {
    background-color: #ffd700;
  }
  
  .profit {
    background-color: #4caf50;
  }
  
  .expenses {
    background-color: #ff5252;
  }
  
  .order-details {
    display: flex;
    flex-direction: column;
  }
  
  .order-id {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  @media (max-width: 992px) {
    .stat-cards {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .dashboard-widgets {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 576px) {
    .stat-cards {
      grid-template-columns: 1fr;
    }
  }
  </style>