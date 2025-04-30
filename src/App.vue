<template>
  <div id="app">
    <div class="app-container">
      <admin-sidebar />
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    AdminSidebar
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.app-container {
  display: flex;
}

.main-content {
  flex: 1;
}
</style>