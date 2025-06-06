<template>
  <div class="sidebar">
    <div class="logo-container">
      <img src="@/assets/BOOK (1).png" alt="Bookworm Logo" class="logo">
      <span class="logo-text">BOOK WORM</span>
    </div>
    <nav class="nav-menu">
      <router-link to="/" class="nav-item">
        <span class="icon-wrapper"><font-awesome-icon icon="tachometer-alt" /></span>
        <span>Dashboard</span>
      </router-link>
      <div class="menu-header">MANAGEMENT</div>
      <router-link to="/products" class="nav-item">
        <span class="icon-wrapper"><font-awesome-icon icon="book" /></span>
        <span>Products</span>
      </router-link>
      <router-link to="/authors" class="nav-item">
        <span class="icon-wrapper"><font-awesome-icon icon="user-edit" /></span>
        <span>Authors</span>
      </router-link>
      <router-link to="/orders" class="nav-item">
        <span class="icon-wrapper"><font-awesome-icon icon="receipt" /></span>
        <span>Orders</span>
      </router-link>
       <router-link to="/accounts" class="nav-item">
        <span class="icon-wrapper"><font-awesome-icon icon="users" /></span>
        <span>Users</span>
      </router-link>
      <router-link to="/reviews" class="nav-item">
        <span class="icon-wrapper"><font-awesome-icon icon="star" /></span>
        <span>Reviews</span>
      </router-link>
       <div class="menu-header">REPORTS &amp; SERVICE</div>
       <router-link to="/reports/sales" class="nav-item">
        <span class="icon-wrapper"><font-awesome-icon icon="chart-bar" /></span>
        <span>Sales</span>
      </router-link>
      <router-link to="/customer-service" class="nav-item">
        <span class="icon-wrapper"><font-awesome-icon icon="headset" /></span>
        <span>Customer Service</span>
      </router-link>
    </nav>
    <div class="user-profile">
      <div class="user-avatar"></div>
      <div class="user-actions">
          <a @click.prevent="handleLogout" href="#" class="logout-link">
            <font-awesome-icon icon="sign-out-alt" /> Log out
          </a>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'AppSidebar',
    setup() {
        const store = useStore();
        const router = useRouter();
        const handleLogout = () => {
            store.dispatch('auth/logout');
            router.push('/login');
        };
        return { handleLogout };
    }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #0d1b2a;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  height: 100vh;
}
.logo-container {
  display: flex;
  align-items: center;
  padding-bottom: 2rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
}
.logo { height: 40px; margin-right: 10px; }
.logo-text { font-size: 1.2rem; font-weight: bold; }

.menu-header {
    padding: 1.5rem 1rem 0.5rem 1rem;
    font-size: 0.75rem;
    color: #7789a8;
    text-transform: uppercase;
    letter-spacing: 1px;
}
.nav-item {
  display: flex;
  align-items: center;
  padding: 0.9rem 1rem;
  color: #e0e1dd;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
}
.nav-item:hover, .router-link-exact-active {
  background-color: #415a77; /* Active link color */
  color: white;
}
.icon-wrapper {
    width: 20px;
    margin-right: 15px; /* Adds space between icon and text */
    text-align: center;
}
.user-profile { margin-top: auto; text-align: center; }
.user-avatar { width: 50px; height: 50px; border-radius: 50%; background-color: #ccc; margin: 0 auto 10px; }
.logout-link { color: #e0e1dd; text-decoration: none; }
</style>