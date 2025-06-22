<template>
  <div class="auth-container">
    <div class="logo-section">
      <img src="../assets/bookworm.png" alt="Bookworm Logo" class="logo" />
    </div>
    <form @submit.prevent="handleSignin" class="auth-form">
      <div class="form-group">
        <input type="email" v-model="email" placeholder="Email" required />
      </div>
      <div class="form-group password-group">
        <input :type="passwordFieldType" v-model="password" placeholder="Password" required />
        <button type="button" @click="togglePasswordVisibility" class="toggle-password">
          <i :class="['fas', passwordFieldType === 'password' ? 'fa-eye' : 'fa-eye-slash']"></i>
        </button>
      </div>
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
const passwordFieldType = ref('password');

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};

const handleSignin = () => {
  if (!email.value || !password.value) {
    alert('Please enter email and password.');
    return;
  }
  authStore.login({ email: email.value, password: password.value });
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  width: 100%;
  margin: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
}
.logo-section {
  margin-bottom: 1rem;
}
.logo {
  width: 150px;
}
.auth-form {
  width: 100%;
}
.form-group {
  margin-bottom: 1rem;
  width: 100%;
}
.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}
.password-group {
  position: relative;
}
.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}
.btn-primary {
  background-color: #0a1e3f;
  color: white;
  padding: 15px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
}
.btn-primary:disabled {
  background-color: #ccc;
}
.divider {
  display: flex;
  align-items: center;
  margin: 2rem 0 1rem;
  width: 100%;
  color: #444;
}
.divider::before, .divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ccc;
}
.divider span {
  padding: 0 1rem;
}
.switch-auth {
  margin-top: 1.5rem;
  color: #555;
}
.switch-auth a {
  font-weight: 700;
  color: #0a1e3f;
  text-decoration: none;
}
</style>