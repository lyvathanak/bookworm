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
      if (!this.isAuthenticated) return;
      try {
          const { data } = await apiClient.get('/users/profile');
          this.user = data;
          localStorage.setItem('user', JSON.stringify(this.user));
      } catch (error) {
          console.error("Failed to fetch profile:", error);
          this.logout(); // If profile fetch fails, the token is likely invalid
      }
  },
  
  async login(credentials) {
    this.isLoading = true;
    try {
      const { data } = await apiClient.post('/public/auth/login', credentials);
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
      // The API call is the same
      await apiClient.post('/register', userData);
      alert('Registration successful! Please sign in.');
      router.push({name: 'signin'});
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      // THIS IS THE CHANGE: Display the specific error from the backend
      const messages = error.response?.data?.message;
      const errorMessage = Array.isArray(messages) ? messages.join(', ') : messages;
      alert(errorMessage || 'Registration failed.');
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
    router.push({ name: 'signin' });
  },
});