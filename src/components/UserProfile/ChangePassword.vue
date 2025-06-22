<template>
    <div>
        <h3>Change Password</h3>
        <form @submit.prevent="handleChangePassword">
            <div class="form-group">
                <label>Current Password</label>
                <input type="password" v-model="form.currentPassword" required />
            </div>
            <div class="form-group">
                <label>New Password</label>
                <input type="password" v-model="form.newPassword" required />
            </div>
            <button type="submit">Update Password</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/services/api';

const form = ref({ currentPassword: '', newPassword: '' });

const handleChangePassword = async () => {
    try {
        await api.changePassword(form.value);
        alert('Password updated successfully!');
        form.value = { currentPassword: '', newPassword: '' }; // Clear form
    } catch (error) {
        alert(error.response?.data?.message || 'Failed to update password.');
    }
}
</script>

<style scoped>
.form-group { margin-bottom: 15px; }
label { display: block; margin-bottom: 5px; }
input { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
</style>