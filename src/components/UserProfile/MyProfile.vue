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
            v-model="profileData.firstName" 
            :disabled="!isEditing"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label>Last name</label>
          <input 
            type="text" 
            v-model="profileData.lastName" 
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
            v-model="profileData.email" 
            :disabled="!isEditing"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label>Contact</label>
          <input 
            type="tel" 
            v-model="profileData.contact" 
            :disabled="!isEditing"
            class="form-input"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div class="form-group">
        <label>Birthdate</label>
        <div class="date-inputs">
          <select v-model="profileData.birthDay" :disabled="!isEditing" class="date-select">
            <option value="">Day</option>
            <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
          </select>
          <select v-model="profileData.birthMonth" :disabled="!isEditing" class="date-select">
            <option value="">Month</option>
            <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
          </select>
          <select v-model="profileData.birthYear" :disabled="!isEditing" class="date-select">
            <option value="">Year</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Gender</label>
        <div class="gender-options">
          <input type="radio" id="male" v-model="profileData.gender" value="male" :disabled="!isEditing">
          <label for="male" class="gender-label">Male</label>
          <input type="radio" id="female" v-model="profileData.gender" value="female" :disabled="!isEditing">
          <label for="female" class="gender-label">Female</label>
          <input type="radio" id="other" v-model="profileData.gender" value="other" :disabled="!isEditing">
          <label for="other" class="gender-label">Other</label>
        </div>
      </div>

      <button v-if="isEditing" type="submit" class="save-button">Save Changes</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const isEditing = ref(false)

const profileData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  contact: '',
  birthDay: '',
  birthMonth: '',
  birthYear: '',
  gender: ''
})

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = currentYear; year >= currentYear - 100; year--) {
    years.push(year)
  }
  return years
})

const loadUserData = () => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    const user = JSON.parse(savedUser)
    profileData.firstName = user.firstName || ''
    profileData.lastName = user.lastName || ''
    profileData.email = user.email || ''
    profileData.contact = user.contact || ''
    profileData.gender = user.gender || ''
    if (user.dob) {
      const date = new Date(user.dob)
      if (!isNaN(date.getTime())) {
        profileData.birthDay = date.getDate()
        profileData.birthMonth = date.getMonth() + 1
        profileData.birthYear = date.getFullYear()
      }
    }
  }
}

const toggleEdit = () => {
  isEditing.value = !isEditing.value
  if (isEditing.value) {
    loadUserData()
  }
}

const updateProfile = () => {
  let dobString = null
  if (profileData.birthDay && profileData.birthMonth && profileData.birthYear) {
    dobString = `${profileData.birthYear}-${profileData.birthMonth.toString().padStart(2, '0')}-${profileData.birthDay.toString().padStart(2, '0')}`
  }

  const updatedUser = {
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: profileData.email,
    contact: profileData.contact,
    gender: profileData.gender,
    dob: dobString
  }

  localStorage.setItem('user', JSON.stringify(updatedUser))
  isEditing.value = false
  alert('Profile updated successfully!')
}

onMounted(() => {
  loadUserData()
})
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

.date-inputs {
  display: flex;
  gap: 10px;
}

.date-select {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
}

.date-select:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.gender-options {
  display: flex;
  gap: 10px;
}

.gender-label {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.gender-label:hover:not(:disabled) {
  border-color: #0a1f44;
  color: #0a1f44;
}

input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + .gender-label {
  background-color: #0a1f44;
  color: white;
  border-color: #0a1f44;
}

input[type="radio"]:disabled + .gender-label {
  cursor: not-allowed;
  opacity: 0.6;
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
  
  .gender-options {
    flex-direction: column;
  }
  
  .date-inputs {
    flex-direction: column;
  }
  
  .save-button {
    max-width: 100%;
  }
}
</style>