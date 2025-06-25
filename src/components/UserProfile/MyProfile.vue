<template>
  <div class="my-profile">
    <div class="section-header">
      <h2>My Profile</h2>
      <button @click="toggleEdit" class="edit-button">
        <i class="fas fa-edit"></i>
      </button>
    </div>
    
    <form @submit.prevent="updateProfile" class="profile-form">
      <div class="form-row">
        <div class="form-group">
          <label>First name</label>
          <input 
            type="text" 
            v-model="form.fname" 
            :disabled="!isEditing"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label>Last name</label>
          <input 
            type="text" 
            v-model="form.lname" 
            :disabled="!isEditing"
            class="form-input"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Email</label>
          <input 
            type="email" 
            v-model="form.email" 
            :disabled="true"
            class="form-input"
          />
        </div>
      </div>

      <button v-if="isEditing" type="submit" class="save-button">Save Changes</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const props = defineProps({ user: Object });
const isEditing = ref(false);
const form = ref({ fname: '', lname: '', email: '' });

onMounted(() => {
  if (props.user) {
    form.value.fname = props.user.fname;
    form.value.lname = props.user.lname;
    form.value.email = props.user.email;
  }
});

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  if (isEditing.value) {
    form.value.fname = props.user.fname;
    form.value.lname = props.user.lname;
    form.value.email = props.user.email;
  }
};

const updateProfile = async () => {
  try {
    await api.updateProfile({ fname: form.value.fname, lname: form.value.lname });
    alert('Profile updated!');
    isEditing.value = false;
  } catch (error) {
    alert('Failed to update profile.');
  }
};
</script>

<style scoped>
.my-profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.section-header h2 {
  font-size: 24px;
  color: #333;
  margin: 0;
  font-weight: 600;
}

.edit-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 5px;
  transition: color 0.2s;
}

.edit-button:hover {
  color: #0a1f44;
}

.profile-form {
  padding: 10px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
  font-size: 14px;
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

.form-input:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
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
  margin-top: 20px;
  width: 100%;
  max-width: 200px;
}

.save-button:hover {
  background-color: #083a6b;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .save-button {
    max-width: 100%;
  }
}
</style>