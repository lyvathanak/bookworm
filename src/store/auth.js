import { reactive } from 'vue'

export const authStore = reactive({
  user: null,
  isAuthenticated: false,
  orders: [],
  
  // Initialize user data
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
      
      if (savedUser) {
        this.user = JSON.parse(savedUser)
        this.isAuthenticated = true
      }
      
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    }
  },

  // Logout
  logout() {
    this.user = null
    this.isAuthenticated = false
    this.orders = []
    localStorage.removeItem('user')
    localStorage.removeItem('orders')
  },

  // Change password
  changePassword(passwordData) {
    // In real app, this would validate with backend
    if (this.user && passwordData.currentPassword && passwordData.newPassword) {
      // Simulate password change
      console.log('Password changed for user:', this.user.email)
      console.log('Current password verified:', passwordData.currentPassword)
      console.log('New password set:', passwordData.newPassword)
      return true
    }
    return false
  }
})

// Initialize on app start
authStore.loadFromStorage()