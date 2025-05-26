<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2>Welcome Back, {{ userFirstName }}!</h2>
    </div>
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link" :class="{ 'active': $route.path === '/profile' }">
            My Profile
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profile/orders" class="nav-link" :class="{ 'active': $route.path === '/profile/orders' }">
            My Orders
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profile/wishlist" class="nav-link" :class="{ 'active': $route.path === '/profile/wishlist' }">
            My Wishlist
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profile/address" class="nav-link" :class="{ 'active': $route.path === '/profile/address' }">
            My Address
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profile/change-password" class="nav-link" :class="{ 'active': $route.path === '/profile/change-password' }">
            Change Password
          </router-link>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link logout" @click.prevent="logout">Log Out</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userFirstName = computed(() => localStorage.getItem('userFirstName') || 'Tooru')

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.removeItem('userFirstName')
  localStorage.removeItem('wishlist')
  localStorage.removeItem('cartItems')
  router.push('/')
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #1a2a44;
  color: white;
  height: 100vh;
  position: fixed;
  padding: 20px;
  box-sizing: border-box;
}

.sidebar-header {
  margin-bottom: 20px;
}

.sidebar-header h2 {
  font-size: 18px;
  margin: 0;
}

.sidebar-nav {
  width: 100%;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 10px;
}

.nav-link {
  display: block;
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.active {
  background-color: #2a4060;
  color: #e6d430;
}

.nav-link.logout {
  color: #ff6b6b;
}

.nav-link.logout:hover {
  background-color: rgba(255, 0, 0, 0.1);
}
</style>