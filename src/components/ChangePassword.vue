<template>
  <div class="change-password-container">
    <h2 class="change-password-title">Change Password</h2>
    
    <form @submit.prevent="changePassword" class="password-form">
      <div class="form-group">
        <label class="form-label">Current Password</label>
        <input 
          v-model="currentPassword" 
          type="password" 
          class="form-input" 
          placeholder="Enter current password" 
          required 
        />
      </div>
      
      <div class="form-group">
        <label class="form-label">New Password</label>
        <input 
          v-model="newPassword" 
          type="password" 
          class="form-input" 
          placeholder="Enter new password" 
          required 
        />
      </div>
      
      <div class="form-group">
        <label class="form-label">Confirm New Password</label>
        <input 
          v-model="confirmPassword" 
          type="password" 
          class="form-input" 
          placeholder="Confirm new password" 
          required 
        />
      </div>
      
      <button type="submit" class="save-button" :disabled="isLoading">
        {{ isLoading ? 'Saving...' : 'Change Password' }}
      </button>
      
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const changePassword = async () => {
  errorMessage.value = ''
  
  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    errorMessage.value = 'All fields are required.'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'New passwords do not match.'
    return
  }

  isLoading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    localStorage.setItem('passwordChanged', 'true')
    alert('Password changed successfully!')
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (error) {
    errorMessage.value = 'Failed to change password. Please try again.'
    console.error('Password change error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.change-password-container {
  background-color: #e5e7eb;
  padding: 30px;
  border-radius: 16px;
  max-width: 800px;
  margin: 0 auto;
}

.change-password-title {
  font-size: 20px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 30px 0;
}

.password-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-weight: 500;
  color: #374151;
  font-size: 14px;
}

.form-input {
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background-color: white;
  color: #374151;
  font-size: 14px;
  outline: none;
  transition: box-shadow 0.2s;
}

.form-input:focus {
  box-shadow: 0 0 0 2px #3b82f6;
}

.save-button {
  background-color: #fbbf24;
  color: #1e3a5f;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}

.save-button:hover {
  background-color: #f59e0b;
}

.save-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.error-message {
  color: #ef4444;
  font-size: 12px;
  margin-top: 5px;
}
</style>