<template>
    <div class="dashboard">
      <div class="header">
        <h1>Dashboard</h1>
        <div class="user-info">
          <span>Welcome, Admin</span>
        </div>
      </div>
  
      <div class="dashboard-content">
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon users">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-details">
              <h2>Total Users</h2>
              <div class="stat-value">12,543</div>
              <div class="stat-change positive">
                <i class="fas fa-arrow-up"></i> 12% from last month
              </div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon orders">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <div class="stat-details">
              <h2>Total Orders</h2>
              <div class="stat-value">8,752</div>
              <div class="stat-change positive">
                <i class="fas fa-arrow-up"></i> 8% from last month
              </div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon revenue">
              <i class="fas fa-dollar-sign"></i>
            </div>
            <div class="stat-details">
              <h2>Total Revenue</h2>
              <div class="stat-value">$178,392</div>
              <div class="stat-change positive">
                <i class="fas fa-arrow-up"></i> 15% from last month
              </div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon comments">
              <i class="fas fa-comments"></i>
            </div>
            <div class="stat-details">
              <h2>Comments</h2>
              <div class="stat-value">3,285</div>
              <div class="stat-change negative">
                <i class="fas fa-arrow-down"></i> 5% from last month
              </div>
            </div>
          </div>
        </div>
  
        <div class="chart-row">
          <div class="chart-card large">
            <div class="chart-header">
              <h2>Sales Analytics</h2>
              <div class="chart-actions">
                <button class="chart-btn active">Weekly</button>
                <button class="chart-btn">Monthly</button>
                <button class="chart-btn">Yearly</button>
              </div>
            </div>
            <div class="chart-container">
              <!-- Chart placeholder -->
              <div class="chart-placeholder"></div>
            </div>
          </div>
        </div>
  
        <div class="grid-row">
          <div class="chart-card">
            <div class="chart-header">
              <h2>Traffic Sources</h2>
              <div class="chart-actions">
                <button class="chart-btn">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
            <div class="chart-container">
              <!-- Pie chart placeholder -->
              <div class="chart-placeholder circle"></div>
            </div>
            <div class="chart-legend">
              <div class="legend-item">
                <span class="legend-color social"></span>
                <span class="legend-label">Social Media</span>
                <span class="legend-value">45%</span>
              </div>
              <div class="legend-item">
                <span class="legend-color direct"></span>
                <span class="legend-label">Direct</span>
                <span class="legend-value">30%</span>
              </div>
              <div class="legend-item">
                <span class="legend-color search"></span>
                <span class="legend-label">Search</span>
                <span class="legend-value">15%</span>
              </div>
              <div class="legend-item">
                <span class="legend-color referral"></span>
                <span class="legend-label">Referral</span>
                <span class="legend-value">10%</span>
              </div>
            </div>
          </div>
  
          <div class="chart-card">
            <div class="chart-header">
              <h2>Top Products</h2>
              <div class="chart-actions">
                <button class="chart-btn">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
            <div class="product-list">
              <div class="product-item">
                <div class="product-info">
                  <div class="product-img"></div>
                  <div class="product-details">
                    <h3>Modern Classic Literature</h3>
                    <p>Fiction, Hardcover</p>
                  </div>
                </div>
                <div class="product-stats">
                  <div class="product-sales">$12,590</div>
                  <div class="product-progress">
                    <div class="progress-bar" style="width: 85%"></div>
                  </div>
                </div>
              </div>
              <div class="product-item">
                <div class="product-info">
                  <div class="product-img"></div>
                  <div class="product-details">
                    <h3>Science and Nature</h3>
                    <p>Non-fiction, Paperback</p>
                  </div>
                </div>
                <div class="product-stats">
                  <div class="product-sales">$9,870</div>
                  <div class="product-progress">
                    <div class="progress-bar" style="width: 70%"></div>
                  </div>
                </div>
              </div>
              <div class="product-item">
                <div class="product-info">
                  <div class="product-img"></div>
                  <div class="product-details">
                    <h3>Historical Biographies</h3>
                    <p>Biography, Hardcover</p>
                  </div>
                </div>
                <div class="product-stats">
                  <div class="product-sales">$7,560</div>
                  <div class="product-progress">
                    <div class="progress-bar" style="width: 60%"></div>
                  </div>
                </div>
              </div>
              <div class="product-item">
                <div class="product-info">
                  <div class="product-img"></div>
                  <div class="product-details">
                    <h3>Children's Illustrated Series</h3>
                    <p>Children, Hardcover</p>
                  </div>
                </div>
                <div class="product-stats">
                  <div class="product-sales">$6,240</div>
                  <div class="product-progress">
                    <div class="progress-bar" style="width: 45%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="chart-card">
            <div class="chart-header">
              <h2>Recent Activities</h2>
              <div class="chart-actions">
                <button class="chart-btn">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-icon order">
                  <i class="fas fa-shopping-bag"></i>
                </div>
                <div class="activity-details">
                  <h3>New Order #38924</h3>
                  <p>John Smith ordered 3 books</p>
                  <span class="activity-time">25 minutes ago</span>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon user">
                  <i class="fas fa-user-plus"></i>
                </div>
                <div class="activity-details">
                  <h3>New User</h3>
                  <p>Emma Davis created an account</p>
                  <span class="activity-time">2 hours ago</span>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon comment">
                  <i class="fas fa-comment"></i>
                </div>
                <div class="activity-details">
                  <h3>New Comment</h3>
                  <p>Sarah Johnson commented on "The Great Adventure"</p>
                  <span class="activity-time">3 hours ago</span>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon return">
                  <i class="fas fa-undo"></i>
                </div>
                <div class="activity-details">
                  <h3>Return Request</h3>
                  <p>Michael Brown requested a return for order #37891</p>
                  <span class="activity-time">5 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminDashboard'
  }
  </script>
  
  <style scoped>
  .dashboard {
    padding: 0;
    background-color: #f5f5f5;
    min-height: 100vh;
  }
  
  .header {
    background-color: #002140;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header h1 {
    font-size: 24px;
    margin: 0;
    color: #ffc107;
  }
  
  .user-info {
    font-size: 14px;
  }
  
  .dashboard-content {
    padding: 20px;
  }
  
  .stats-row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    gap: 20px;
  }
  
  .stat-card {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    display: flex;
    flex: 1;
    min-width: 200px;
  }
  
  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    font-size: 24px;
    color: white;
  }
  
  .stat-icon.users {
    background-color: #1890ff;
  }
  
  .stat-icon.orders {
    background-color: #52c41a;
  }
  
  .stat-icon.revenue {
    background-color: #faad14;
  }
  
  .stat-icon.comments {
    background-color: #722ed1;
  }
  
  .stat-details {
    flex: 1;
  }
  
  .stat-details h2 {
    margin: 0 0 10px 0;
    font-size: 14px;
    color: #666;
  }
  
  .stat-value {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .stat-change {
    font-size: 12px;
    display: flex;
    align-items: center;
  }
  
  .stat-change.positive {
    color: #52c41a;
  }
  
  .stat-change.negative {
    color: #ff4d4f;
  }
  
  .stat-change i {
    margin-right: 5px;
  }
  
  .chart-row, .grid-row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    gap: 20px;
  }
  
  .chart-card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    flex: 1;
    min-width: 300px;
  }
  
  .chart-card.large {
    flex: 100%;
  }
  
  .chart-header {
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
  }
  
  .chart-header h2 {
    margin: 0;
    font-size: 16px;
  }
  
  .chart-actions {
    display: flex;
  }
  
  .chart-btn {
    background: none;
    border: 1px solid #eee;
    border-radius: 15px;
    padding: 5px 10px;
    margin-left: 10px;
    cursor: pointer;
    font-size: 12px;
  }
  
  .chart-btn.active {
    background-color: #002140;
    color: white;
    border-color: #002140;
  }
  
  .chart-container {
    padding: 20px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .chart-placeholder {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    border-radius: 5px;
  }
  
  .chart-placeholder.circle {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(
      #1890ff 0% 45%, 
      #52c41a 45% 75%, 
      #faad14 75% 90%, 
      #722ed1 90% 100%
    );
  }
  
  .chart-legend {
    padding: 0 20px 20px 20px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .legend-color {
    width: 15px;
    height: 15px;
    border-radius: 3px;
    margin-right: 10px;
  }
  
  .legend-color.social {
    background-color: #1890ff;
  }
  
  .legend-color.direct {
    background-color: #52c41a;
  }
  
  .legend-color.search {
    background-color: #faad14;
  }
  
  .legend-color.referral {
    background-color: #722ed1;
  }
  
  .legend-label {
    flex: 1;
    font-size: 14px;
  }
  
  .legend-value {
    font-weight: bold;
    font-size: 14px;
  }
  
  .product-list {
    padding: 20px;
  }
  
  .product-item {
    margin-bottom: 20px;
  }
  
  .product-info {
    display: flex;
    margin-bottom: 10px;
  }
  
  .product-img {
    width: 40px;
    height: 40px;
    background-color: #eee;
    border-radius: 5px;
    margin-right: 10px;
  }
  
  .product-details h3 {
    margin: 0 0 5px 0;
    font-size: 14px;
  }
  
  .product-details p {
    margin: 0;
    font-size: 12px;
    color: #666;
  }
  
  .product-stats {
    display: flex;
    flex-direction: column;
  }
  
  .product-sales {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: bold;
  }
  
  .product-progress {
    height: 5px;
    background-color: #f5f5f5;
    border-radius: 3px;
    overflow: hidden;
  }
  
  .progress-bar {
    height: 100%;
    background-color: #1890ff;
  }
  
  .activity-list {
    padding: 20px;
  }
  
  .activity-item {
    display: flex;
    margin-bottom: 20px;
  }
  
  .activity-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    color: white;
    flex-shrink: 0;
  }
  
  .activity-icon.order {
    background-color: #1890ff;
  }
  
  .activity-icon.user {
    background-color: #52c41a;
  }
  
  .activity-icon.comment {
    background-color: #faad14;
  }
  
  .activity-icon.return {
    background-color: #ff4d4f;
  }
  
  .activity-details h3 {
    margin: 0 0 5px 0;
    font-size: 14px;
  }
  
  .activity-details p {
    margin: 0 0 5px 0;
    font-size: 13px;
    color: #666;
  }
  
  .activity-time {
    font-size: 12px;
    color: #999;
  }
  </style>