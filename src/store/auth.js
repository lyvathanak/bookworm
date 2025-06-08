import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(!!localStorage.getItem('authToken'));
  const error = ref(null);

  async function login(credentials) {
    try {
      error.value = null;
      const response = await api.login(credentials);
      const token = response.data.access_token;
      localStorage.setItem('authToken', token);
      isAuthenticated.value = true;
      return true;
    } catch (e) {
      error.value = e.response?.data?.message || 'Login failed.';
      return false;
    }
  }

  function logout() {
    localStorage.removeItem('authToken');
    isAuthenticated.value = false;
  }

  return { isAuthenticated, error, login, logout };
});
