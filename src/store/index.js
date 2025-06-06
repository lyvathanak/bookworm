import { createStore } from 'vuex';

const authModule = {
  namespaced: true,
  state: { isAuthenticated: false, user: null },
  mutations: {
    SET_AUTHENTICATION(state, status) { state.isAuthenticated = status; },
    SET_USER(state, user) { state.user = user; },
  },
  actions: {
    login({ commit }, credentials) { if (credentials.email === 'admin@example.com' && credentials.password === 'password') { const user = { name: 'Admin User', email: 'admin@example.com' }; commit('SET_AUTHENTICATION', true); commit('SET_USER', user); return true; } return false; },
    logout({ commit }) { commit('SET_AUTHENTICATION', false); commit('SET_USER', null); },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
  },
};

export default createStore({
  modules: { auth: authModule },
  state: {
    authors: [ { id: 1, name: 'Jim Rohn', dob: '1930-09-17', description: 'Jim Rohn was an American entrepreneur, author and motivational speaker.', image: 'https://i.pravatar.cc/150?u=1', socials: { twitter: '#', facebook: '#'}}, { id: 2, name: 'Eric Ries', dob: '1978-09-22', description: 'Eric Ries is an American entrepreneur, blogger, and author of The Lean Startup.', image: 'https://i.pravatar.cc/150?u=2', socials: { twitter: '#', facebook: '#'}}, { id: 3, name: 'Robert C. Martin', dob: '1952-12-05', description: 'Robert C. "Uncle Bob" Martin is an American software engineer and author.', image: 'https://i.pravatar.cc/150?u=3', socials: { twitter: '#', facebook: '#'}}, { id: 4, name: 'Erich Gamma', dob: '1961-03-13', description: 'Erich Gamma is a Swiss computer scientist and co-author of Design Patterns.', image: 'https://i.pravatar.cc/150?u=4', socials: { twitter: '#', facebook: '#'}}, ],
    books: [ // Updated with book "type"
      { id: 1, title: 'Eight Golden Rules', category: 'History', authorId: 1, description: 'A highly recommended book on UI design for product', price: 29.99, rating: 4.5, reviews: 120, sales: 210, type: 'Physical' },
      { id: 2, title: 'The Lean Startup', category: 'Business', authorId: 2, description: 'How Today\'s Entrepreneurs Use Continuous Innovation', price: 24.99, rating: 4.8, reviews: 250, sales: 450, type: 'E-Book' },
      { id: 3, title: 'Clean Code', category: 'Software', authorId: 3, description: 'A Handbook of Agile Software Craftsmanship', price: 39.99, rating: 5.0, reviews: 300, sales: 320, type: 'Physical' },
      { id: 4, title: 'Design Patterns', category: 'Software', authorId: 4, description: 'Elements of Reusable Object-Oriented Software', price: 45.50, rating: 4.7, reviews: 180, sales: 150, type: 'E-Book' },
    ],
    users: [ { id: 1, name: 'Sion Monika', email: 'sionmomo@gmail.com', password: 'password123', mobile: '08888888888', dob: '1995-05-20', gender: 'Female', address: '123 Main St, Phnom Penh', status: 'active' }, { id: 2, name: 'Chan David', email: 'chandavid@gmail.com', password: 'password123', mobile: '01234567890', dob: '1990-11-15', gender: 'Male', address: '456 Oak Ave, Phnom Penh', status: 'active' }, { id: 3, name: 'Kim Nara', email: 'kimnara@gmail.com', password: 'password123', mobile: '09876543210', dob: '2000-01-30', gender: 'Female', address: '789 Pine Ln, Phnom Penh', status: 'inactive' }, ],
    reviews: [ { id: 1, userId: 1, bookId: 2, rating: 5, comment: 'This book completely changed my perspective on business. A must-read!', status: 'approved', timestamp: '2025-06-01' }, { id: 2, userId: 2, bookId: 3, rating: 4, comment: 'Great principles, but a bit dense to get through. Still very valuable.', status: 'approved', timestamp: '2025-05-28' }, { id: 3, userId: 3, bookId: 2, rating: 3, comment: 'Some good ideas but not very applicable to my industry.', status: 'pending', timestamp: '2025-06-05' }, ],
    orders: [ { id: 1001, userId: 1, date: '2025-06-04', total: 70.49, status: 'Shipped', items: [ { bookId: 2, quantity: 1, price: 24.99 }, { bookId: 4, quantity: 1, price: 45.50 } ] }, { id: 1002, userId: 2, date: '2025-06-05', total: 79.98, status: 'Pending', items: [ { bookId: 3, quantity: 2, price: 39.99 } ] }, { id: 1003, userId: 1, date: '2025-05-15', total: 29.99, status: 'Shipped', items: [ { bookId: 1, quantity: 1, price: 29.99 } ] }, { id: 1004, userId: 3, date: '2025-04-10', total: 65.49, status: 'Shipped', items: [ { bookId: 2, quantity: 1, price: 24.99 }, { bookId: 1, quantity: 1, price: 29.99 } ] }, { id: 1005, userId: 2, date: '2025-03-20', total: 115.48, status: 'Shipped', items: [ { bookId: 3, quantity: 1, price: 39.99 }, { bookId: 4, quantity: 1, price: 45.50 } ] }, ],
  },
  getters: {
    // New Getter for dashboard chart
    inventoryBreakdown: state => {
        const physical = state.books.filter(b => b.type === 'Physical').length;
        const ebook = state.books.filter(b => b.type === 'E-Book').length;
        const total = physical + ebook;
        if (total === 0) return { physical: 0, ebook: 0 };
        return {
            physical: (physical / total) * 100,
            ebook: (ebook / total) * 100
        };
    },
    // ... other getters are the same
    totalRevenue: state => state.orders.reduce((sum, order) => order.status === 'Shipped' ? sum + order.total : sum, 0),
    pendingOrdersCount: state => state.orders.filter(order => order.status === 'Pending').length,
    pendingReviewsCount: state => state.reviews.filter(review => review.status === 'pending').length,
    topSellingBooks: state => [...state.books].sort((a, b) => b.sales - a.sales).slice(0, 3),
    recentActivity: state => { const latestOrder = state.orders[0] ? { id: 'o1', text: `New order #${state.orders[0].id} from ${state.users.find(u => u.id === state.orders[0].userId)?.name}`, time: '1h ago'} : null; const latestReview = state.reviews[0] ? { id: 'r1', text: `New review for ${state.books.find(b => b.id === state.reviews[0].bookId)?.title}`, time: '3h ago'} : null; return [latestOrder, latestReview].filter(Boolean); },
    monthlySales: (state) => { const sales = { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0 }; state.orders.forEach(order => { if (order.status === 'Shipped') { const month = new Date(order.date).toLocaleString('default', { month: 'short' }); if (Object.prototype.hasOwnProperty.call(sales, month)) { sales[month] += order.total; } } }); const maxSale = Math.max(...Object.values(sales)); return Object.keys(sales).map(name => ({ name, revenue: sales[name], value: maxSale > 0 ? (sales[name] / maxSale) * 100 : 0 })); }
  },
  mutations: { /* Mutations are the same */
    APPROVE_REVIEW(state, reviewId) { const review = state.reviews.find(r => r.id === reviewId); if (review) review.status = 'approved'; },
    DELETE_REVIEW(state, reviewId) { const index = state.reviews.findIndex(r => r.id === reviewId); if (index !== -1) state.reviews.splice(index, 1); },
    ADD_AUTHOR(state, author) { state.authors.push(author); },
    UPDATE_AUTHOR(state, updatedAuthor) { const index = state.authors.findIndex(a => a.id === updatedAuthor.id); if (index !== -1) state.authors.splice(index, 1, updatedAuthor); },
    DELETE_AUTHOR(state, authorId) { const index = state.authors.findIndex(a => a.id === authorId); if (index !== -1) state.authors.splice(index, 1); },
    ADD_BOOK(state, book) { state.books.push(book); },
    UPDATE_BOOK(state, updatedBook) { const index = state.books.findIndex(b => b.id === updatedBook.id); if (index !== -1) state.books.splice(index, 1, updatedBook); },
    DELETE_BOOK(state, bookId) { const index = state.books.findIndex(b => b.id === bookId); if (index !== -1) state.books.splice(index, 1); },
    ADD_USER(state, user) { state.users.push(user); },
    UPDATE_USER(state, updatedUser) { const index = state.users.findIndex(u => u.id === updatedUser.id); if (index !== -1) state.users.splice(index, 1, updatedUser); },
    DELETE_USER(state, userId) { const index = state.users.findIndex(u => u.id === userId); if (index !== -1) state.users.splice(index, 1); },
    UPDATE_ORDER_STATUS(state, { orderId, status }) { const order = state.orders.find(o => o.id === orderId); if (order) { order.status = status; } }
  },
  actions: { /* Actions are the same */
    approveReview({ commit }, reviewId) { commit('APPROVE_REVIEW', reviewId); },
    deleteReview({ commit }, reviewId) { commit('DELETE_REVIEW', reviewId); },
    addAuthor({ commit }, author) { author.id = Date.now(); commit('ADD_AUTHOR', author); },
    updateAuthor({ commit }, author) { commit('UPDATE_AUTHOR', author); },
    deleteAuthor({ commit }, authorId) { commit('DELETE_AUTHOR', authorId); },
    addBook({ commit }, book) { book.id = Date.now(); commit('ADD_BOOK', book); },
    updateBook({ commit }, book) { commit('UPDATE_BOOK', book); },
    deleteBook({ commit }, bookId) { commit('DELETE_BOOK', bookId); },
    addUser({ commit }, user) { user.id = Date.now(); commit('ADD_USER', user); },
    updateUser({ commit }, user) { commit('UPDATE_USER', user); },
    deleteUser({ commit }, userId) { commit('DELETE_USER', userId); },
    updateOrderStatus({ commit }, payload) { commit('UPDATE_ORDER_STATUS', payload) }
  }
})