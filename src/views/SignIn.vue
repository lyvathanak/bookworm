<template>
  <div class="auth-container">
    <div class="logo-section">
      <img src="../assets/bookworm.png" alt="Bookworm Logo" class="logo" />
    </div>
    <form @submit.prevent="handleSignin" class="auth-form">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit" class="btn-primary" :disabled="authStore.isLoading">
        {{ authStore.isLoading ? 'Signing In...' : 'Sign in' }}
      </button>
    </form>
    <div class="divider"><span>OR</span></div>
    <p class="switch-auth">
      Don't have an Account? <router-link to="/auth/signup">Sign Up</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { authStore } from '@/store/auth';

const email = ref('');
const password = ref('');

const handleSignin = () => {
  if (!email.value || !password.value) {
    alert('Please enter email and password.');
    return;
  }
  authStore.login({ email: email.value, password: password.value });
};
</script>

<style scoped>
/* Copied from original signin component */
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