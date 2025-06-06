<template>
  <div class="main-content">
    <header class="page-header">
      <h1>Customer Service Hub</h1>
      <p>Quickly find users and orders</p>
    </header>

    <div class="service-hub">
      <div class="lookup-tool">
        <h3>Find User or Order</h3>
        <input type="search" v-model="searchTerm" placeholder="Search by User Email or Order ID..." class="search-input" />
        <div class="search-results">
            <div v-if="searchTerm && searchResults.length === 0" class="no-results">
                No results found.
            </div>
            <ul v-else>
                <li v-for="item in searchResults" :key="item.id">
                   <div v-if="item.type === 'user'">
                       <span><font-awesome-icon icon="user" /> {{ item.name }} ({{ item.email }})</span>
                       <router-link :to="`/users/${item.id}`" class="btn-details">View User</router-link>
                   </div>
                   <div v-if="item.type === 'order'">
                       <span><font-awesome-icon icon="receipt" /> Order #{{ item.id }}</span>
                       <router-link :to="`/orders/${item.id}`" class="btn-details">View Order</router-link>
                   </div>
                </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'CustomerService',
  setup() {
    const store = useStore();
    const searchTerm = ref('');

    const searchResults = computed(() => {
        if (!searchTerm.value) return [];
        const lowerSearch = searchTerm.value.toLowerCase();
        
        const users = store.state.users
            .filter(u => u.email.toLowerCase().includes(lowerSearch) || u.name.toLowerCase().includes(lowerSearch))
            .map(u => ({...u, type: 'user' }));

        const orders = store.state.orders
            .filter(o => o.id.toString().includes(lowerSearch))
            .map(o => ({...o, type: 'order' }));

        return [...users, ...orders];
    });

    return { searchTerm, searchResults };
  }
};
</script>

<style scoped>
.main-content { flex-grow: 1; padding: 2rem; background-color: #fff; }
.page-header { margin-bottom: 2rem; }
.lookup-tool {
    background: #fdfdfd;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}
.search-input {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 1rem;
}
.search-results ul {
    list-style: none;
}
.search-results li div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 5px;
    margin-bottom: 0.5rem;
}
.no-results {
    padding: 1rem;
    text-align: center;
    color: #777;
}
.btn-details {
    padding: 0.3rem 0.8rem;
    background-color: #415a77;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}
</style>