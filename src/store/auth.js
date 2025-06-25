import { reactive } from 'vue';
import apiClient from '@/services/api';
import router from '@/router';

export const authStore = reactive({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  loadToken() {
    const token = localStorage.getItem('userAuthToken');
    if (token) {
      this.token = token;
      this.isAuthenticated = true;
    }
  },

  async fetchProfile() {
    if (!this.token) return;
    try {
      // FIX: Use the getProfile function from the apiClient service
      const { data } = await apiClient.getProfile();
      this.user = data;
      localStorage.setItem('user', JSON.stringify(this.user));
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      this.logout();
    }
  },

  async login(credentials) {
    this.isLoading = true;
    try {
      // FIX: Use the login function from the apiClient service
      const { data } = await apiClient.login(credentials);
      this.token = data.access_token;
      this.isAuthenticated = true;
      localStorage.setItem('userAuthToken', this.token);
      await this.fetchProfile();
      const redirectTo = router.currentRoute.value.query.redirect || '/';
      router.push(redirectTo);
    } catch (error) {
      console.error("Login failed:", error);
      alert('Login failed. Please check your credentials.');
    } finally {
      this.isLoading = false;
    }
  },

  async register(userData) {
    this.isLoading = true;
    try {
      // FIX: Use the register function from the apiClient service
      await apiClient.register(userData);
      alert('Registration successful! Please sign in.');
      router.push({ name: 'signin' });
    } catch (error) {
      console.error("Full registration error object:", error);
      if (error.response) {
        console.error("Backend response data:", error.response.data);
        const messages = error.response.data.message;
        const errorMessage = Array.isArray(messages) ? messages.join(', ') : messages;
        alert(`Registration failed: ${errorMessage || JSON.stringify(error.response.data)}`);
      } else {
        console.error("Network error:", error.message);
        alert('Registration failed. Cannot connect to the server. Please ensure the backend is running.');
      }
    } finally {
      this.isLoading = false;
    }
  },

  logout() {
    this.user = null;
    this.token = null;
    this.isAuthenticated = false;
    localStorage.removeItem('userAuthToken');
    localStorage.removeItem('user');
    // The redirect is now handled by the component that calls logout.
  },
});