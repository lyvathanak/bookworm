import axios from 'axios';

// Use environment variable for backend API URL (VITE_API_URL)
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor to add the JWT token to every outgoing request.
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));


// Interceptor to handle 401 Unauthorized errors globally.
// If a token is expired or invalid, it removes the token and redirects to the login page.
apiClient.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      // This ensures a clean redirect for the admin portal
      window.location.href = '/'; 
    }
    return Promise.reject(error);
});


// --- The Complete and Correct API Definition ---
const api = {
  // Auth - This now correctly points to the single admin login endpoint.
  login: (credentials) => apiClient.post('/auth/login', credentials),

  // Books (Products)
  getBooks: () => apiClient.get('/books'),
  createBook: (data) => apiClient.post('/books', data),
  updateBook: (id, data) => apiClient.patch(`/books/${id}`, data),
  deleteBook: (id) => apiClient.delete(`/books/${id}`),
  uploadBookImage: (id, formData) => apiClient.post(`/books/${id}/upload-image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // Authors
  getAuthors: () => apiClient.get('/authors'),
  createAuthor: (data) => apiClient.post('/authors', data),
  updateAuthor: (id, data) => apiClient.patch(`/authors/${id}`, data),
  deleteAuthor: (id) => apiClient.delete(`/authors/${id}`),
  uploadAuthorAvatar: (id, formData) => apiClient.post(`/authors/${id}/upload-avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Orders
  getOrders: () => apiClient.get('/admin/orders'),
  updateOrderStatus: (id, status) => apiClient.patch(`/admin/orders/${id}/status`, { status }),
  
  // Users
  getUsers: () => apiClient.get('/users'),
  updateUser: (id, data) => apiClient.patch(`/users/${id}`, data),
  createUser: (userData) => apiClient.post('/users', userData),

  // Ratings
  getRatings: () => apiClient.get('/ratings'),
  deleteRating: (id) => apiClient.delete(`/ratings/${id}`),
  updateRatingStatus: (id, status) => apiClient.patch(`/ratings/${id}/status`, { status }),

  // Dashboard
  getDashboardStats: () => apiClient.get('/admin/dashboard/stats'),
  getSalesData: () => apiClient.get('/admin/dashboard/sales-over-time'),
  
  // Email
  sendEmail: (data) => apiClient.post('/admin/email/send', data),
};

export default api;