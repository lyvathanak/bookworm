<template>
  <div class="profile-page">
    <div class="profile-container">
      <ProfileSidebar 
        :user="authStore.user" 
        :activeSection="activeSection"
        @set-section="setActiveSection"
        @logout="handleLogout"
        @upload-image="handleImageUpload"
      />
      
      <div class="profile-content">
        <div class="welcome-section">
          <h1>Welcome Back, {{ authStore.user?.firstName || 'User' }}!</h1>
          <p v-if="authStore.isLoading" class="loading-indicator">Saving changes...</p>
        </div>

        <div v-if="activeSection === 'profile'" class="content-section">
          <MyProfile 
            :user="authStore.user" 
            :is-loading="authStore.isLoading"
            @update-profile="updateProfile"
          />
        </div>
        
        <div v-if="activeSection === 'orders'" class="content-section">
          <MyOrders :orders="authStore.orders" />
        </div>
        
        <div v-if="activeSection === 'wishlist'" class="content-section">
          <MyWishlist />
        </div>
        
        <div v-if="activeSection === 'address'" class="content-section">
          <MyAddress 
            :user="authStore.user" 
            :is-loading="authStore.isLoading"
            @update-address="updateAddress"
          />
        </div>
        
        <div v-if="activeSection === 'password'" class="content-section">
          <ChangePassword 
            :is-loading="authStore.isLoading"
            @change-password="changePassword" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authStore } from '@/store/auth'

import ProfileSidebar from '@/components/UserProfile/ProfileSidebar.vue'
import MyProfile from '@/components/UserProfile/MyProfile.vue'
import MyOrders from '@/components/UserProfile/MyOrders.vue'
import MyWishlist from '@/components/UserProfile/MyWishlist.vue'
import MyAddress from '@/components/UserProfile/MyAddress.vue'
import ChangePassword from '@/components/UserProfile/ChangePassword.vue'

const router = useRouter()
const route = useRoute()
const activeSection = ref('profile')

// Redirect if not authenticated
if (!authStore.isAuthenticated) {
  router.push({
    path: '/auth/signin',
    query: { redirect: route.fullPath }
  })
}

// Set active section from route query
onMounted(() => {
  if (route.query.section) {
    activeSection.value = route.query.section
  }
})

const setActiveSection = (section) => {
  activeSection.value = section
  // Update URL without reloading
  router.replace({ query: { section } })
}

const updateProfile = async (profileData) => {
  try {
    await authStore.updateUser(profileData)
    console.log('Profile updated successfully!')
  } catch (error) {
    console.error('Profile update failed:', error)
  }
}

const handleImageUpload = async (imageFile) => {
  try {
    await authStore.updateUser({ profileImage: imageFile })
    console.log('Profile image updated successfully!')
  } catch (error) {
    console.error('Image upload failed:', error)
  }
}

const updateAddress = async (addressData) => {
  try {
    await authStore.updateUser({ address: addressData })
    console.log('Address updated successfully!')
  } catch (error) {
    console.error('Address update failed:', error)
  }
}

const changePassword = async (passwordData) => {
  try {
    const success = await authStore.changePassword(
      passwordData.currentPassword,
      passwordData.newPassword
    )
    if (success) {
      console.log('Password changed successfully!')
      return true
    } else {
      console.error('Failed to change password')
      return false
    }
  } catch (error) {
    console.error('Password change error:', error)
    return false
  }
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<style scoped>
.profile-page {
  min-height: calc(100vh - 160px);
  background-color: #f8f9fa;
  padding: 20px 0;
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.profile-content {
  flex: 1;
  background: #f8f9fa;
  min-height: 600px;
}

.welcome-section {
  background: white;
  padding: 30px;
  border-bottom: 1px solid #eee;
}

.welcome-section h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
  color: #333;
  font-weight: 600;
}

.loading-indicator {
  margin: 0;
  color: #4a90e2;
  font-size: 14px;
}

.content-section {
  background: white;
  padding: 30px;
  margin: 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
    margin: 0 10px;
  }
  
  .profile-content {
    padding: 0;
  }
  
  .welcome-section {
    padding: 20px;
  }
  
  .content-section {
    padding: 20px;
    border-radius: 0;
  }
}

@media (max-width: 480px) {
  .welcome-section h1 {
    font-size: 24px;
  }
  
  .content-section {
    padding: 15px;
  }
}
</style>