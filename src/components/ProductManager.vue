<template>
  <div class="main-content">
    <header class="page-header">
      <h1>Product Manager</h1>
      <p>Name: Overview</p>
    </header>
    <div class="toolbar">
      <div class="tabs">
        <button class="tab-btn active">Book List</button>
      </div>
      <div class="actions">
        <input type="search" placeholder="Search..." class="search-input" />
        <button class="btn btn-primary">Add new book</button>
      </div>
    </div>
    <div class="product-table">
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
            <td><div class="book-image-placeholder"></div></td>
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
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ProductManager',
  setup() {
    const store = useStore();
    return {
      books: computed(() => store.state.books)
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
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.tabs .tab-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: #0d1b2a;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.tabs .tab-btn.active {
  background-color: #1b263b;
}
.actions {
  display: flex;
  gap: 1rem;
}
.search-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 250px;
}
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn-primary {
  background-color: #415a77;
  color: white;
}
.product-table table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.product-table th, .product-table td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}
.product-table th {
  background-color: #1b263b;
  color: white;
}
.book-image-placeholder {
  width: 60px;
  height: 80px;
  background-color: #e0e0e0;
  border-radius: 4px;
}
</style>