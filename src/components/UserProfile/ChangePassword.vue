<template>
  <div class="change-password">
    <h2>Change Password</h2>
    <form @submit.prevent="handleChangePassword" class="password-form">
      <div class="form-group">
        <label>Current Password</label>
        <input 
          type="password" 
          v-model="form.currentPassword" 
          class="form-input"
          required
        />
      </div>
      
      <div class="form-group">
        <label>New Password</label>
        <input 
          type="password" 
          v-model="form.newPassword" 
          class="form-input"
          required
        />
      </div>

      <div class="form-group">
        <label>Confirm New Password</label>
        <input 
          type="password" 
          v-model="form.confirmPassword" 
          class="form-input"
          required
        />
      </div>

      <button type="submit" class="save-button">Update Password</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/services/api';

const form = ref({ currentPassword: '', newPassword: '', confirmPassword: '' });

const handleChangePassword = async () => {
  if (form.value.newPassword !== form.value.confirmPassword) {
    alert('New passwords do not match!');
    return;
  }

  try {
    await api.changePassword(form.value);
    alert('Password updated successfully!');
    form.value = { currentPassword: '', newPassword: '', confirmPassword: '' };
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to update password.');
  }
};
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