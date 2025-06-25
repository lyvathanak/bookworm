<template>
  <div class="sidebar">
    <div class="user-info">
      <img :src="user?.avatar ? user.avatar : 'https://via.placeholder.com/100'" alt="Avatar" class="avatar"/>
      <h4>{{ user?.fname }} {{ user?.lname }}</h4>
    </div>
    <nav class="sidebar-nav">
      <a @click="$emit('set-section', 'profile')" :class="{ active: activeSection === 'profile' }">My Profile</a>
      <a @click="$emit('set-section', 'orders')" :class="{ active: activeSection === 'orders' }">My Orders</a>
      <a @click="$emit('set-section', 'wishlist')" :class="{ active: activeSection === 'wishlist' }">My Wishlist</a>
      <a @click="$emit('set-section', 'password')" :class="{ active: activeSection === 'password' }">Change Password</a>
      <a @click="$emit('logout')">Logout</a>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  user: Object,
  activeSection: String,
});
defineEmits(['set-section', 'logout']);
</script>

<style scoped>
.sidebar { flex: 0 0 250px; background: #fff; padding: 20px; border-radius: 8px; }
.user-info { text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px;}
.avatar { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 10px; }
.sidebar-nav a { display: block; padding: 12px 15px; cursor: pointer; border-radius: 4px; }
.sidebar-nav a:hover, .sidebar-nav a.active { background-color: #f0f0f0; }
</style>