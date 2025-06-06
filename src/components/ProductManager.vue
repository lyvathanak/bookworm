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
        <input type="search" v-model="searchTerm" placeholder="Search by title, author, category..." class="search-input" />
        <button @click="openAddModal" class="btn btn-primary">Add new book</button>
      </div>
    </div>
    <div class="product-table">
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Type</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in filteredBooks" :key="book.id">
            <td>
                <div class="book-info">
                    <div class="book-image-placeholder"></div>
                    {{ book.title }}
                </div>
            </td>
            <td>{{ getAuthorName(book.authorId) }}</td>
            <td>{{ book.category }}</td>
            <td><span class="type-tag" :class="book.type.toLowerCase()">{{ book.type }}</span></td>
            <td>${{ book.price.toFixed(2) }}</td>
            <td class="action-buttons">
                <button @click="openEditModal(book)" class="btn-action edit"><font-awesome-icon icon="pencil-alt" /></button>
                <button @click="deleteBook(book.id)" class="btn-action delete"><font-awesome-icon icon="trash" /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <app-modal v-if="isModalVisible" @close="closeModal">
        <template #header>{{ isEditing ? 'Edit Book' : 'Add New Book' }}</template>
        <form @submit.prevent="saveBook" class="modal-form">
            <input v-model="editableBook.title" placeholder="Title" required>
            <select v-model="editableBook.authorId" required>
                <option disabled value="">Select an author</option>
                <option v-for="author in authors" :key="author.id" :value="author.id">{{ author.name }}</option>
            </select>
            <input v-model="editableBook.category" placeholder="Category" required>
            <input v-model.number="editableBook.price" type="number" step="0.01" placeholder="Price" required>
            <select v-model="editableBook.type" required>
                <option>Physical</option>
                <option>E-Book</option>
            </select>
            <textarea v-model="editableBook.description" placeholder="Description" required></textarea>
            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Save Changes' : 'Add Book' }}</button>
        </form>
    </app-modal>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import AppModal from './Modal.vue';

export default {
  name: 'ProductManager',
  components: { AppModal },
  setup() {
    const store = useStore();
    const searchTerm = ref('');
    const isModalVisible = ref(false);
    const isEditing = ref(false);
    const editableBook = ref({});

    const books = computed(() => store.state.books);
    const authors = computed(() => store.state.authors);

    const getAuthorName = (authorId) => authors.value.find(a => a.id === authorId)?.name || 'Unknown';
    
    const filteredBooks = computed(() => {
        if (!searchTerm.value) return books.value;
        const lowerCaseSearch = searchTerm.value.toLowerCase();
        return books.value.filter(book => 
            book.title.toLowerCase().includes(lowerCaseSearch) ||
            getAuthorName(book.authorId).toLowerCase().includes(lowerCaseSearch) ||
            book.category.toLowerCase().includes(lowerCaseSearch)
        );
    });

    const openAddModal = () => {
        isEditing.value = false;
        editableBook.value = { title: '', authorId: '', category: '', description: '', price: 0, type: 'Physical' };
        isModalVisible.value = true;
    };

    const openEditModal = (book) => {
        isEditing.value = true;
        editableBook.value = { ...book };
        isModalVisible.value = true;
    };

    const closeModal = () => { isModalVisible.value = false; };
    
    const saveBook = () => {
        if (isEditing.value) {
            store.dispatch('updateBook', editableBook.value);
        } else {
            store.dispatch('addBook', editableBook.value);
        }
        closeModal();
    };

    const deleteBook = (id) => {
        if (confirm('Are you sure you want to delete this book?')) {
            store.dispatch('deleteBook', id);
        }
    };

    return {
      searchTerm, filteredBooks, authors, isModalVisible, isEditing, editableBook,
      getAuthorName, openAddModal, openEditModal, closeModal, saveBook, deleteBook
    };
  }
};
</script>

<style scoped>
.main-content { flex-grow: 1; padding: 2rem; background-color: #fff; }
.page-header { margin-bottom: 2rem; }
.toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.actions { display: flex; gap: 1rem; }
.search-input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 5px; width: 300px; }
.btn-primary { background-color: #415a77; color: white; border:none; border-radius: 5px; cursor: pointer; padding: 0.5rem 1rem;}
.product-table table { width: 100%; border-collapse: collapse; text-align: left; }
.product-table th, .product-table td { padding: 1rem; border-bottom: 1px solid #eee; vertical-align: middle; }
.product-table th { background-color: #1b263b; color: white; }
.book-info { display: flex; align-items: center; gap: 1rem; }
.book-image-placeholder { width: 40px; height: 60px; background-color: #e0e0e0; border-radius: 4px; flex-shrink: 0; }
.type-tag { padding: 0.2rem 0.6rem; border-radius: 10px; font-size: 0.8rem; }
.type-tag.physical { background-color: #cce5ff; color: #004085; }
.type-tag.e-book { background-color: #d4edda; color: #155724; }
.action-buttons .btn-action { background: none; border: none; cursor: pointer; font-size: 1rem; margin-right: 10px; }
.btn-action.edit { color: #42a5f5; }
.btn-action.delete { color: #ef5350; }
.modal-form { display: flex; flex-direction: column; gap: 1rem; }
.modal-form input, .modal-form textarea, .modal-form select { padding: 0.75rem; border: 1px solid #ccc; border-radius: 5px; width: 100%; }
</style>