import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
});
// Request interceptor to add the JWT token to every request
apiClient.interceptors.request.use(
  (config) => {
    // FIX: Read token directly from localStorage to break circular dependency
    const token = localStorage.getItem('userAuthToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// The rest of the file remains the same...
export default {
  // --- Auth ---
  login: (credentials) => apiClient.post('/public/auth/login', credentials),
  register: (data) => apiClient.post('/register', data),
  
  // --- Users ---
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.patch('/users/profile', data),
  changePassword: (data) => apiClient.patch('/users/change-password', data),

  // --- Books ---
  getBooks: (params) => apiClient.get('/books', { params }),
  getBookById: (id) => apiClient.get(`/books/${id}`),

  // --- Ratings ---
  getBookRatings: (bookId) => apiClient.get(`/books/${bookId}/ratings`),
  createRating: (bookId, ratingData) => apiClient.post(`/books/${bookId}/ratings`, ratingData),

  // --- Cart ---
  getCart: () => apiClient.get('/cart'),
  addToCart: (data) => apiClient.post('/cart/add', data),
  updateCartItem: (cartItemId, data) => apiClient.patch(`/cart/item/${cartItemId}`, data),
  removeCartItem: (cartItemId) => apiClient.delete(`/cart/item/${cartItemId}`),
  clearCart: () => apiClient.delete('/cart/clear'),

  // --- Authors ---
  getAuthorById: (id) => apiClient.get(`/authors/${id}`),
  followAuthor: (authorId) => apiClient.post(`/authors/${authorId}/follow`),
  unfollowAuthor: (authorId) => apiClient.delete(`/authors/${authorId}/unfollow`),

  // --- Wishlist ---
  getWishlist: () => apiClient.get('/wishlist'),
  addToWishlist: (data) => apiClient.post('/wishlist/add', data),
  removeFromWishlist: (bookId) => apiClient.delete(`/wishlist/item/${bookId}`),

  // --- Orders ---
  createOrder: (data) => apiClient.post('/orders/checkout', data),
  getMyOrders: () => apiClient.get('/orders/my-orders'),
  
  // --- Payment ---
  simulatePaymentSuccess: (orderId) => apiClient.get(`/payment/succeed/${orderId}`),
};