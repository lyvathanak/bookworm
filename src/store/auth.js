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
          const { data } = await apiClient.get('/users/profile');
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
    await apiClient.post('/register', userData);
    alert('Registration successful! Please sign in.');
    router.push({ name: 'signin' });
  } catch (error) {
    // This block is now more detailed for better debugging
    console.error("Full registration error object:", error); 
    
    if (error.response) {
      // The server responded with an error
      console.error("Backend response data:", error.response.data);
      const messages = error.response.data.message;
      const errorMessage = Array.isArray(messages) ? messages.join(', ') : messages;
      // If there's no good message, show the whole error data
      alert(`Registration failed: ${errorMessage || JSON.stringify(error.response.data)}`);
    } else {
      // The server never responded
      console.error("Network error:", error.message);
      alert('Registration failed. Cannot connect to the server. Please ensure the backend is running.');
    }
  } finally {
    this.isLoading = false;
  }
},

  // FIX: Logout only clears data. It does not redirect anymore.
  logout() {
    this.user = null;
    this.token = null;
    this.isAuthenticated = false;
    localStorage.removeItem('userAuthToken');
    localStorage.removeItem('user');
    // The redirect is now handled by the component that calls logout.
  },
});