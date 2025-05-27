<template>
  <header class="header">
    <div class="container">
      <!-- Logo -->
      <div class="logo">
        <a href="/home">
          <img src="../assets/blueLogo.png" alt="Bookworm Logo" class="logo-image" />
        </a>
      </div>
      
      <!-- Navigation -->
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
      
      <!-- Search Bar -->
      <div class="search-container">
        <form @submit.prevent="handleSearch" class="search-form">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search by title or author" 
            class="search-input"
          />
          <button type="submit" class="search-button">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
      
      <!-- User Actions - Updated with dropdown -->
      <div class="user-actions">
        <a href="/wishlist" class="action-icon">
          <i class="fas fa-heart"></i>
        </a>
        <a href="/cart" class="action-icon">
          <i class="fas fa-shopping-cart"></i>
        </a>
        
        <!-- User icon with dropdown -->
        <div class="user-dropdown">
          <span class="action-icon" @click="toggleUserDropdown">
            <i class="fas fa-user"></i>
          </span>
          <div class="dropdown-menu" v-show="showUserDropdown">
            <router-link to="/auth/signin" class="dropdown-item">Sign In</router-link>
            <router-link to="/auth/signup" class="dropdown-item">Sign Up</router-link>
            <a href="#" @click.prevent="logout" class="dropdown-item logout">Log Out</a>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Toggle -->
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
            />
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
          <div class="mobile-user-dropdown">
            <span class="mobile-action-icon" @click="toggleMobileUserDropdown">
              <i class="fas fa-user"></i> Account
            </span>
            <div class="mobile-dropdown-menu" v-show="showMobileUserDropdown">
              <router-link to="/auth/signin" class="dropdown-item">Sign In</router-link>
              <router-link to="/auth/signup" class="dropdown-item">Sign Up</router-link>
              <a href="#" @click.prevent="logout" class="dropdown-item logout">Log Out</a>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')
const isMenuOpen = ref(false)
const isLoggedIn = ref(false) // Set this based on your authentication state
const showUserDropdown = ref(false)
const showMobileUserDropdown = ref(false)

const handleSearch = () => {
  console.log('Searching for:', searchQuery.value)
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Toggle user dropdown
const toggleUserDropdown = () => {
  showUserDropdown.value = !showUserDropdown.value
  if (showUserDropdown.value) {
    // Close on click outside
    setTimeout(() => {
      document.addEventListener('click', closeUserDropdown)
    }, 0)
  }
}

// Toggle mobile user dropdown
const toggleMobileUserDropdown = () => {
  showMobileUserDropdown.value = !showMobileUserDropdown.value
}

// Close dropdown when clicked outside
const closeUserDropdown = (event) => {
  if (!event.target.closest('.user-dropdown')) {
    showUserDropdown.value = false
    document.removeEventListener('click', closeUserDropdown)
  }
}

// Logout function
const logout = () => {
  // Clear user data from localStorage
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.removeItem('wishlist')
  localStorage.removeItem('cartItems')
  
  // Update login state
  isLoggedIn.value = false
  
  // Close dropdowns
  showUserDropdown.value = false
  showMobileUserDropdown.value = false
  
  // Show confirmation
  alert('You have been logged out successfully')
  
  // Redirect to home
  router.push('/')
}
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

/* Dropdown styles */
.user-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  min-width: 180px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  border-radius: 4px;
  padding: 8px 0;
  z-index: 1000;
  margin-top: 10px;
}

.dropdown-item {
  display: block;
  padding: 10px 16px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-item.logout {
  color: #e74c3c;
  border-top: 1px solid #eee;
  margin-top: 5px;
  padding-top: 10px;
}

.dropdown-item.logout:hover {
  background-color: #fee;
}

/* Mobile dropdown styles */
.mobile-user-dropdown {
  position: relative;
}

.mobile-dropdown-menu {
  background-color: #0a1f44;
  border-top: 1px solid rgba(255,255,255,0.1);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin: 10px -20px 0;
  padding: 10px 0;
}

.mobile-dropdown-menu .dropdown-item {
  padding: 10px 40px;
  color: white;
}

.mobile-dropdown-menu .dropdown-item:hover {
  background-color: rgba(255,255,255,0.1);
}

.mobile-dropdown-menu .dropdown-item.logout {
  color: #ff6b6b;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.mobile-dropdown-menu .dropdown-item.logout:hover {
  background-color: rgba(255,0,0,0.1);
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