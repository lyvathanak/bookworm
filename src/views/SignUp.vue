<template>
  <div class="auth-container">
    <div class="logo-section">
      <img src="../assets/bookworm.png" alt="Bookworm Logo" class="logo" />
    </div>
    <form @submit.prevent="handleSignup" class="auth-form">
      <input type="text" v-model="fname" placeholder="First Name" required />
      <input type="text" v-model="lname" placeholder="Last Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit" class="btn-primary" :disabled="authStore.isLoading">
        {{ authStore.isLoading ? 'Creating Account...' : 'Sign Up' }}
      </button>
    </form>
    <div class="divider"><span>OR</span></div>
    <p class="switch-auth">
      Already have an account? <router-link to="/auth/signin">Sign in</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { authStore } from '@/store/auth';

const fname = ref('');
const lname = ref('');
const email = ref('');
const password = ref('');

const handleSignup = () => {
  // --- START: Frontend Validation ---
  if (!fname.value || !lname.value || !email.value || !password.value) {
    alert('Please fill in all fields.');
    return;
  }
  if (password.value.length < 8) {
    alert('Password must be at least 8 characters long.');
    return;
  }

  const userData = {
    fname: fname.value,
    lname: lname.value,
    email: email.value,
    password: password.value,
  };
  // The store will now handle loading states and detailed error alerts
  authStore.register(userData);
};
</script>

<style scoped>
.auth-container { max-width: 400px; width: 100%; padding: 2rem; }

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