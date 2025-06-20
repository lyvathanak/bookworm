import axios from 'axios';

const apiClient = axios.create({ baseURL: 'http://localhost:5000', headers: { 'Content-Type': 'application/json' } });

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) { config.headers['Authorization'] = `Bearer ${token}`; }
    return config;
}, (error) => Promise.reject(error));

apiClient.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/#/login';
    }
    return Promise.reject(error);
});

const api = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  getBooks: () => apiClient.get('/books'),
  createBook: (data) => apiClient.post('/books', data),
  updateBook: (id, data) => apiClient.patch(`/books/${id}`, data),
  deleteBook: (id) => apiClient.delete(`/books/${id}`),
  getAuthors: () => apiClient.get('/authors'),
  createAuthor: (data) => apiClient.post('/authors', data),
  updateAuthor: (id, data) => apiClient.patch(`/authors/${id}`, data),
  deleteAuthor: (id) => apiClient.delete(`/authors/${id}`),
  getOrders: () => apiClient.get('/admin/orders'),
  updateOrderStatus: (id, status) => apiClient.patch(`/admin/orders/${id}/status`, { status }),
  createOrder: (data) => apiClient.post('/admin/orders', data),
  getUsers: () => apiClient.get('/users'),
  updateUser(id, data) {
  return apiClient.patch(`/users/${id}`, data);
  },
  createUser(userData) {
  return apiClient.post('/users', userData);
  },
  getRatings: () => apiClient.get('/ratings'),
  deleteRating: (id) => apiClient.delete(`/ratings/${id}`),
  getDashboardStats: () => Promise.all([api.getOrders(), api.getUsers(), api.getBooks()]),
};

export default api;
