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
          <li class="nav-item dropdown-container" 
              @mouseenter="showAllBooksDropdown = true" 
              @mouseleave="hideAllBooksDropdown">
            <a href="/home" class="nav-link active" @click.prevent="toggleAllBooksDropdown">All Books</a>
            <!-- All Books Dropdown -->
            <div class="nav-dropdown" 
                 v-show="showAllBooksDropdown"
                 @mouseenter="keepAllBooksDropdown"
                 @mouseleave="hideAllBooksDropdown">
              <div class="dropdown-columns">
                <div class="dropdown-column">
                  <h4 class="dropdown-header">FICTION</h4>
                  <a href="/books/literary-fiction" class="dropdown-link">Literary Fiction</a>
                  <a href="/books/mystery-thriller" class="dropdown-link">Mystery & Thriller</a>
                  <a href="/books/science-fiction" class="dropdown-link">Science Fiction</a>
                  <a href="/books/fantasy" class="dropdown-link">Fantasy</a>
                  <a href="/books/romance" class="dropdown-link">Romance</a>
                  <a href="/books/horror" class="dropdown-link">Horror</a>
                  <a href="/books/historical-fiction" class="dropdown-link">Historical Fiction</a>
                  <a href="/books/adventure" class="dropdown-link">Adventure</a>
                  <a href="/books/dystopian" class="dropdown-link">Dystopian</a>
                  <a href="/books/magical-realism" class="dropdown-link">Magical Realism</a>
                </div>
                <div class="dropdown-column">
                  <h4 class="dropdown-header">NON-FICTION</h4>
                  <a href="/books/biography" class="dropdown-link">Biography</a>
                  <a href="/books/memoir" class="dropdown-link">Memoir</a>
                  <a href="/books/self-help" class="dropdown-link">Self-Help</a>
                  <a href="/books/psychology" class="dropdown-link">Psychology</a>
                  <a href="/books/business" class="dropdown-link">Business</a>
                  <a href="/books/science" class="dropdown-link">Science</a>
                  <a href="/books/philosophy" class="dropdown-link">Philosophy</a>
                  <a href="/books/history" class="dropdown-link">History</a>
                  <a href="/books/politics" class="dropdown-link">Politics</a>
                  <a href="/books/religion" class="dropdown-link">Religion</a>
                </div>
                <div class="dropdown-column">
                  <h4 class="dropdown-header">EDUCATIONAL</h4>
                  <a href="/books/textbooks" class="dropdown-link">Textbooks</a>
                  <a href="/books/encyclopedias" class="dropdown-link">Encyclopedias</a>
                  <a href="/books/language" class="dropdown-link">Language</a>
                  <a href="/books/cookbooks" class="dropdown-link">Cookbooks</a>
                  <a href="/books/health" class="dropdown-link">Health</a>
                </div>
                <div class="dropdown-column">
                  <h4 class="dropdown-header">OTHERS</h4>
                  <a href="/books/poetry" class="dropdown-link">Poetry</a>
                  <a href="/books/comics" class="dropdown-link">Comics</a>
                  <a href="/books/childrens-books" class="dropdown-link">Children's Books</a>
                  <a href="/books/young-adult" class="dropdown-link">Young Adult</a>
                  <a href="/books/travel" class="dropdown-link">Travel</a>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown-container" 
              @mouseenter="showContactDropdown = true" 
              @mouseleave="hideContactDropdown">

            <a href="/contact" class="nav-link" @click.prevent="toggleContactDropdown">Contact Us</a>
            <!-- Contact Dropdown -->
            <div class="nav-dropdown contact-dropdown" 
                 v-show="showContactDropdown"
                 @mouseenter="keepContactDropdown"
                 @mouseleave="hideContactDropdown">
              <div class="dropdown-column">
                <a href="/contact/support" class="dropdown-link">Customer Support</a>
                <a href="/contact/returns" class="dropdown-link">Returns & Exchanges</a>
                <a href="/contact/shipping" class="dropdown-link">Shipping Information</a>
                <a href="/contact/bulk-orders" class="dropdown-link">Bulk Orders</a>
                <a href="/contact/about" class="dropdown-link">About Us</a>
                <a href="/contact/careers" class="dropdown-link">Careers</a>
              </div>
            </div>
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

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const searchQuery = ref('')
    const isMenuOpen = ref(false)
    const isLoggedIn = ref(false) // Set this based on your authentication state
    const showUserDropdown = ref(false)
    const showMobileUserDropdown = ref(false)
    const showAllBooksDropdown = ref(false)
    const showContactDropdown = ref(false)

    const handleSearch = () => {
      console.log('Searching for:', searchQuery.value)
    }

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    // Toggle dropdown functions
    const toggleAllBooksDropdown = () => {
      showAllBooksDropdown.value = !showAllBooksDropdown.value
      showContactDropdown.value = false // Close other dropdown
    }

    const toggleContactDropdown = () => {
      showContactDropdown.value = !showContactDropdown.value
      showAllBooksDropdown.value = false // Close other dropdown
    }

    // Toggle user dropdown
    const toggleUserDropdown = () => {
      showUserDropdown.value = !showUserDropdown.value
    }

    // Toggle mobile user dropdown
    const toggleMobileUserDropdown = () => {
      showMobileUserDropdown.value = !showMobileUserDropdown.value
    }

    // Close dropdown when clicked outside
    const closeUserDropdown = (event) => {
      if (!event.target.closest('.user-dropdown')) {
        showUserDropdown.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', closeUserDropdown)
    })

    onUnmounted(() => {
      document.removeEventListener('click', closeUserDropdown)
    })


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

    // Add delay for better UX when moving mouse between nav item and dropdown
    let allBooksTimeout = null
    let contactTimeout = null

    const hideAllBooksDropdown = () => {
      allBooksTimeout = setTimeout(() => {
        showAllBooksDropdown.value = false
      }, 100) // Small delay to allow mouse movement
    }

    const hideContactDropdown = () => {
      contactTimeout = setTimeout(() => {
        showContactDropdown.value = false
      }, 100) // Small delay to allow mouse movement
    }

    // Clear timeouts when mouse enters dropdown area
    const keepAllBooksDropdown = () => {
      if (allBooksTimeout) {
        clearTimeout(allBooksTimeout)
        allBooksTimeout = null
      }
      showAllBooksDropdown.value = true
    }

    const keepContactDropdown = () => {
      if (contactTimeout) {
        clearTimeout(contactTimeout)
        contactTimeout = null
      }
      showContactDropdown.value = true
    }

    return {
      searchQuery,
      isMenuOpen,
      isLoggedIn,
      showUserDropdown,
      showMobileUserDropdown,
      showAllBooksDropdown,
      showContactDropdown,
      handleSearch,
      toggleMenu,
      toggleAllBooksDropdown,
      toggleContactDropdown,
      toggleUserDropdown,
      toggleMobileUserDropdown,
      logout,
      closeUserDropdown,
      hideAllBooksDropdown,
      hideContactDropdown,
      keepAllBooksDropdown,
      keepContactDropdown
    }
  }
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
  position: relative;
}

/* Dropdown container styles */
.dropdown-container {
  position: relative;
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

/* Navigation dropdown styles */
.nav-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #0a1f44;
  min-width: 800px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  border-radius: 4px;
  padding: 20px;
  z-index: 1000;
  margin-top: 10px;
  border: 1px solid rgba(255,255,255,0.1);
}

.contact-dropdown {
  min-width: 250px;
}

.dropdown-columns {
  display: flex;
  gap: 30px;
}

.dropdown-column {
  flex: 1;
  min-width: 0;
}

.dropdown-header {
  color: #e6d430;
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 10px 0;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.dropdown-link {
  display: block;
  color: white;
  text-decoration: none;
  padding: 8px 0;
  font-size: 14px;
  transition: color 0.2s;
}

.dropdown-link:hover {
  color: #e6d430;
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
  cursor: pointer;
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
  
  .nav-dropdown {
    min-width: 700px;
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
  
  .nav-dropdown {
    min-width: 600px;
  }
}

@media (max-width: 850px) {
  .search-container {
    max-width: 220px;
  }
  
  .nav-dropdown {
    min-width: 500px;
    left: -100px;
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
