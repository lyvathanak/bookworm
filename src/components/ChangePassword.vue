<template>
  <div class="change-password-container">
    <h1 class="change-password-title">Change Password</h1>
    <form @submit.prevent="changePassword" class="password-form">
      <div class="form-group">
        <label class="form-label">Current Password</label>
        <input v-model="currentPassword" type="password" class="form-input" placeholder="Enter current password" required />
      </div>
      <div class="form-group">
        <label class="form-label">New Password</label>
        <input v-model="newPassword" type="password" class="form-input" placeholder="Enter new password" required />
      </div>
      <div class="form-group">
        <label class="form-label">Confirm New Password</label>
        <input v-model="confirmPassword" type="password" class="form-input" placeholder="Confirm new password" required />
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
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    // In a real app, send to backend to update password
    localStorage.setItem('passwordChanged', 'true') // Simulate success
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
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.change-password-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.password-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
}

.form-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.save-button {
  background-color: #e6d430;
  color: #0a1f44;
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #d6c420;
}

.save-button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.error-message {
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .change-password-title {
    font-size: 20px;
  }

  .password-form {
    padding: 15px;
  }
}
</style>