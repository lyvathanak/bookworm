<template>
  <div class="main-content">
    <header class="page-header">
      <h1>Account Manager</h1>
      <p>Name: Overview</p>
    </header>
    <div class="toolbar">
      <div class="tabs">
        <button class="tab-btn active">Users / Admins</button>
      </div>
      <div class="actions">
        <input v-model="searchTerm" type="search" placeholder="Search by name or email..." class="search-input" />
      </div>
    </div>
    <div class="user-actions-bar">
        <button @click="alertNotImplemented" class="btn">Users</button>
        <button @click="openAddModal" class="btn btn-primary">Add new</button>
        <button @click="alertNotImplemented" class="btn">Import</button>
        <button @click="alertNotImplemented" class="btn">Export</button>
    </div>
    <div class="account-table">
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
          <tr v-for="user in filteredUsers" :key="user.id">
            <td><div class="user-avatar-placeholder"></div></td>
            <td>{{ user.name }}</td>
            <td>{{ user.mobile }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="status" :class="user.status">{{ user.status }}</span>
            </td>
            <td class="action-buttons">
                <button @click="openEditModal(user)" class="btn-action edit"><font-awesome-icon icon="pencil-alt" /></button>
                <button @click="deleteUser(user.id)" class="btn-action delete"><font-awesome-icon icon="trash" /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <app-modal v-if="isModalVisible" @close="closeModal">
        <template #header>{{ isEditing ? 'Edit User' : 'Add New User' }}</template>
        <form @submit.prevent="saveUser" class="user-form">
            <input v-model="editableUser.name" placeholder="Name" required>
            <input v-model="editableUser.email" type="email" placeholder="Email" required>
            <input v-model="editableUser.mobile" placeholder="Mobile" required>
            <select v-model="editableUser.status" required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Save Changes' : 'Add User' }}</button>
        </form>
    </app-modal>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import AppModal from './Modal.vue';

export default {
  name: 'AccountManager',
  components: { AppModal },
  setup() {
    const store = useStore();
    const searchTerm = ref('');
    const isModalVisible = ref(false);
    const isEditing = ref(false);
    const editableUser = ref({});

    const users = computed(() => store.state.users);

    const filteredUsers = computed(() => {
      if (!searchTerm.value) return users.value;
      const lowerCaseSearch = searchTerm.value.toLowerCase();
      return users.value.filter(user =>
        user.name.toLowerCase().includes(lowerCaseSearch) ||
        user.email.toLowerCase().includes(lowerCaseSearch)
      );
    });

    const openAddModal = () => {
      isEditing.value = false;
      editableUser.value = { name: '', email: '', mobile: '', status: 'active' };
      isModalVisible.value = true;
    };

    const openEditModal = (user) => {
      isEditing.value = true;
      editableUser.value = { ...user };
      isModalVisible.value = true;
    };

    const closeModal = () => { isModalVisible.value = false; };

    const saveUser = () => {
      if (isEditing.value) {
        store.dispatch('updateUser', editableUser.value);
      } else {
        store.dispatch('addUser', editableUser.value);
      }
      closeModal();
    };

    const deleteUser = (id) => {
      if (confirm('Are you sure you want to delete this user?')) {
        store.dispatch('deleteUser', id);
      }
    };
    
    const alertNotImplemented = () => {
        alert('This feature has not been implemented yet.');
    };

    return {
      searchTerm, filteredUsers, isModalVisible, isEditing, editableUser,
      openAddModal, openEditModal, closeModal, saveUser, deleteUser, alertNotImplemented
    };
  },
};
</script>

<style scoped>
/* styles remain the same, with additions for actions and form */
.main-content {
  flex-grow: 1; padding: 2rem; background-color: #fff;
}
.page-header {
  margin-bottom: 2rem; color: #0d1b2a;
}
.toolbar {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;
}
.tabs .tab-btn {
  padding: 0.5rem 1rem; border: 1px solid #ddd; background-color: #0d1b2a; color: white; border-radius: 5px; cursor: pointer;
}
.actions .search-input {
  padding: 0.5rem; border: 1px solid #ccc; border-radius: 5px; width: 250px;
}
.user-actions-bar {
    background-color: #0d1b2a; padding: 1rem; border-radius: 5px; margin-bottom: 1.5rem;
}
.btn {
  padding: 0.5rem 1rem; border: none; border-radius: 5px; cursor: pointer; background-color: #f0f2f5; margin-right: 10px;
}
.btn-primary {
  background-color: #415a77; color: white;
}
.account-table table {
  width: 100%; border-collapse: collapse; text-align: left;
}
.account-table th, .account-table td {
  padding: 1rem; border-bottom: 1px solid #eee; vertical-align: middle;
}
.user-avatar-placeholder {
  width: 40px; height: 40px; background-color: #e0e0e0; border-radius: 50%;
}
.status {
  padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.8rem; color: white; text-transform: capitalize;
}
.status.active { background-color: #66bb6a; }
.status.inactive { background-color: #ef5350; }
.action-buttons .btn-action {
    background: none; border: none; cursor: pointer; font-size: 1rem; margin-right: 10px;
}
.btn-action.edit { color: #42a5f5; }
.btn-action.delete { color: #ef5350; }
.user-form { display: flex; flex-direction: column; gap: 1rem; }
.user-form input, .user-form select { padding: 0.75rem; border: 1px solid #ccc; border-radius: 5px; }
</style>