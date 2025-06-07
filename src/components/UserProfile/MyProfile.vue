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
          <label class="radio-option" :class="{ selected: profileData.gender === 'male' }">
            <input 
              type="radio" 
              value="male" 
              v-model="profileData.gender" 
              :disabled="!isEditing"
            />
            <span>Male</span>
          </label>
          <label class="radio-option" :class="{ selected: profileData.gender === 'female' }">
            <input 
              type="radio" 
              value="female" 
              v-model="profileData.gender" 
              :disabled="!isEditing"
            />
            <span>Female</span>
          </label>
          <label class="radio-option" :class="{ selected: profileData.gender === 'other' }">
            <input 
              type="radio" 
              value="other" 
              v-model="profileData.gender" 
              :disabled="!isEditing"
            />
            <span>Other</span>
          </label>
        </div>
      </div>

      <button v-if="isEditing" type="submit" class="save-button">Save Changes</button>
    </form>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'

export default {
  name: 'MyProfile',
  props: {
    user: Object
  },
  emits: ['update-user'],
  setup(props, { emit }) {
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

    const toggleEdit = () => {
      isEditing.value = !isEditing.value
    }

    const updateProfile = () => {
      emit('update-user', profileData)
      isEditing.value = false
      alert('Profile updated successfully!')
    }

    onMounted(() => {
      if (props.user) {
        Object.assign(profileData, props.user)
        if (props.user.dob) {
          const date = new Date(props.user.dob)
          profileData.birthDay = date.getDate()
          profileData.birthMonth = date.getMonth() + 1
          profileData.birthYear = date.getFullYear()
        }
      }
    })

    return {
      isEditing,
      profileData,
      months,
      years,
      toggleEdit,
      updateProfile
    }
  }
}
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.section-header h2 {
  font-size: 24px;
  color: #666;
  margin: 0;
}

.edit-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 5px;
}

.edit-button:hover {
  color: #333;
}

.profile-form {
  max-width: 800px;
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
}

.gender-options {
  display: flex;
  gap: 20px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.radio-option.selected {
  background-color: #0a1f44;
  color: white;
  border-color: #0a1f44;
}

.radio-option input[type="radio"] {
  margin: 0;
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

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .gender-options {
    flex-direction: column;
    gap: 10px;
  }
}
</style>