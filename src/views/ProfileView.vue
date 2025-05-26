<template>
  <div class="profile-container">
    <UserSidebar />
    <main class="content-area">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import UserSidebar from '@/components/UserSidebar.vue'
</script>

<style scoped>
.profile-container {
  display: flex;
  min-height: 100vh;
}

.content-area {
  margin-left: 250px;
  padding: 20px;
  flex-grow: 1;
  background-color: #f5f5f5;
}
</style>