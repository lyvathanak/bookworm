<template>
    <div class="product-manager">
      <div class="header">
        <h1>Product Manager</h1>
        <div class="user-info">
          <span>Name/ Overview</span>
        </div>
      </div>
  
      <div class="actions-bar">
        <div class="action-buttons">
          <button class="action-btn active">Book List</button>
        </div>
        <div class="search-box">
          <input type="text" placeholder="search" />
          <button class="search-btn">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <button class="add-btn">Add new book</button>
      </div>
  
      <div class="books-table">
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>Book image</th>
              <th>Book name</th>
              <th>Book category</th>
              <th>Book author</th>
              <th>Book description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, index) in books" :key="book.id">
              <td>{{ index + 1 }}</td>
              <td class="book-image">
                <div class="image-placeholder"></div>
              </td>
              <td>{{ book.title }}</td>
              <td>{{ book.category }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  export default {
    name: 'ProductManager',
    computed: {
      ...mapState(['books'])
    }
  }
  </script>
  
  <style scoped>
  .product-manager {
    padding: 0;
    background-color: #f5f5f5;
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
  
  .actions-bar {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .action-btn {
    padding: 10px 20px;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;
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
  
  .add-btn {
    padding: 10px 20px;
    background-color: #002140;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .books-table {
    padding: 0 20px 20px;
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
  
  .book-image .image-placeholder {
    width: 80px;
    height: 100px;
    background-color: #eee;
  }
  </style>
  