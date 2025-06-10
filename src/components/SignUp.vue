<template>
  <div class="auth-container">
    <button class="back-button" @click="$router.back()">←</button>

    <div class="logo-section">
      <img src="../assets/bookworm.png" alt="Bookworm Logo" class="logo" />
    </div>

    <form @submit.prevent="handleSignup" class="auth-form">
      <input type="text" v-model="firstName" placeholder="First Name" required />
      <input type="text" v-model="lastName" placeholder="Last Name" required />
      <input type="date" v-model="dob" placeholder="Date of Birth" required />
      
      <select v-model="gender" class="gender-select" required>
        <option value="" disabled>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <input type="email" v-model="email" placeholder="Email" required />
      <input type="text" v-model="contact" placeholder="Contact Number" required />
      <input type="password" v-model="password" placeholder="Password" required />

      <button type="submit" class="btn-primary" :disabled="isLoading">
        {{ isLoading ? 'Creating Account...' : 'Sign Up' }}
      </button>
    </form>

    <div class="divider"><span>OR</span></div>

    <div class="social-icons">
      <img src="../assets/google.png" alt="Google" @click="socialLogin('google')" />
      <img src="../assets/facebook.png" alt="Facebook" @click="socialLogin('facebook')" />
      <img src="../assets/apple-logo.png" alt="Apple" @click="socialLogin('apple')" />
    </div>

    <p class="switch-auth">
      Already have an account? <router-link to="/auth/signin">Sign in</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '@/store/auth'

const router = useRouter()
const isLoading = ref(false)

const firstName = ref('')
const lastName = ref('')
const dob = ref('')
const gender = ref('')
const email = ref('')
const contact = ref('')
const password = ref('')

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return re.test(password)
}

const handleSignup = async () => {
  isLoading.value = true
  
  try {
    if (!firstName.value || !lastName.value || !dob.value || !gender.value || !email.value || !contact.value || !password.value) {
      alert('Please fill in all fields.')
      return
    }

    if (!validateEmail(email.value)) {
      alert('Please enter a valid email address.')
      return
    }

    if (!validatePassword(password.value)) {
      alert('Password must be at least 8 characters long and include uppercase, lowercase, and a number.')
      return
    }

    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if (user.email === email.value) {
        alert('Email already in use!')
        return
      }
    }

    const userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      dob: dob.value,
      gender: gender.value.toLowerCase(),
      email: email.value,
      contact: contact.value,
      password: password.value
    }

    const response = await simulateSignUp(userData)
    
    if (response.success) {
      authStore.initUser(response.user)
      authStore.saveToStorage()
      console.log('Saved user data:', localStorage.getItem('user'))
      alert('Account created successfully! Please sign in to continue.')
      router.push('/auth/signin?redirect=/')
    } else {
      alert('Registration failed. Please try again.')
    }
  } catch (error) {
    console.error('Signup error:', error)
    alert('Registration failed. Please try again.')
  } finally {
    isLoading.value = false
  }
}

const simulateSignUp = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        contact: userData.contact,
        password: userData.password,
        profileImage: null,
        createdAt: new Date().toISOString(),
        dob: userData.dob,
        gender: userData.gender,
        address: {
          recipient: '',
          phoneNumber: '',
          city: '',
          detail: ''
        }
      }
      
      resolve({
        success: true,
        user: newUser
      })
    }, 1000)
  })
}

const socialLogin = (provider) => {
  alert(`Social login with ${provider} clicked`)
}
</script>

<style scoped>
.auth-container {
  max-width: 512px;
  margin: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  padding: 0 1rem;
  text-align: center;
}

.back-button {
  align-self: flex-start;
  font-size: 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  margin-bottom: 1rem;
  user-select: none;
  padding-left: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.logo-section {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 201px;
  height: auto;
  margin-bottom: 0.5rem;
}

.auth-form {
  width: 100%;
}

.auth-form input,
.auth-form select.gender-select {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.auth-form select.gender-select option[value=""][disabled] {
  color: #999;
}

.auth-form select.gender-select:focus {
  color: #000;
}

.auth-form input[type="date"] {
  color: #999;
}

.auth-form input[type="date"]:focus {
  color: #000;
}

.btn-primary {
  background-color: #0a1e3f;
  color: white;
  font-weight: 700;
  padding: 15px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background-color: #083a6b;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  margin: 2rem 0 1rem;
  font-weight: 600;
  color: #444;
  width: 100%;
}

.divider span {
  padding: 0 1rem;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ccc;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.social-icons img {
  width: 36px;
  height: 36px;
  cursor: pointer;
}

.switch-auth {
  margin-top: 1.5rem;
  font-style: italic;
  color: #555;
}

.switch-auth a {
  font-weight: 700;
  color: #0a1e3f;
  text-decoration: none;
}
</style>