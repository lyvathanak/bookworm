<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <a href="/home">
          <img src="../assets/blueLogo.png" alt="Bookworm Logo" class="logo-image" />
        </a>
      </div>
      
      <nav class="navigation">
        <ul class="nav-links">
          <li class="nav-item">
            <a href="/home" class="nav-link active">All Books</a>
          </li>
          <li class="nav-item">
            <a href="/contact" class="nav-link">Contact Us</a>
          </li>
        </ul>
      </nav>
      
      <div class="search-container">
        <form @submit.prevent="handleSearch" class="search-form">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search by title or author" 
            class="search-input"
            @input="updateSearch" />
          <button type="submit" class="search-button">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
      
      <div class="user-actions">
        <a href="/wishlist" class="action-icon">
          <i class="fas fa-heart"></i>
        </a>
        <a href="/cart" class="action-icon">
          <i class="fas fa-shopping-cart"></i>
        </a>
        <a :href="profileLink" class="action-icon">
          <i class="fas fa-user"></i>
        </a>
      </div>

      <div class="mobile-menu-toggle" @click="toggleMenu">
        <div class="toggle-icon"></div>
        <div class="toggle-icon"></div>
        <div class="toggle-icon"></div>
      </div>
    </div>
    <nav v-if="isMenuOpen" class="mobile-navigation">
      <ul class="mobile-nav-links">
        <li class="mobile-nav-item">
          <a href="/home" class="mobile-nav-link active">All Books</a>
        </li>
        <li class="mobile-nav-item">
          <a href="/contact" class="mobile-nav-link">Contact Us</a>
        </li>
        <li class="mobile-nav-item mobile-search">
          <form @submit.prevent="handleSearch" class="mobile-search-form">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search by title or author" 
              class="mobile-search-input"
              @input="updateSearch" />
            <button type="submit" class="mobile-search-button">
              <i class="fas fa-search"></i>
            </button>
          </form>
        </li>
        <li class="mobile-nav-item mobile-actions">
          <a href="/wishlist" class="mobile-action-icon">
            <i class="fas fa-heart"></i> Wishlist
          </a>
        </li>
        <li class="mobile-nav-item mobile-actions">
          <a href="/cart" class="mobile-action-icon">
            <i class="fas fa-shopping-cart"></i> Cart
          </a>
        </li>
        <li class="mobile-nav-item mobile-actions">
          <a :href="profileLink" class="mobile-action-icon">
            <i class="fas fa-user"></i> Account
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router' // Import useRouter
import { authStore } from '@/store/auth' // Assuming authStore is correctly implemented and accessible

const router = useRouter() // Initialize useRouter

const searchQuery = ref('')
const isMenuOpen = ref(false)

// Update search query in route on input
const updateSearch = () => {
  router.push({ path: '/home', query: { search: searchQuery.value.trim() || undefined } })
}

// The handleSearch function will also trigger a search.
// You can keep it as is, or remove it if updateSearch is sufficient for your needs.
const handleSearch = () => {
  // This will trigger the updateSearch as well since it's bound to @input.
  // You might want to remove the @submit.prevent from the form if you want
  // only @input to drive the search. If you want a specific action on submit,
  // then keep this. For now, I'll assume you want the submit to also update the URL.
  updateSearch(); 
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Computed property to determine the profile link based on authentication status
const profileLink = computed(() => {
  return authStore.isAuthenticated ? '/profile' : '/auth/signin';
});
</script>

<style scoped>
.header {
  background-color: #0a1f44;
  padding: 15px 0;
  width: 100%;
  position: relative;
}

.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 10px;
}

.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo-image {
  height: 40px;
  width: auto;
}

.navigation {
  display: flex;
  align-items: center;
  margin: 0 10px;
}

.nav-links {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 20px;
}

.nav-item {
  white-space: nowrap;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
  white-space: nowrap;
}

.nav-link:hover {
  color: #e6d430;
}

.nav-link.active {
  color: #e6d430;
  font-weight: bold;
}

.search-container {
  flex-grow: 1;
  flex-basis: 100px;
  max-width: 500px;
  margin: 0 10px;
}

.search-form {
  display: flex;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
}

.search-button {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
}

.action-icon {
  color: white;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s;
}

.action-icon:hover {
  color: #e6d430;
}

.mobile-menu-toggle {
  display: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  flex-shrink: 0;
}

.toggle-icon {
  width: 24px;
  height: 3px;
  background-color: white;
  transition: all 0.3s ease;
}

.mobile-navigation {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #0a1f44;
  z-index: 100;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
}

.mobile-nav-links {
  list-style: none;
  padding: 10px 20px;
  margin: 0;
}

.mobile-nav-item {
  margin: 15px 0;
}

.mobile-nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  display: block;
}

.mobile-search-form {
  position: relative;
  margin-top: 10px;
}

.mobile-search-input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
}

.mobile-search-button {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.mobile-action-icon {
  color: white;
  text-decoration: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.mobile-action-icon i {
  width: 20px;
}

/* Responsive Media Queries */
@media (max-width: 1200px) {
  .search-container {
    max-width: 350px;
  }
}

@media (max-width: 992px) {
  .search-container {
    max-width: 300px;
  }
  
  .action-icon {
    margin-left: 0;
    font-size: 18px;
  }

  .nav-link {
    font-size: 14px;
  }
}

@media (max-width: 850px) {
  .search-container {
    max-width: 220px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
    justify-content: space-between;
  }
  
  .logo {
    flex-grow: 1;
  }
  
  .navigation {
    display: none;
  }
  
  .search-container {
    display: none;
  }
  
  .user-actions {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .mobile-navigation {
    display: block;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
}

@media (max-width: 480px) {
  .logo-image {
    height: 30px;
  }
  
  .container {
    padding: 0 10px;
  }
}

/* Fix for v-if and display combinations */
.mobile-navigation[style*="display: none"] {
  display: none !important;
}
</style>