<template>
  <div class="profile-info">
    <div class="profile-header">
      <h2 class="profile-title">My Profile</h2>
      <button class="edit-button" @click="toggleEdit">
        <i class="fas fa-edit"></i>
      </button>
    </div>
    
    <div class="profile-form">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">First name</label>
          <input 
            type="text" 
            v-model="userFirstName" 
            class="form-input" 
            :readonly="!isEditing"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Last name</label>
          <input 
            type="text" 
            v-model="userLastName" 
            class="form-input" 
            :readonly="!isEditing"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input 
            type="email" 
            v-model="userEmail" 
            class="form-input" 
            :readonly="!isEditing"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Contact</label>
          <input 
            type="text" 
            v-model="userContact" 
            class="form-input" 
            :readonly="!isEditing"
          />
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">Birthdate</label>
        <div class="birthdate-row">
          <select v-model="birthDay" class="form-select" :disabled="!isEditing">
            <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
          </select>
          <select v-model="birthMonth" class="form-select" :disabled="!isEditing">
            <option v-for="(month, index) in months" :key="index" :value="month">{{ month }}</option>
          </select>
          <select v-model="birthYear" class="form-select" :disabled="!isEditing">
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">Gender</label>
        <div class="gender-options">
          <label class="radio-label">
            <input 
              type="radio" 
              v-model="userGender" 
              value="Male" 
              class="radio-input" 
              :disabled="!isEditing"
            />
            <span class="radio-text">Male</span>
          </label>
          <label class="radio-label">
            <input 
              type="radio" 
              v-model="userGender" 
              value="Female" 
              class="radio-input" 
              :disabled="!isEditing"
            />
            <span class="radio-text">Female</span>
          </label>
          <label class="radio-label">
            <input 
              type="radio" 
              v-model="userGender" 
              value="Other" 
              class="radio-input" 
              :disabled="!isEditing"
            />
            <span class="radio-text">Other</span>
          </label>
        </div>
      </div>
      
      <div v-if="isEditing" class="form-actions">
        <button @click="saveProfile" class="save-button">Save Changes</button>
        <button @click="cancelEdit" class="cancel-button">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const isEditing = ref(false)

// Initialize all reactive data
const userFirstName = ref('')
const userLastName = ref('')
const userEmail = ref('')
const userContact = ref('')
const userGender = ref('Male')
const birthDay = ref(18)
const birthMonth = ref('November')
const birthYear = ref(1998)

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const yearArray = []
  for (let i = currentYear; i >= currentYear - 50; i--) {
    yearArray.push(i)
  }
  return yearArray
})

onMounted(() => {
  loadUserData()
})

const loadUserData = () => {
  try {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      userFirstName.value = userData.firstName || 'Tooru'
      userLastName.value = userData.lastName || 'Kirishima'
      userEmail.value = userData.email || 'kirishmababy@gmail.com'
      userContact.value = userData.contact || '012345678'
      userGender.value = userData.gender || 'Male'
      
      if (userData.birthdate) {
        const date = new Date(userData.birthdate)
        birthDay.value = date.getDate()
        birthMonth.value = months[date.getMonth()]
        birthYear.value = date.getFullYear()
      }
    } else {
      // Fallback to individual localStorage items
      userFirstName.value = localStorage.getItem('userFirstName') || 'Tooru'
      userLastName.value = localStorage.getItem('userLastName') || 'Kirishima'
      userEmail.value = localStorage.getItem('userEmail') || 'kirishmababy@gmail.com'
      userContact.value = localStorage.getItem('userContact') || '012345678'
      userGender.value = localStorage.getItem('userGender') || 'Male'
      
      const storedBirthdate = localStorage.getItem('userBirthdate')
      if (storedBirthdate) {
        const date = new Date(storedBirthdate)
        birthDay.value = date.getDate()
        birthMonth.value = months[date.getMonth()]
        birthYear.value = date.getFullYear()
      }
    }
  } catch (error) {
    console.error('Error loading user data:', error)
    // Keep default values if error occurs
  }
}

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const saveProfile = () => {
  try {
    const birthdate = new Date(birthYear.value, months.indexOf(birthMonth.value), birthDay.value)
    
    // Update localStorage individual items
    localStorage.setItem('userFirstName', userFirstName.value)
    localStorage.setItem('userLastName', userLastName.value)
    localStorage.setItem('userEmail', userEmail.value)
    localStorage.setItem('userContact', userContact.value)
    localStorage.setItem('userGender', userGender.value)
    localStorage.setItem('userBirthdate', birthdate.toISOString().split('T')[0])
    
    // Update user object if it exists
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      const updatedUser = {
        ...userData,
        firstName: userFirstName.value,
        lastName: userLastName.value,
        email: userEmail.value,
        contact: userContact.value,
        gender: userGender.value,
        birthdate: birthdate.toISOString().split('T')[0]
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      // Also update in registered users list
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const userIndex = registeredUsers.findIndex(u => u.id === userData.id)
      if (userIndex !== -1) {
        registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...updatedUser }
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
      }
    }
    
    isEditing.value = false
    alert('Profile updated successfully!')
  } catch (error) {
    console.error('Error saving profile:', error)
    alert('Error saving profile. Please try again.')
  }
}

const cancelEdit = () => {
  loadUserData()
  isEditing.value = false
}
</script>

<style scoped>
.profile-info {
  background-color: #e5e7eb;
  padding: 35px;
  border-radius: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
}

.profile-title {
  font-size: 22px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.edit-button {
  background: none;
  border: none;
  color: #374151;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.edit-button:hover {
  background-color: #d1d5db;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  font-weight: 500;
  color: #374151;
  font-size: 16px;
}

.form-input,
.form-select {
  padding: 15px 20px;
  border: none;
  border-radius: 12px;
  background-color: white;
  color: #6b7280;
  font-size: 16px;
  outline: none;
  transition: box-shadow 0.2s;
}

.form-input:focus,
.form-select:focus {
  box-shadow: 0 0 0 2px #3b82f6;
}

.form-input[readonly] {
  background-color: white;
  color: #6b7280;
  cursor: default;
}

.birthdate-row {
  display: flex;
  gap: 20px;
}

.birthdate-row .form-select {
  flex: 1;
}

.gender-options {
  display: flex;
  gap: 30px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.radio-input {
  width: 20px;
  height: 20px;
  accent-color: #1e3a5f;
}

.radio-input:disabled {
  cursor: not-allowed;
}

.radio-text {
  color: #374151;
  font-size: 16px;
}

.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 20px;
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
}

.save-button:hover {
  background-color: #f59e0b;
}

.cancel-button {
  background-color: #6b7280;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-button:hover {
  background-color: #4b5563;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .birthdate-row {
    flex-direction: column;
  }
  
  .gender-options {
    flex-direction: column;
    gap: 15px;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>