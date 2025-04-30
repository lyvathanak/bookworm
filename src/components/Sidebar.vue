<template>
    <div class="sidebar">
      <div class="logo">
        <h1>BookAdmin</h1>
      </div>
      <nav class="nav-menu">
        <router-link to="/" class="nav-item" active-class="active">
          <i class="fas fa-chart-pie"></i>
          <span>Dashboard</span>
        </router-link>
        <router-link to="/accounts" class="nav-item" active-class="active">
          <i class="fas fa-users"></i>
          <span>Account Manager</span>
        </router-link>
        <router-link to="/comments" class="nav-item" active-class="active">
          <i class="fas fa-comments"></i>
          <span>Comment Manager</span>
        </router-link>
        <router-link to="/customer-service" class="nav-item" active-class="active">
          <i class="fas fa-headset"></i>
          <span>Customer Service</span>
        </router-link>
      </nav>
      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="avatar"></div>
          <div class="user-info">
            <h3>Admin User</h3>
            <p>Administrator</p>
          </div>
        </div>
        <button class="logout-btn">
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminSidebar'
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    height: 100vh;
    background-color: #001529;
    color: white;
    display: flex;
    flex-direction: column;
  }
  
  .logo {
    padding: 20px;
    border-bottom: 1px solid #002140;
  }
  
  .logo h1 {
    color: #ffc107;
    font-size: 24px;
    margin: 0;
  }
  
  .nav-menu {
    flex: 1;
    padding: 20px 0;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.3s;
  }
  
  .nav-item:hover {
    background-color: #002140;
    color: white;
  }
  
  .nav-item.active {
    background-color: #1890ff;
    color: white;
  }
  
  .nav-item i {
    margin-right: 10px;
    width: 20px;
    text-align: center;
  }
  
  .sidebar-footer {
    padding: 20px;
    border-top: 1px solid #002140;
  }
  
  .user-profile {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    background-color: #1890ff;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .user-info h3 {
    margin: 0;
    font-size: 14px;
  }
  
  .user-info p {
    margin: 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }
  
  .logout-btn {
    width: 100%;
    background-color: #ff4d4f;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .logout-btn i {
    margin-right: 10px;
  }
  </style>