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
        <input type="search" placeholder="Search..." class="search-input" />
      </div>
    </div>
    <div class="user-actions-bar">
        <button class="btn">Users</button>
        <button class="btn btn-primary">Add new</button>
        <button class="btn">Import</button>
        <button class="btn">Export</button>
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
            <th>Operation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td><div class="user-avatar-placeholder"></div></td>
            <td>{{ user.name }}</td>
            <td>{{ user.mobile }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="status" :class="user.status">{{ user.status }}</span>
            </td>
            <td class="operation-icons">
              <font-awesome-icon icon="flag" />
              <font-awesome-icon icon="trash" />
            </td>
            <td>
                <button class="btn-login">login</button>
            </td>
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
  name: 'AccountManager',
  setup() {
    const store = useStore();
    return {
      users: computed(() => store.state.users)
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
.actions .search-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 250px;
}
.user-actions-bar {
    background-color: #0d1b2a;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 1.5rem;
}
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f0f2f5;
  margin-right: 10px;
}
.btn-primary {
  background-color: #415a77;
  color: white;
}
.account-table table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.account-table th, .account-table td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}
.user-avatar-placeholder {
  width: 40px;
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 50%;
}
.status {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  color: white;
}
.status.active { background-color: #66bb6a; }
.status.inactive { background-color: #ef5350; }
.operation-icons {
    color: #777;
}
.operation-icons .fa-flag { margin-right: 15px; }
.btn-login {
    background: none;
    border: none;
    color: #415a77;
    cursor: pointer;
    text-decoration: underline;
}
</style>