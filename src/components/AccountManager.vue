<template>
    <div class="account-manager">
      <div class="header">
        <h1>Account Manager</h1>
        <div class="user-info">
          <span>Name/ Overview</span>
        </div>
      </div>
  
      <div class="users-container">
        <div class="tab-container">
          <button class="tab-btn active">Users / Admins</button>
        </div>
  
        <div class="actions-bar">
          <div class="action-buttons">
            <button class="action-btn active">Users</button>
            <button class="action-btn">Add new</button>
            <button class="action-btn">Import</button>
            <button class="action-btn">Export</button>
          </div>
          <div class="search-box">
            <input type="text" placeholder="search" />
            <button class="search-btn">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
  
        <div class="users-table">
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td class="user-photo">
                  <div class="photo-placeholder"></div>
                </td>
                <td>{{ user.name }}</td>
                <td>{{ user.mobile }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <span class="status-badge" :class="user.status">
                    {{ user.status }}
                  </span>
                </td>
                <td class="actions">
                  <button class="action-icon edit">
                    <i class="fas fa-pen"></i>
                  </button>
                  <button class="action-icon delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="pagination">
          <button class="pagination-btn">Previous</button>
          <div class="pagination-pages">
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">3</button>
          </div>
          <button class="pagination-btn">Next</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  export default {
    name: 'AccountManager',
    computed: {
      ...mapState(['users'])
    }
  }
  </script>
  
  <style scoped>
  .account-manager {
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
  
  .users-container {
    padding: 20px;
  }
  
  .tab-container {
    margin-bottom: 20px;
  }
  
  .tab-btn {
    padding: 10px 20px;
    background-color: #002140;
    color: white;
    border: none;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
  }
  
  .actions-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .action-buttons {
    display: flex;
  }
  
  .action-btn {
    padding: 10px 15px;
    background-color: transparent;
    border: none;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .action-btn.active {
    background-color: #002140;
    color: white;
  }
  
  .search-box {
    display: flex;
    background-color: #eee;
    border-radius: 20px;
    overflow: hidden;
    width: 300px;
  }
  
  .search-box input {
    flex: 1;
    border: none;
    padding: 10px 15px;
    background-color: transparent;
  }
  
  .search-btn {
    background-color: transparent;
    border: none;
    padding: 0 15px;
    cursor: pointer;
  }
  
  .users-table {
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
  }
  
  thead {
    background-color: #002140;
    color: white;
  }
  
  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  .user-photo .photo-placeholder {
    width: 40px;
    height: 40px;
    background-color: #eee;
    border-radius: 50%;
  }
  
  .status-badge {
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    text-transform: uppercase;
  }
  
  .status-badge.active {
    background-color: #e6f7ff;
    color: #1890ff;
  }
  
  .status-badge.inactive {
    background-color: #fff1f0;
    color: #ff4d4f;
  }
  
  .actions {
    display: flex;
  }
  
  .action-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    cursor: pointer;
  }
  
  .action-icon.edit {
    background-color: #e6f7ff;
    color: #1890ff;
  }
  
  .action-icon.delete {
    background-color: #fff1f0;
    color: #ff4d4f;
  }
  
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .pagination-btn {
    padding: 5px 15px;
    background-color: #002140;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .pagination-pages {
    display: flex;
  }
  
  .page-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background-color: white;
    margin: 0 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .page-btn.active {
    background-color: #002140;
    color: white;
    border: none;
  }
  </style>