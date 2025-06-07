// src/store/index.js

import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Your NestJS backend URL

const authModule = {
  namespaced: true,
  state: {
    isAuthenticated: !!localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token'),
  },
  mutations: {
    SET_AUTHENTICATION(state, status) {
      state.isAuthenticated = status;
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        // This is a placeholder for a real /auth/login endpoint
        // For now, we simulate the old logic but prepare for the API
        if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
          const user = { name: 'Admin User', email: 'admin@example.com' };
          const token = 'fake-jwt-token'; // In a real app, this would come from the server
          commit('SET_AUTHENTICATION', true);
          commit('SET_USER', user);
          commit('SET_TOKEN', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          return true;
        }
        return false;
      } catch (error) {
        console.error('Login failed:', error);
        return false;
      }
    },
    logout({ commit }) {
      commit('LOGOUT');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
  },
};

export default createStore({
  modules: {
    auth: authModule,
  },
  state: {
    authors: [],
    books: [],
    users: [],
    reviews: [],
    orders: [],
  },
  mutations: {
    SET_AUTHORS(state, authors) { state.authors = authors; },
    SET_BOOKS(state, books) { state.books = books; },
    SET_USERS(state, users) { state.users = users; },
    SET_REVIEWS(state, reviews) { state.reviews = reviews; },
    SET_ORDERS(state, orders) { state.orders = orders; },
    
    ADD_AUTHOR(state, author) { state.authors.push(author); },
    UPDATE_AUTHOR(state, updatedAuthor) {
      const index = state.authors.findIndex(a => a.id === updatedAuthor.id);
      if (index !== -1) state.authors.splice(index, 1, updatedAuthor);
    },
    DELETE_AUTHOR(state, authorId) {
      const index = state.authors.findIndex(a => a.id === authorId);
      if (index !== -1) state.authors.splice(index, 1);
    },
    ADD_BOOK(state, book) { state.books.push(book); },
    UPDATE_BOOK(state, updatedBook) {
      const index = state.books.findIndex(b => b.id === updatedBook.id);
      if (index !== -1) state.books.splice(index, 1, updatedBook);
    },
    DELETE_BOOK(state, bookId) {
      const index = state.books.findIndex(b => b.id === bookId);
      if (index !== -1) state.books.splice(index, 1);
    },
  },
actions: {
    async fetchAuthors({ commit }) {
      const response = await axios.get(`${API_URL}/authors`);
      commit('SET_AUTHORS', response.data);
    },
    async addAuthor({ commit }, author) {
      const response = await axios.post(`${API_URL}/authors`, author);
      commit('ADD_AUTHOR', response.data);
    },
    async updateAuthor({ commit }, author) {
      // Use the response data to commit the mutation
      const response = await axios.patch(`${API_URL}/authors/${author.id}`, author);
      commit('UPDATE_AUTHOR', response.data);
    },
    async deleteAuthor({ commit }, authorId) {
      await axios.delete(`${API_URL}/authors/${authorId}`);
      commit('DELETE_AUTHOR', authorId);
    },

    async fetchBooks({ commit }) {
        const response = await axios.get(`${API_URL}/books`);
        commit('SET_BOOKS', response.data);
    },
    async addBook({ commit }, book) {
        const response = await axios.post(`${API_URL}/books`, book);
        commit('ADD_BOOK', response.data);
    },
    async updateBook({ commit }, book) {
        // Use the response data to commit the mutation
        const response = await axios.patch(`${API_URL}/books/${book.id}`, book);
        commit('UPDATE_BOOK', response.data);
    },
    async deleteBook({ commit }, bookId) {
        await axios.delete(`${API_URL}/books/${bookId}`);
        commit('DELETE_BOOK', bookId);
    },

    async fetchUsers({ commit }) {
        const response = await axios.get(`${API_URL}/users`);
        commit('SET_USERS', response.data);
    },
    async fetchOrders({ commit }) {
        const response = await axios.get(`${API_URL}/orders`);
        commit('SET_ORDERS', response.data);
    },
    async fetchReviews({ commit }) {
        const response = await axios.get(`${API_URL}/reviews`);
        commit('SET_REVIEWS', response.data);
    },
    async uploadCoverImage({ dispatch }, { bookId, file }) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        await axios.post(`${API_URL}/books/${bookId}/upload-cover`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // After upload, refresh the books list to get the new image paths
        dispatch('fetchBooks'); 
      } catch (error) {
        console.error('Failed to upload cover image:', error);
      }
    },
  },
  getters: {
    // Getter for dashboard chart
    inventoryBreakdown: state => {
        const physical = state.books.filter(b => b.type === 'Physical').length;
        const ebook = state.books.filter(b => b.type === 'E-Book').length;
        const total = physical + ebook;
        if (total === 0) return { physical: 0, ebook: 0 };
        return {
            physical: Math.round((physical / total) * 100),
            ebook: Math.round((ebook / total) * 100)
        };
    },
    totalRevenue: state => state.orders.reduce((sum, order) => order.status === 'Shipped' ? sum + order.total : sum, 0),
    pendingOrdersCount: state => state.orders.filter(order => order.status === 'Pending').length,
    pendingReviewsCount: state => state.reviews.filter(review => review.status === 'pending').length,
    topSellingBooks: state => [...state.books].sort((a, b) => b.sales - a.sales).slice(0, 3),
    recentActivity: state => {
        const latestOrder = state.orders[0] ? { id: 'o1', text: `New order #${state.orders[0].id} from ${state.users.find(u => u.id === state.orders[0].userId)?.name}`, time: '1h ago'} : null;
        const latestReview = state.reviews[0] ? { id: 'r1', text: `New review for ${state.books.find(b => b.id === state.reviews[0].bookId)?.title}`, time: '3h ago'} : null;
        return [latestOrder, latestReview].filter(Boolean);
    },
    monthlySales: (state) => {
        const sales = { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0 };
        state.orders.forEach(order => {
            if (order.status === 'Shipped') {
                const month = new Date(order.date).toLocaleString('default', { month: 'short' });
                if (Object.prototype.hasOwnProperty.call(sales, month)) {
                    sales[month] += order.total;
                }
            }
        });
        const maxSale = Math.max(...Object.values(sales));
        return Object.keys(sales).map(name => ({
            name,
            revenue: sales[name],
            value: maxSale > 0 ? (sales[name] / maxSale) * 100 : 0
        }));
    }
  }
})