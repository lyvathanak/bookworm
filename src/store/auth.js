import { reactive } from 'vue'

export const authStore = reactive({
  user: null,
  isAuthenticated: false,
  orders: [],
  isLoading: false,

  // Initialize user data
  initUser(userData) {
    this.user = {
      id: userData.id || Date.now(),
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      contact: userData.contact || '',
      password: userData.password || '',
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

  // Update user data with image handling
  async updateUser(updates) {
    if (!this.user) return
    
    try {
      this.isLoading = true
      
      // Handle profile image upload
      if (updates.profileImage && updates.profileImage instanceof File) {
        updates.profileImage = await this.convertImageToBase64(updates.profileImage)
      }
      
      Object.assign(this.user, updates)
      this.saveToStorage()
      return true
    } catch (error) {
      console.error('Error updating user:', error)
      return false
    } finally {
      this.isLoading = false
    }
  },

  // Convert image file to base64
  convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
      reader.readAsDataURL(file)
    })
  },

  // Add order from checkout
  addOrder(orderData) {
    const order = {
      id: Date.now(),
      ...orderData,
      orderDate: new Date().toISOString(),
      status: 'Processing',
      trackingNumber: 'TRK' + Math.floor(Math.random() * 1000000)
    }
    this.orders.unshift(order) // Add to beginning of array
    this.saveToStorage()
    return order
  },

  // Save to localStorage
  saveToStorage() {
    try {
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('orders', JSON.stringify(this.orders))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  },

  // Load from localStorage
  loadFromStorage() {
    try {
      const savedUser = localStorage.getItem('user')
      const savedOrders = localStorage.getItem('orders')
      
      if (savedUser && savedUser !== 'null') {
        this.user = JSON.parse(savedUser)
        this.isAuthenticated = true
      }
      
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders)
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      this.clearStorage()
    }
  },

  // Clear storage
  clearStorage() {
    localStorage.removeItem('user')
    localStorage.removeItem('orders')
    this.user = null
    this.isAuthenticated = false
    this.orders = []
  },

  // Logout
  logout() {
    return new Promise((resolve) => {
      this.isLoading = true
      setTimeout(() => {
        this.clearStorage()
        this.isLoading = false
        console.log('User logged out successfully')
        resolve()
      }, 1000) // 1-second delay
    })
  },

  // Change password
  changePassword(passwordData) {
    if (!this.user || !passwordData.currentPassword || !passwordData.newPassword) {
      console.log('Password change failed. Invalid data.')
      return false
    }

    if (this.user.password !== passwordData.currentPassword) {
      console.log('Invalid current password.')
      return false
    }

    if (!this.validatePassword(passwordData.newPassword)) {
      console.log('New password does not meet requirements.')
      return false
    }

    this.user.password = passwordData.newPassword
    this.saveToStorage()
    console.log('Password changed successfully')
    return true
  },

  // Validate password strength
  validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return re.test(password)
  },

  // Get user initials for avatar placeholder
  getUserInitials() {
    if (!this.user) return ''
    const first = this.user.firstName?.charAt(0) || ''
    const last = this.user.lastName?.charAt(0) || ''
    return `${first}${last}`.toUpperCase()
  }
})

// Load initial state on import
authStore.loadFromStorage()