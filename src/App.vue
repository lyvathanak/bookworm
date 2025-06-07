<template>
  <AppSidebar v-if="isAuthenticated" />
  
  <div class="main-content">
    <router-view/>
  </div>
</template>
<script>

import AppSidebar from './components/Sidebar.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    AppSidebar
  },
  computed: {
    // We use a getter to know if we should show the sidebar
    ...mapGetters('auth', ['isAuthenticated'])
  },
  created() {
    // This part is important and correct - it fetches data on page load
    this.$store.dispatch('fetchAuthors');
    this.$store.dispatch('fetchBooks');
    this.$store.dispatch('fetchUsers');
    this.$store.dispatch('fetchOrders');
    this.$store.dispatch('fetchReviews');
  }
}
</script>


<style>
#app-container {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #0d1b2a;
}
</style>