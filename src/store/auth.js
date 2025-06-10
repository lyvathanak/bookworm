import { reactive } from 'vue'

export const authStore = reactive({
  user: null,
  isAuthenticated: false,
  orders: [],

  // Initialize user data (used after successful login or signup)
  initUser(userData) {
    this.user = {
      id: userData.id || Date.now(),
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      contact: userData.contact || '',
      password: userData.password || '', // Ensure password is preserved
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
      
      if (savedUser && savedUser !== 'null') {
        this.user = JSON.parse(savedUser)
        this.isAuthenticated = true
      } else {
        this.user = null
        this.isAuthenticated = false
      }
      
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders)
      } else {
        this.orders = []
      }
    } catch (error) {
      console.error('Error loading user data from localStorage:', error)
      localStorage.removeItem('user')
      localStorage.removeItem('orders')
      this.user = null
      this.isAuthenticated = false
      this.orders = []
    }
  },

  // Logout - Clears state and localStorage with a delay
  logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.user = null
        this.isAuthenticated = false
        this.orders = []
        localStorage.removeItem('user')
        localStorage.removeItem('orders')
        console.log('User logged out. State and localStorage cleared.')
        resolve()
      }, 2000) // 2-second delay
    })
  },

  // Change password
  changePassword(passwordData) {
    if (this.user && passwordData.currentPassword && passwordData.newPassword) {
      if (this.user.password === passwordData.currentPassword) {
        if (this.validatePassword(passwordData.newPassword)) {
          this.user.password = passwordData.newPassword
          this.saveToStorage()
          console.log('Password changed successfully for user:', this.user.email)
          return true
        } else {
          console.log('New password does not meet requirements.')
          return false
        }
      } else {
        console.log('Invalid current password.')
        return false
      }
    }
    console.log('Password change failed. Invalid data.')
    return false
  },

  // Validate password
  validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return re.test(password)
  }
})

// Load initial state on import
authStore.loadFromStorage()