<template>
  <div class="profile-page">
    <div v-if="!authStore.user" class="loading-state">Loading Profile...</div>
    <div v-else class="profile-container">
      <ProfileSidebar 
        :user="authStore.user" 
        :activeSection="activeSection"
        @set-section="setActiveSection"
        @logout="authStore.logout()"
      />
      <div class="profile-content">
         <h1 class="welcome-header">Welcome Back, {{ authStore.user.fname }}!</h1>
        
        <div v-if="activeSection === 'profile'">
          <MyProfile :user="authStore.user" />
        </div>
        <div v-if="activeSection === 'orders'">
          <MyOrders />
        </div>
        <div v-if="activeSection === 'password'">
          <ChangePassword />
        </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { authStore } from '@/store/auth';

// Import child components
import ProfileSidebar from '@/components/UserProfile/ProfileSidebar.vue';
import MyProfile from '@/components/UserProfile/MyProfile.vue';
import MyOrders from '@/components/UserProfile/MyOrders.vue';
import ChangePassword from '@/components/UserProfile/ChangePassword.vue';

const route = useRoute();
const router = useRouter();
const activeSection = ref('profile');

const setActiveSection = (section) => {
  activeSection.value = section;
  router.replace({ query: { section } });
};

onMounted(() => {
  if (route.query.section) {
    activeSection.value = route.query.section;
  }
  // Ensure user data is fresh
  if (!authStore.user) {
      authStore.fetchProfile();
  }
});
</script>

<style scoped>
.profile-page { padding: 20px; background-color: #f9f9f9; min-height: 80vh; }
.profile-container { display: flex; max-width: 1200px; margin: auto; gap: 30px; }
.profile-content { flex: 1; background: #fff; padding: 20px; border-radius: 8px; }
.welcome-header { margin-top: 0; }
.loading-state { text-align: center; padding: 50px; }
</style>