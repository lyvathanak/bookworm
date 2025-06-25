import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(!!localStorage.getItem('authToken'));
  const error = ref(null);

  // This function is now simplified to only handle one type of login.
  async function login(credentials) {
    try {
      error.value = null;
      // It now correctly calls the single `api.login` method.
      const response = await api.login(credentials);
      
      const token = response.data.access_token;
      localStorage.setItem('authToken', token);
      isAuthenticated.value = true;
      return true;
    } catch (e) {
      // This handles the "Login failed" and "User is not an administrator" messages from the backend.
      error.value = e.response?.data?.message || 'Login failed due to a network error.';
      localStorage.removeItem('authToken');
      isAuthenticated.value = false;
      return false;
    }
  }

  function logout() {
    localStorage.removeItem('authToken');
    isAuthenticated.value = false;
    // Redirect to login page on logout for a better user experience.
    window.location.href = '/';
  }

  return { isAuthenticated, error, login, logout };
});