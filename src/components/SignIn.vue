<template>
  <div class="auth-container">
    <button class="back-button" @click="$router.back()">←</button>

    <div class="logo-section">
      <img src="../assets/bookworm.png" alt="Bookworm Logo" class="logo" />
    </div>

    <form @submit.prevent="handleSignin" class="auth-form">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />

      <div class="options-row">
        <label>
          <input type="checkbox" v-model="rememberMe" />Remember me
        </label>
        <router-link to="/forgot-password" class="forgot-password">Forgot password?</router-link>
      </div>

      <button type="submit" class="btn-primary" :disabled="isLoading">
        {{ isLoading ? 'Signing In...' : 'Sign in' }}
      </button>
    </form>

    <div class="divider"><span>OR</span></div>

    <div class="social-icons">
      <img src="../assets/google.png" alt="Google" @click="socialLogin('google')" />
      <img src="../assets/facebook.png" alt="Facebook" @click="socialLogin('facebook')" />
      <img src="../assets/apple-logo.png" alt="Apple" @click="socialLogin('apple')" />
    </div>

    <p class="switch-auth">
      Don't have an Account? <router-link to="/auth/signup">Sign Up</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authStore } from '@/store/auth'

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return re.test(password)
}

onMounted(() => {
  authStore.loadFromStorage() // Ensure data is loaded on mount
})

const handleSignin = async () => {
  if (!email.value || !password.value) {
    alert('Please enter email and password.')
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

  isLoading.value = true
  try {
    const response = await simulateSignIn({
      email: email.value,
      password: password.value
    })
    
    console.log('Signin response:', response)
    if (response.success) {
      authStore.initUser(response.user)
      authStore.saveToStorage()
      alert('Sign in successful!')
      const redirectTo = route.query.redirect || '/home'
      router.push(redirectTo)
    } else {
      alert('Invalid credentials')
    }
  } catch (error) {
    console.error('Sign in error:', error)
    alert('Sign in failed. Please try again.')
  } finally {
    isLoading.value = false
    console.log('Auth state after signin:', authStore.isAuthenticated, authStore.user)
  }
}

const simulateSignIn = async (credentials) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const user = JSON.parse(storedUser)
        console.log('Attempted login - Email:', credentials.email, 'Password:', credentials.password)
        console.log('Stored user:', user)
        if (user.email === credentials.email && user.password === credentials.password) {
          resolve({
            success: true,
            user: user
          })
        } else {
          resolve({
            success: false,
            user: null
          })
        }
      } else {
        resolve({
          success: false,
          user: null
        })
      }
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
  padding-top: 0;
  margin-top: 0;
}

.logo {
  width: 201px;
  height: auto;
  margin-bottom: 0.5rem;
}

.auth-form {
  width: 100%;
}

.auth-form input {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
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

.options-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: #555;
  align-items: center;
}

.options-row label {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.options-row input[type="checkbox"]{
  margin: 0;
  vertical-align: middle;
}

.forgot-password {
  color: #0a1e3f;
  text-decoration: none;
  font-weight: 500;
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