import { createStore } from 'vuex';

const authModule = {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    SET_AUTHENTICATION(state, status) {
      state.isAuthenticated = status;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, credentials) {
      // In a real app, you would make an API call here
      if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        const user = { name: 'Admin User', email: 'admin@example.com' };
        commit('SET_AUTHENTICATION', true);
        commit('SET_USER', user);
        return true;
      }
      return false;
    },
    logout({ commit }) {
      commit('SET_AUTHENTICATION', false);
      commit('SET_USER', null);
    },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user,
  },
};

export default createStore({
  modules: {
    auth: authModule,
  },
  state: {
    stats: {
      books: 100,
      users: 112000,
      sales: 600000,
      orders: 1000,
    },
    books: [
      { id: 1, title: 'Eight Golden Rules of Interface Design', category: 'History', author: 'Jim Ronh', description: 'A highly recommended book on UI design for product' },
      { id: 2, title: 'The Lean Startup', category: 'Business', author: 'Eric Ries', description: 'How Today\'s Entrepreneurs Use Continuous Innovation' },
      { id: 3, title: 'Clean Code', category: 'Software', author: 'Robert C. Martin', description: 'A Handbook of Agile Software Craftsmanship' },
      { id: 4, title: 'Design Patterns', category: 'Software', author: 'Erich Gamma', description: 'Elements of Reusable Object-Oriented Software' },
    ],
    users: [
        { id: 1, name: 'Sion Monika', mobile: '08888888888', email: 'sionmomo@gmail.com', status: 'active' },
        { id: 2, name: 'Chan David', mobile: '01234567890', email: 'chandavid@gmail.com', status: 'active' },
        { id: 3, name: 'Kim Nara', mobile: '09876543210', email: 'kimnara@gmail.com', status: 'inactive' },
        { id: 4, name: 'Sok Vichea', mobile: '01122334455', email: 'sokvichea@gmail.com', status: 'active' },
        { id: 5, name: 'Ly Vathanak', mobile: '07788990011', email: 'lyvathanak@gmail.com', status: 'active' },
        { id: 6, name: 'Phan Sothy', mobile: '09988776655', email: 'phansothy@gmail.com', status: 'inactive' },
    ],
    comments: [
        { id: 1, user: 'Linfer', message: 'Wish there were more rare and collector\'s editions available', responses: 2, timestamp: '5 min ago' },
        { id: 2, user: 'Sokun', message: 'The search functionality could be improved.', responses: 0, timestamp: '15 min ago' },
        { id: 3, user: 'Nary', message: 'I love the new arrivals section!', responses: 5, timestamp: '1 hour ago' },
        { id: 4, user: 'Vibol', message: 'Customer service was very helpful with my order.', responses: 1, timestamp: '3 hours ago' },
    ],
    notifications: [
      { id: 1, text: 'Great selection of books! Found exactly what I was looking for.', timestamp: '5min ago' },
      { id: 2, text: 'Fast shipping and excellent customer service. Highly recommend', timestamp: '1h ago' },
      { id: 3, text: 'The new update looks great. Very user-friendly.', timestamp: '3h ago' },
    ],
    orders: [
      { id: '937485', user: 'Jessae', details: 'placed new order for \'Computer networking\' books.', timestamp: '1min ago' },
      { id: '937486', user: 'Ratha', details: 'placed new order for \'History of Cambodia\' books.', timestamp: '5min ago' },
      { id: '937487', user: 'David', details: 'placed new order for \'Vue.js In Action\' books.', timestamp: '10min ago' },
    ],
    summary: {
      income: 92,
      profit: 82,
      expenses: 40,
    },
    stockStatus: {
      soldOut: 37,
      inStock: 63,
    },
    monthlyProgress: [
      { month: 'Jan', value: 10 }, { month: 'Feb', value: 25 }, { month: 'Mar', value: 15 },
      { month: 'Apr', value: 20 }, { month: 'May', value: 35 }, { month: 'Jun', value: 25 },
      { month: 'Jul', value: 30 }, { month: 'Aug', value: 20 }, { month: 'Sep', value: 35 },
      { month: 'Oct', value: 50 }, { month: 'Nov', value: 65 }, { month: 'Dec', value: 90 },
    ],
  },
});