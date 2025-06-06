<template>
  <div id="app-container">
    <AppSidebar v-if="isAuthenticated" />
    <router-view/>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AppSidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    AppSidebar,
  },
  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => store.state.auth.isAuthenticated);

    return {
      isAuthenticated
    };
  }
};
</script>

<style>
#app-container {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #0d1b2a;
}
</style>