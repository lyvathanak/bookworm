<template>
  <div>
    <h3>Profile Information</h3>
    <form @submit.prevent="updateProfile">
        <div class="form-group">
            <label>First Name</label>
            <input type="text" v-model="form.fname" />
        </div>
         <div class="form-group">
            <label>Last Name</label>
            <input type="text" v-model="form.lname" />
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="form.email" disabled />
        </div>
        <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const props = defineProps({ user: Object });
const form = ref({ fname: '', lname: '', email: '' });

onMounted(() => {
  if (props.user) {
    form.value.fname = props.user.fname;
    form.value.lname = props.user.lname;
    form.value.email = props.user.email;
  }
});

const updateProfile = async () => {
    try {
        // This endpoint needs to be created in the backend to update the authenticated user
        await api.updateProfile({ fname: form.value.fname, lname: form.value.lname });
        alert('Profile updated!');
    } catch (error) {
        alert('Failed to update profile.');
    }
}
</script>

<style scoped>
.form-group { margin-bottom: 15px; }
label { display: block; margin-bottom: 5px; }
input { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
</style>