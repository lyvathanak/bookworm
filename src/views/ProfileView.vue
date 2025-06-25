<template>
  <div class="profile-page">
    <div v-if="!authStore.user" class="loading-state">Loading Profile...</div>
    <div v-else class="profile-container">
      <ProfileSidebar
        :user="authStore.user"
        :activeSection="activeSection"
        @set-section="setActiveSection"
        @logout="handleLogout"
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

        <div v-if="activeSection === 'wishlist'">
          <h3>My Wishlist</h3>
          <div v-if="wishlistStore.isLoading">Loading wishlist...</div>
          <div v-else-if="wishlistStore.items.length === 0" class="empty-wishlist">
            <h2>Your wishlist is empty.</h2>
          </div>
          <div v-else class="wishlist-grid">
            <div class="wishlist-item" v-for="item in wishlistStore.items" :key="item.wishid">
              <img v-if="item.book.image" :src="item.book.image" :alt="item.book.title" class="wishlist-book-cover"/>
              <div v-else class="wishlist-book-cover-placeholder">No Image</div>
              <div class="wishlist-book-details">
                <h4 class="book-title">{{ item.book.title }}</h4>
                <p class="book-author">{{ item.book.author.author_name }}</p>
                <span class="book-price">${{ item.book.price.toFixed(2) }}</span>
                <div class="book-actions">
                   <button class="remove-btn" @click="wishlistStore.toggleWishlist(item.book)" title="Remove">Remove from Wishlist</button>
                   <button class="add-to-cart-btn" @click="cartStore.addItem(item.book.bid, 1)">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { authStore } from '@/store/auth';
import { wishlistStore } from '@/store/wishlist';
import { cartStore } from '@/store/cart';

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

const handleLogout = () => {
    authStore.logout();
    router.push('/');
}

onMounted(() => {
  if (route.query.section) {
    activeSection.value = route.query.section;
  }
  // Ensure user data and wishlist data are fresh
  if (!authStore.user) {
      authStore.fetchProfile();
  }
  wishlistStore.fetchWishlist();
});
</script>

<style scoped>
.profile-page { padding: 20px; background-color: #f9f9f9; min-height: 80vh; }
.profile-container { display: flex; max-width: 1200px; margin: auto; gap: 30px; }
.profile-content { flex: 1; background: #fff; padding: 20px; border-radius: 8px; }
.welcome-header { margin-top: 0; }
.loading-state { text-align: center; padding: 50px; }

.wishlist-grid { display: grid; grid-template-columns: 1fr; gap: 15px; }
.wishlist-item { display: flex; gap: 15px; border: 1px solid #eee; padding: 10px; border-radius: 8px; }
.wishlist-book-cover { width: 80px; height: 120px; object-fit: contain; }
.wishlist-book-cover-placeholder {
  width: 80px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #aaa;
  font-size: 0.8rem;
  text-align: center;
  border-radius: 4px;
}
.wishlist-book-details { display: flex; flex-direction: column; }
.book-title { margin: 0 0 5px; }
.book-author { font-size: 0.9em; color: #666; margin: 0 0 10px; }
.book-price { font-weight: bold; margin-bottom: 10px; }
.book-actions { margin-top: auto; display: flex; gap: 10px; }
.remove-btn, .add-to-cart-btn { border: none; padding: 8px 12px; cursor: pointer; border-radius: 4px; font-size: 0.8rem; }
.remove-btn { background-color: #f5f5f5; }
.add-to-cart-btn { background-color: #e6d430; }
</style>