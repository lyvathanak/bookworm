import { reactive } from 'vue'

export const authStore = reactive({
  user: null,
  isAuthenticated: false,
  orders: [],
  
  // Initialize user data (used after successful login)
  initUser(userData) {
    this.user = {
      id: userData.id || Date.now(),
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      contact: userData.contact || '',
      profileImage: userData.profileImage || null,
      createdAt: userData.createdAt || new Date().toISOString(),
      dob: userData.dob || null,
      gender: userData.gender || '',
      address: userData.address || {
        recipient: '',
        phoneNumber: '',
        city: '',
        detail: ''
      }
    }
    this.isAuthenticated = true
    this.saveToStorage()
  },

  // Update user data
  updateUser(updates) {
    if (this.user) {
      Object.assign(this.user, updates)
      this.saveToStorage()
    }
  },

  // Add order from checkout
  addOrder(orderData) {
    const order = {
      id: Date.now(),
      ...orderData,
      orderDate: new Date().toISOString(),
      status: 'Order in Progress'
    }
    this.orders.push(order)
    this.saveToStorage()
  },

  // Save to localStorage
  saveToStorage() {
    localStorage.setItem('user', JSON.stringify(this.user))
    localStorage.setItem('orders', JSON.stringify(this.orders))
  },

  // Load from localStorage
  loadFromStorage() {
    try {
      const savedUser = localStorage.getItem('user')
      const savedOrders = localStorage.getItem('orders')
      
      if (savedUser && savedUser !== 'null') { // Ensure 'null' string isn't parsed
        this.user = JSON.parse(savedUser)
        this.isAuthenticated = true
      } else {
        this.user = null;
        this.isAuthenticated = false;
      }
      
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders)
      } else {
        this.orders = [];
      }
    } catch (error) {
      console.error('Error loading user data from localStorage:', error)
      // Clear potentially corrupted data if parsing fails
      localStorage.removeItem('user');
      localStorage.removeItem('orders');
      this.user = null;
      this.isAuthenticated = false;
      this.orders = [];
    }
  },

  // Logout - Clears state and localStorage
  logout() {
    this.user = null
    this.isAuthenticated = false
    this.orders = []
    localStorage.removeItem('user')
    localStorage.removeItem('orders')
    console.log('User logged out. State and localStorage cleared.')
  },

  // Change password (simulated)
  changePassword(passwordData) {
    // In a real app, this would involve an API call to NestJS backend
    if (this.user && passwordData.currentPassword && passwordData.newPassword) {
      // Simulate password change success
      console.log('Password change initiated for user:', this.user.email);
      console.log('Current password (simulated) verified.');
      console.log('New password (simulated) set.');
      return true; // Simulate success
    }
    console.log('Password change failed (simulated). Invalid data or user not found.');
    return false; // Simulate failure
  }
});

// Initialize on app start: Load state from localStorage immediately when the store is imported
authStore.loadFromStorage();
