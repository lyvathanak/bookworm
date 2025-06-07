<template>
  <div class="change-password">
    <h2>Change Password</h2>
    <form @submit.prevent="changePassword" class="password-form">
      <div class="form-group">
        <label>Current Password</label>
        <input 
          type="password" 
          v-model="passwordData.currentPassword" 
          class="form-input"
          required
        />
      </div>
      
      <div class="form-group">
        <label>New Password</label>
        <input 
          type="password" 
          v-model="passwordData.newPassword" 
          class="form-input"
          required
        />
      </div>

      <div class="form-group">
        <label>Confirm New Password</label>
        <input 
          type="password" 
          v-model="passwordData.confirmPassword" 
          class="form-input"
          required
        />
      </div>

      <button type="submit" class="save-button">Update Password</button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'ChangePassword',
  emits: ['change-password'],
  setup(props, { emit }) {
    const passwordData = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    const changePassword = () => {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert('New passwords do not match!')
        return
      }
      
      emit('change-password', passwordData)
      
      // Reset form
      passwordData.currentPassword = ''
      passwordData.newPassword = ''
      passwordData.confirmPassword = ''
    }

    return {
      passwordData,
      changePassword
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 24px;
  color: #666;
  margin-bottom: 25px;
}

.password-form {
  max-width: 500px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #0a1f44;
}

.save-button {
  background-color: #0a1f44;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #083a6b;
}
</style>