<template>
  <div class="main-content">
    <header class="page-header">
      <h1>Author Manager</h1>
      <p>Add, edit, or remove book authors</p>
    </header>

    <div class="toolbar">
       <input type="search" v-model="searchTerm" placeholder="Search by author name..." class="search-input" />
       <button @click="openAddModal" class="btn btn-primary">Add New Author</button>
    </div>

    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th>Author Name</th>
            <th>Book Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="author in filteredAuthors" :key="author.id">
            <td>{{ author.name }}</td>
            <td>{{ getBookCount(author.id) }}</td>
            <td class="action-buttons">
                <button @click="openEditModal(author)" class="btn-action edit"><font-awesome-icon icon="pencil-alt" /></button>
                <button @click="deleteAuthor(author.id)" class="btn-action delete"><font-awesome-icon icon="trash" /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <app-modal v-if="isModalVisible" @close="closeModal">
        <template #header>{{ isEditing ? 'Edit Author' : 'Add New Author' }}</template>
        <form @submit.prevent="saveAuthor" class="modal-form">
            <input v-model="editableAuthor.name" placeholder="Author Name" required>
            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Save Changes' : 'Add Author' }}</button>
        </form>
    </app-modal>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import AppModal from './Modal.vue';

export default {
  name: 'AuthorManager',
  components: { AppModal },
  setup() {
    const store = useStore();
    const searchTerm = ref('');
    const isModalVisible = ref(false);
    const isEditing = ref(false);
    const editableAuthor = ref({});

    const authors = computed(() => store.state.authors);
    const books = computed(() => store.state.books);

    const filteredAuthors = computed(() => {
        if (!searchTerm.value) return authors.value;
        return authors.value.filter(author => 
            author.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
    });
    
    const getBookCount = (authorId) => {
        return books.value.filter(book => book.authorId === authorId).length;
    };

    const openAddModal = () => {
        isEditing.value = false;
        editableAuthor.value = { name: '' };
        isModalVisible.value = true;
    };

    const openEditModal = (author) => {
        isEditing.value = true;
        editableAuthor.value = { ...author };
        isModalVisible.value = true;
    };

    const closeModal = () => { isModalVisible.value = false; };
    
    const saveAuthor = () => {
        if (isEditing.value) {
            store.dispatch('updateAuthor', editableAuthor.value);
        } else {
            store.dispatch('addAuthor', editableAuthor.value);
        }
        closeModal();
    };

    const deleteAuthor = (id) => {
        if (getBookCount(id) > 0) {
            alert('Cannot delete an author who has books assigned. Please reassign books first.');
            return;
        }
        if (confirm('Are you sure you want to delete this author?')) {
            store.dispatch('deleteAuthor', id);
        }
    };

    return {
      searchTerm, filteredAuthors, isModalVisible, isEditing, editableAuthor,
      getBookCount, openAddModal, openEditModal, closeModal, saveAuthor, deleteAuthor
    };
  }
};
</script>

<style scoped>
/* Generic styles for manager pages */
.main-content { flex-grow: 1; padding: 2rem; background-color: #fff; }
.page-header { margin-bottom: 2rem; color: #0d1b2a; }
.toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.search-input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 5px; width: 300px; }
.btn { padding: 0.5rem 1rem; border: none; border-radius: 5px; cursor: pointer; }
.btn-primary { background-color: #415a77; color: white; }
.data-table table { width: 100%; border-collapse: collapse; text-align: left; }
.data-table th, .data-table td { padding: 1rem; border-bottom: 1px solid #eee; }
.data-table th { background-color: #1b263b; color: white; }
.action-buttons .btn-action { background: none; border: none; cursor: pointer; font-size: 1rem; margin-right: 10px; }
.btn-action.edit { color: #42a5f5; }
.btn-action.delete { color: #ef5350; }
.modal-form { display: flex; flex-direction: column; gap: 1rem; }
.modal-form input { padding: 0.75rem; border: 1px solid #ccc; border-radius: 5px; }
</style>