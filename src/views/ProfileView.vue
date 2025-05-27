<template>
  <div class="profile-container">
    <UserSidebar />
    <main class="content-area">
      <div class="welcome-header">
        <h1 class="welcome-title">Welcome Back, {{ userFirstName }}!</h1>
      </div>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import UserSidebar from '@/components/UserSidebar.vue'

const userData = computed(() => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
})

const userFirstName = computed(() => {
  return userData.value?.firstName || 
         localStorage.getItem('userFirstName') || 
         'Tooru'
})
</script>

<style scoped>
.profile-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.content-area {
  margin-left: 350px;
  padding: 50px;
  flex-grow: 1;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.welcome-header {
  margin-bottom: 40px;
}

.welcome-title {
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

@media (max-width: 768px) {
  .content-area {
    margin-left: 0;
    padding: 20px;
  }
  
  .welcome-title {
    font-size: 24px;
  }
}
</style>