<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo-container">
        <img src="@/assets/BOOK (2).png" alt="Bookworm Logo" class="logo">
        <span class="logo-text">BOOK WORM</span>
      </div>
      <h2>Admin Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input type="email" v-model="email" placeholder="Email" required>
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="Password" required>
        </div>
        <p v-if="error" class="error-message">{{ error }}</p>
        <button type="submit" class="login-button">Log In</button>
      </form>
       <p class="demo-creds">Demo: admin@example.com / password</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const error = ref('');

    const handleLogin = async () => {
      const success = await store.dispatch('auth/login', {
        email: email.value,
        password: password.value
      });

      if (success) {
        router.push('/');
      } else {
        error.value = 'Invalid email or password.';
      }
    };

    return { email, password, handleLogin, error };
  }
};
</script>

<style scoped>
/* Styles remain the same */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #0d1b2a;
}
.login-box {
  background: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
}
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.logo {
  height: 50px;
  margin-right: 10px;
}
.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1b263b;
}
h2 {
  margin-bottom: 1.5rem;
  color: #4a4a4a;
}
.input-group {
  margin-bottom: 1.5rem;
}
input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}
.login-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: #415a77;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
.login-button:hover {
  background-color: #1b263b;
}
.error-message {
  color: red;
  margin-bottom: 1rem;
}
.demo-creds {
    margin-top: 1rem;
    color: #777;
    font-size: 0.9rem;
}
</style>