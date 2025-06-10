<template>
  <div class="profile-page">
    <div class="profile-container">
      <ProfileSidebar 
        :user="authStore.user" 
        :activeSection="activeSection"
        @set-section="setActiveSection"
        @logout="handleLogout" 
      />
      
      <div class="profile-content">
        <div class="welcome-section">
          <h1>Welcome Back, {{ authStore.user?.firstName || 'User' }}!</h1>
        </div>

        <div v-if="activeSection === 'profile'" class="content-section">
          <MyProfile 
            :user="authStore.user" 
            @update-profile="updateProfile"
            @upload-image="uploadProfileImage"
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
            @update-address="updateAddress"
          />
        </div>
        
        <div v-if="activeSection === 'password'" class="content-section">
          <ChangePassword @change-password="changePassword" />
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
const isLoggingOut = ref(false)

if (!authStore.isAuthenticated) {
  router.push(`/auth/signin?redirect=${encodeURIComponent(route.fullPath)}`)
}

onMounted(() => {
  if (route.query.section) {
    activeSection.value = route.query.section
  }
});

const setActiveSection = (section) => {
  activeSection.value = section
  router.replace({ query: { section } })
}

const updateProfile = (profileData) => {
  authStore.updateUser(profileData)
  console.log('Profile updated successfully!')
}

const uploadProfileImage = (imageFile) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    authStore.updateUser({
      profileImage: e.target.result
    })
    console.log('Profile image updated successfully (simulated).')
  }
  reader.readAsDataURL(imageFile)
}

const updateAddress = (addressData) => {
  authStore.updateUser({
    address: addressData
  })
  console.log('Address updated successfully!')
}

const changePassword = (passwordData) => {
  const success = authStore.changePassword(passwordData.currentPassword, passwordData.newPassword)
  if (success) {
    console.log('Password changed successfully!')
  } else {
    console.error('Failed to change password. Please try again.')
  }
}

const handleLogout = async () => {
  isLoggingOut.value = true
  try {
    await authStore.logout() // Wait for the logout delay
    router.push('/') // Redirect to home page after logout
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    isLoggingOut.value = false
  }
}
</script>


<style scoped>
.profile-page {
  min-height: calc(100vh - 160px); /* Account for header and footer */
  background-color: #f8f9fa;
  padding: 20px 0;
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.profile-content {
  flex: 1;
  background: #f8f9fa;
}

.welcome-section {
  background: white;
  padding: 30px;
  border-bottom: 1px solid #eee;
}

.welcome-section h1 {
  margin: 0;
  font-size: 28px;
  color: #333;
  font-weight: 600;
}

.content-section {
  background: #e8e9ea;
  padding: 30px;
  margin: 0;
  border-radius: 0;
  box-shadow: none;
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
  }
}
</style>