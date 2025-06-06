<template>
  <div class="sidebar">
    <div class="logo-container">
      <img src="@/assets/BOOK (1).png" alt="Bookworm Logo" class="logo">
      <span class="logo-text">BOOK WORM</span>
    </div>
    <nav class="nav-menu">
      <router-link to="/" class="nav-item">
        <font-awesome-icon icon="tachometer-alt" />
        <span>Dashboard</span>
      </router-link>
      <router-link to="/products" class="nav-item">
        <font-awesome-icon icon="book" />
        <span>Product Manager</span>
      </router-link>
      <router-link to="/accounts" class="nav-item">
        <font-awesome-icon icon="users" />
        <span>Account Manager</span>
      </router-link>
      <router-link to="/comments" class="nav-item">
        <font-awesome-icon icon="comments" />
        <span>Comments Manager</span>
      </router-link>
      <router-link to="/customer-service" class="nav-item">
        <font-awesome-icon icon="headset" />
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
/* Styles remain the same */
.sidebar {
  width: 250px;
  background-color: #1b263b;
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
}
.logo {
  height: 40px;
  margin-right: 10px;
}
.logo-text {
  font-size: 1.2rem;
  font-weight: bold;
}
.nav-menu {
  flex-grow: 1;
}
.nav-item {
  display: flex;
  align-items: center;
  padding: 0.9rem 1rem;
  margin-bottom: 0.5rem;
  color: #e0e1dd;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
}
.nav-item:hover, .router-link-exact-active {
  background-color: #415a77;
  color: white;
}
.nav-item .fa-icon {
  margin-right: 10px;
}
.user-profile {
  margin-top: auto;
  text-align: center;
}
.user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ccc;
    margin: 0 auto 10px;
}
.logout-link {
    color: #e0e1dd;
    text-decoration: none;
}
.logout-link:hover {
    color: white;
}
</style>