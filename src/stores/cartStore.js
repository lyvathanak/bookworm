import { ref, computed } from 'vue'

// Global cart state
const cartItems = ref([])

// Constants
const TAX_RATE = 0.08 // 8% tax
const SHIPPING_RATE = 5.99 // Fixed shipping cost

// Cart store composable
export function useCartStore() {
  // Computed properties
  const subtotal = computed(() => {
    return cartItems.value.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''))
      return sum + (price * item.quantity)
    }, 0)
  })

  const tax = computed(() => subtotal.value * TAX_RATE)
  
  const shipping = computed(() => cartItems.value.length > 0 ? SHIPPING_RATE : 0)
  
  const total = computed(() => subtotal.value + tax.value + shipping.value)
  
  const totalItems = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  // Methods
  const addToCart = (book) => {
    const existingItem = cartItems.value.find(item => item.id === book.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.coverImage,
        isbn: `ISBN${book.id}${Math.floor(Math.random() * 1000000)}`,
        quantity: 1
      })
    }
    
    // Save to localStorage
    saveCartToStorage()
    return true
  }

  const updateQuantity = (itemId, newQuantity) => {
    const quantity = parseInt(newQuantity)
    if (quantity < 1) return
    
    const item = cartItems.value.find(item => item.id === itemId)
    if (item) {
      item.quantity = quantity
      saveCartToStorage()
    }
  }

  const increaseQuantity = (itemId) => {
    const item = cartItems.value.find(item => item.id === itemId)
    if (item) {
      item.quantity++
      saveCartToStorage()
    }
  }

  const decreaseQuantity = (itemId) => {
    const item = cartItems.value.find(item => item.id === itemId)
    if (item && item.quantity > 1) {
      item.quantity--
      saveCartToStorage()
    }
  }

  const removeItem = (itemId) => {
    cartItems.value = cartItems.value.filter(item => item.id !== itemId)
    saveCartToStorage()
  }

  const clearCart = () => {
    cartItems.value = []
    saveCartToStorage()
  }

  const saveCartToStorage = () => {
    localStorage.setItem('bookworm-cart', JSON.stringify(cartItems.value))
  }

  const loadCartFromStorage = () => {
    const saved = localStorage.getItem('bookworm-cart')
    if (saved) {
      cartItems.value = JSON.parse(saved)
    }
  }

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : parseFloat(price.replace('$', '')).toFixed(2)
  }

  return {
    cartItems,
    subtotal,
    tax,
    shipping,
    total,
    totalItems,
    addToCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    saveCartToStorage,
    loadCartFromStorage,
    formatPrice
  }
}