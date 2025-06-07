<template>
  <div class="profile-sidebar">
    <!-- User Info Section -->
    <div class="user-info">
      <div class="user-avatar">
        <img 
          v-if="props.user?.profileImage" 
          :src="props.user.profileImage" 
          :alt="props.user.firstName" 
          class="avatar-image"
        />
        <div v-else class="avatar-placeholder">
          <i class="fas fa-user"></i>
        </div>
      </div>
      <div class="user-details">
        <h3>{{ props.user?.firstName }} {{ props.user?.lastName }}</h3>
        <p>Member since {{ formatDate(props.user?.createdAt) }}</p>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <button 
        @click="setSection('profile')"
        :class="['nav-item', { active: props.activeSection === 'profile' }]"
      >
        <i class="fas fa-user"></i>
        <span>My Profile</span>
      </button>
      
      <button 
        @click="setSection('orders')"
        :class="['nav-item', { active: props.activeSection === 'orders' }]"
      >
        <i class="fas fa-shopping-bag"></i>
        <span>My Orders</span>
      </button>
      
      <button 
        @click="setSection('wishlist')"
        :class="['nav-item', { active: props.activeSection === 'wishlist' }]"
      >
        <i class="fas fa-heart"></i>
        <span>My Wishlist</span>
      </button>
      
      <button 
        @click="setSection('address')"
        :class="['nav-item', { active: props.activeSection === 'address' }]"
      >
        <i class="fas fa-map-marker-alt"></i>
        <span>My Address</span>
      </button>
      
      <button 
        @click="setSection('password')"
        :class="['nav-item', { active: props.activeSection === 'password' }]"
      >
        <i class="fas fa-key"></i>
        <span>Change Password</span>
      </button>
      
      <button @click="logout" class="nav-item logout">
        <i class="fas fa-sign-out-alt"></i>
        <span>Log out</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { authStore } from '@/store/auth'
//import { ref, onMounted } from 'vue';

// eslint-disable-next-line no-undef
const props = defineProps({
  user: Object,
  activeSection: String
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['set-section'])
const router = useRouter()

const setSection = (section) => {
  emit('set-section', section)
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.profile-sidebar {
  width: 280px;
  background: #1e3a5f;
  color: white;
  display: flex;
  flex-direction: column;
  min-height: 600px;
}

.user-info {
  padding: 30px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 15px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  font-size: 32px;
  color: rgba(255, 255, 255, 0.7);
}

.user-details h3 {
  margin: 0 0 5px 0;
  font-size: 18px;
  font-weight: 600;
}

.user-details p {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.sidebar-nav {
  flex: 1;
  padding: 20px 0;
}

.nav-item {
  width: 100%;
  padding: 15px 25px;
  background: none;
  border: none;
  color: white;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 16px;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-left-color: rgba(255, 255, 255, 0.3);
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.15);
  border-left-color: #4a90e2;
  font-weight: 600;
}

.nav-item.logout {
  margin-top: auto;
  color: #ff6b6b;
}

.nav-item.logout:hover {
  background: rgba(255, 107, 107, 0.1);
  border-left-color: #ff6b6b;
}

.nav-item i {
  width: 20px;
  text-align: center;
  font-size: 16px;
}

@media (max-width: 768px) {
  .profile-sidebar {
    width: 100%;
    min-height: auto;
  }
  
  .sidebar-nav {
    display: flex;
    overflow-x: auto;
    padding: 10px 0;
  }
  
  .nav-item {
    flex-shrink: 0;
    padding: 10px 15px;
    border-left: none;
    border-bottom: 3px solid transparent;
  }
  
  .nav-item.active {
    border-left: none;
    border-bottom-color: #4a90e2;
  }
}
</style>