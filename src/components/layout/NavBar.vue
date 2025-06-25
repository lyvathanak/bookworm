<template>
  <header class="header">
    <div class="container">
      <router-link to="/" class="logo">
        <img src="@/assets/blueLogo.png" alt="Bookworm Logo" class="logo-image" />
      </router-link>
      
      <nav class="navigation">
        <ul class="nav-links">
          <li 
            class="nav-item" 
            @mouseenter="handleMouseEnter" 
            @mouseleave="handleMouseLeave"
          >
            <a href="#" @click.prevent class="nav-link">
              All Books <i class="fas fa-chevron-down text-xs"></i>
            </a>
            <div class="nav-dropdown" v-if="showCategories">
              <div class="dropdown-column">
                <h4 class="dropdown-header">FICTION</h4>
                <router-link to="/?genre=Mystery" class="dropdown-link" @click="closeDropdowns">Mystery</router-link>
                <router-link to="/?genre=Crime" class="dropdown-link" @click="closeDropdowns">Crime</router-link>
                <router-link to="/?genre=LGBT" class="dropdown-link" @click="closeDropdowns">LGBT</router-link>
                <router-link to="/?genre=Romance" class="dropdown-link" @click="closeDropdowns">Romance</router-link>
                <router-link to="/?genre=Adventure" class="dropdown-link" @click="closeDropdowns">Adventure</router-link>
                <router-link to="/?genre=Adult" class="dropdown-link" @click="closeDropdowns">Adult</router-link>
                <router-link to="/?genre=Suspense" class="dropdown-link" @click="closeDropdowns">Suspense</router-link>
                <router-link to="/?genre=Contemporary" class="dropdown-link" @click="closeDropdowns">Contemporary</router-link>
              </div>
              <div class="dropdown-column">
                <h4 class="dropdown-header">NON-FICTION</h4>
                <router-link to="/?genre=Self-Help" class="dropdown-link" @click="closeDropdowns">Self-Help</router-link>
                <router-link to="/?genre=Biography" class="dropdown-link" @click="closeDropdowns">Biography</router-link>
                <router-link to="/?genre=History" class="dropdown-link" @click="closeDropdowns">History</router-link>
                <router-link to="/?genre=Recipes" class="dropdown-link" @click="closeDropdowns">Recipe</router-link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      
      <div class="search-container">
        <form @submit.prevent="handleSearch" class="search-form">
          <input type="text" v-model="searchQuery" placeholder="Search by title or author" class="search-input" />
          <button type="submit" class="search-button"><i class="fas fa-search"></i></button>
        </form>
      </div>
      
      <div class="user-actions">
        <router-link to="/wishlist" class="action-icon" title="Wishlist"><i class="fas fa-heart"></i></router-link>
        <router-link to="/cart" class="action-icon" title="Cart"><i class="fas fa-shopping-cart"></i></router-link>
        
        <div class="relative" v-if="authStore.isAuthenticated">
          <button @click="isProfileOpen = !isProfileOpen" class="action-icon" title="Profile"><i class="fas fa-user-circle"></i></button>
          <div v-if="isProfileOpen" class="dropdown-menu profile-dropdown">
             <div class="dropdown-header">Welcome, {{ authStore.user?.fname }}!</div>
             <router-link to="/profile" @click="isProfileOpen = false" class="dropdown-item">My Profile</router-link>
             <a @click="handleLogout" href="#" class="dropdown-item logout">Logout</a>
          </div>
        </div>

        <router-link v-else to="/auth/signin" class="nav-link sign-in-link">Sign In</router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '@/store/auth';

const router = useRouter();
const searchQuery = ref('');
const isProfileOpen = ref(false);

// --- START: Corrected Dropdown Logic ---
const showCategories = ref(false);
let categoryTimeout = null;

const handleMouseEnter = () => {
  clearTimeout(categoryTimeout);
  showCategories.value = true;
};

const handleMouseLeave = () => {
  categoryTimeout = setTimeout(() => {
    showCategories.value = false;
  }, 200); // 200ms delay before closing
};

const closeDropdowns = () => {
  showCategories.value = false;
  isProfileOpen.value = false;
};
// --- END: Corrected Dropdown Logic ---


const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/', query: { search: searchQuery.value.trim() } });
  } else {
    router.push({ path: '/' }); // Clear search if input is empty
  }
};

const handleLogout = () => {
  isProfileOpen.value = false;
  authStore.logout();
};
</script>

<style scoped>
/* Styles are identical to the previous response, no changes needed here */
.header { background-color: #0a1f44; padding: 15px 0; width: 100%; position: relative; color: white; border-bottom: 1px solid #2c3e50; }
.container { max-width: 1400px; margin: 0 auto; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; }
.logo-image { height: 40px; }
.navigation { display: flex; align-items: center; }
.nav-links { display: flex; list-style: none; padding: 0; margin: 0; gap: 20px; }
.nav-item { position: relative; }
.nav-link { color: white; text-decoration: none; font-size: 16px; padding: 10px; transition: color 0.3s; display: flex; align-items: center; gap: 5px; }
.nav-link:hover, .nav-link.router-link-exact-active { color: #e6d430; }
.search-container { flex-grow: 1; max-width: 400px; margin: 0 20px; }
.search-form { display: flex; position: relative; }
.search-input { width: 100%; padding: 10px 15px; border-radius: 20px; border: none; color: #333;}
.search-button { position: absolute; right: 5px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 5px; color: #666;}
.user-actions { display: flex; align-items: center; gap: 20px; }
.action-icon { color: white; font-size: 20px; text-decoration: none; background: none; border: none; cursor: pointer;}
.action-icon:hover { color: #e6d430; }
.nav-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 450px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  border-radius: 8px;
  padding: 20px;
  z-index: 1000;
  margin-top: 15px;
  display: flex;
  gap: 30px;
  border: 1px solid #ddd;
}
.dropdown-column { flex: 1; }
.dropdown-header { color: #999; font-size: 0.8rem; font-weight: bold; text-transform: uppercase; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #eee; }
.dropdown-link { display: block; color: #333; text-decoration: none; padding: 8px 0; font-size: 0.9rem; }
.dropdown-link:hover { color: #0a1f44; font-weight: 500; }
.relative { position: relative; }
.profile-dropdown {
  position: absolute;
  right: 0;
  top: 150%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 10;
  min-width: 200px;
  border: 1px solid #eee;
  padding: 5px;
}
.profile-dropdown .dropdown-header { padding: 10px 15px; color: #666; font-size: 0.9em; border-bottom: 1px solid #eee;}
.profile-dropdown .dropdown-item { display: block; padding: 10px 15px; color: #333; text-decoration: none; font-size: 0.9rem; border-radius: 4px;}
.profile-dropdown .dropdown-item:hover { background-color: #f5f5f5; }
.profile-dropdown .dropdown-item.logout { color: #e74c3c; }
.sign-in-link { font-weight: 500; padding: 6px 12px; border: 1px solid white; border-radius: 20px; }
.sign-in-link:hover { background-color: #e6d430; color: #0a1f44; border-color: #e6d430; }
</style>