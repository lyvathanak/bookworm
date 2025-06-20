<template>
  <div class="profile-sidebar">
    <!-- User Info Section with clickable avatar -->
    <div class="user-info">
      <div class="user-avatar" @click="triggerImageUpload">
        <img
          v-if="user?.profileImage"
          :src="user.profileImage"
          :alt="`${user.firstName}'s profile picture`"
          class="avatar-image"
        />
        <div v-else class="avatar-placeholder">
          {{ userInitials }}
        </div>
        <div class="avatar-overlay">
          <i class="fas fa-camera"></i>
          <span>Change Photo</span>
        </div>
      </div>
      <div class="user-details">
        <h3>{{ user?.firstName }} {{ user?.lastName }}</h3>
        <p>Member since {{ formatDate(user?.createdAt) }}</p>
      </div>
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        class="file-input"
        @change="handleImageUpload"
      />
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <button
        v-for="item in navItems"
        :key="item.section"
        @click="setSection(item.section)"
        :class="[
          'nav-item',
          { active: activeSection === item.section },
          { [item.section]: true }
        ]"
        :aria-current="activeSection === item.section ? 'page' : null"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </button>

      <button @click="handleLogout" class="nav-item logout">
        <i class="fas fa-sign-out-alt"></i>
        <span>Log out</span>
      </button>
    </nav>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    activeSection: {
      type: String,
      default: 'profile'
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['set-section', 'logout', 'upload-image'],
  setup(props, { emit }) {
    const fileInput = ref(null)

    const navItems = [
      { section: 'profile', icon: 'fas fa-user', label: 'My Profile' },
      { section: 'orders', icon: 'fas fa-shopping-bag', label: 'My Orders' },
      { section: 'wishlist', icon: 'fas fa-heart', label: 'My Wishlist' },
      { section: 'address', icon: 'fas fa-map-marker-alt', label: 'My Address' },
      { section: 'password', icon: 'fas fa-key', label: 'Change Password' }
    ]

    const userInitials = computed(() => {
      if (!props.user) return ''
      const first = props.user.firstName?.charAt(0) || ''
      const last = props.user.lastName?.charAt(0) || ''
      return `${first}${last}`.toUpperCase()
    })

    const setSection = (section) => {
      if (props.isLoading) return
      emit('set-section', section)
    }

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })
    }

    const triggerImageUpload = () => {
      if (props.isLoading) return
      fileInput.value.click()
    }

    const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (!file) return

      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, etc.)')
        return
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('Image size must be less than 2MB')
        return
      }

      emit('upload-image', file)
      event.target.value = ''
    }

    const handleLogout = () => {
      if (props.isLoading) return
      if (confirm('Are you sure you want to log out?')) {
        emit('logout')
      }
    }

    return {
      fileInput,
      navItems,
      userInitials,
      setSection,
      formatDate,
      triggerImageUpload,
      handleImageUpload,
      handleLogout
    }
  }
}
</script>

<style scoped>
.profile-sidebar {
  width: 280px;
  background: #0a1f44;
  color: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.user-info {
  padding: 2rem 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.user-avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.user-avatar:hover {
  transform: scale(1.05);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #4a90e2, #0a1f44);
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-overlay i {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.avatar-overlay span {
  font-size: 0.8rem;
}

.user-avatar:hover .avatar-overlay {
  opacity: 1;
}

.user-details h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
}

.user-details p {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
}

.file-input {
  display: none;
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
}

.nav-item {
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: none;
  border: none;
  color: white;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  transition: all 0.2s ease;
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

.nav-item i {
  width: 1.25rem;
  text-align: center;
  font-size: 1rem;
}

.nav-item.logout {
  margin-top: auto;
  color: #ff6b6b;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-item.logout:hover {
  background: rgba(255, 107, 107, 0.1);
  border-left-color: #ff6b6b;
}

@media (max-width: 768px) {
  .profile-sidebar {
    width: 100%;
    min-height: auto;
  }

  .user-info {
    padding: 1.5rem 1rem;
  }

  .user-avatar {
    width: 80px;
    height: 80px;
  }

  .sidebar-nav {
    flex-direction: row;
    overflow-x: auto;
    padding: 0.5rem 0;
    scrollbar-width: none; /* Firefox */
  }

  .sidebar-nav::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }

  .nav-item {
    flex: 0 0 auto;
    padding: 0.75rem 1rem;
    border-left: none;
    border-bottom: 3px solid transparent;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    font-size: 0.875rem;
  }

  .nav-item.active {
    border-left: none;
    border-bottom-color: #4a90e2;
  }

  .nav-item i {
    font-size: 1.25rem;
  }

  .nav-item.logout {
    margin-top: 0;
    border-top: none;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>