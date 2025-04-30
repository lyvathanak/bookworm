import { createStore } from 'vuex'

export default createStore({
  state: {
    stats: {
      books: 100,
      users: 112000,
      sales: 600000,
      orders: 1000
    },
    books: [
      {
        id: 1,
        title: 'Eight Golden Rules of Interface Design',
        category: 'History',
        author: 'Jim Ronh',
        description: 'A highly recommended book on UI design for product'
      },
      {
        id: 2,
        title: 'Eight Golden Rules of Interface Design',
        category: 'History',
        author: 'Jim Ronh',
        description: 'A highly recommended book on UI design for product'
      },
      {
        id: 3,
        title: 'Eight Golden Rules of Interface Design',
        category: 'History',
        author: 'Jim Ronh',
        description: 'A highly recommended book on UI design for product'
      },
      {
        id: 4,
        title: 'Eight Golden Rules of Interface Design',
        category: 'History',
        author: 'Jim Ronh',
        description: 'A highly recommended book on UI design for product'
      }
    ],
    users: [
      {
        id: 1,
        name: 'Sion Monika',
        mobile: '08888888888',
        email: 'sionmomo@gmail.com',
        status: 'active'
      },
      {
        id: 2,
        name: 'Sion Monika',
        mobile: '08888888888',
        email: 'sionmomo@gmail.com',
        status: 'active'
      },
      {
        id: 3,
        name: 'Sion Monika',
        mobile: '08888888888',
        email: 'sionmomo@gmail.com',
        status: 'inactive'
      },
      {
        id: 4,
        name: 'Sion Monika',
        mobile: '08888888888',
        email: 'sionmomo@gmail.com',
        status: 'active'
      },
      {
        id: 5,
        name: 'Sion Monika',
        mobile: '08888888888',
        email: 'sionmomo@gmail.com',
        status: 'active'
      },
      {
        id: 6,
        name: 'Sion Monika',
        mobile: '08888888888',
        email: 'sionmomo@gmail.com',
        status: 'inactive'
      },
      {
        id: 7,
        name: 'Sion Monika',
        mobile: '08888888888',
        email: 'sionmomo@gmail.com',
        status: 'active'
      },
      {
        id: 8,
        name: 'Sion Monika',
        mobile: '08888888888',
        email: 'sionmomo@gmail.com',
        status: 'active'
      },
      {
        id: 9,
        name: 'Sion Monika',
        mobile: '08888888888',
        email: 'sionmomo@gmail.com',
        status: 'active'
      },
      {
        id: 10,
        name: 'Sion Monika',
        mobile: '08888888888',
        email: 'sionmomo@gmail.com',
        status: 'inactive'
      }
    ],
    comments: [
      {
        id: 1,
        user: 'Linfer',
        message: 'Wish there were more rare and collector\'s editions available',
        responses: 2,
        timestamp: '5 min ago'
      },
      {
        id: 2,
        user: 'Linfer',
        message: 'Wish there were more rare and collector\'s editions available',
        responses: 2,
        timestamp: '5 min ago'
      },
      {
        id: 3,
        user: 'Linfer',
        message: 'Wish there were more rare and collector\'s editions available',
        responses: 2,
        timestamp: '5 min ago'
      },
      {
        id: 4,
        user: 'Linfer',
        message: 'Wish there were more rare and collector\'s editions available',
        responses: 2,
        timestamp: '5 min ago'
      },
      {
        id: 5,
        user: 'Linfer',
        message: 'Wish there were more rare and collector\'s editions available',
        responses: 2,
        timestamp: '5 min ago'
      }
    ],
    notifications: [
      {
        id: 1,
        text: 'Great selection of books! Found exactly what I was looking for.',
        timestamp: '5min ago'
      },
      {
        id: 2,
        text: 'Fast shipping and excellent customer service. Highly recommend',
        timestamp: '5min ago'
      },
      {
        id: 3,
        text: 'Great selection of books! Found exactly what I was looking for.',
        timestamp: '5min ago'
      }
    ],
    orders: [
      {
        id: '937485',
        user: 'Jessae',
        details: 'placed new order for \'Computer networking\' books.',
        timestamp: '1min ago'
      },
      {
        id: '937485',
        user: 'Jessae',
        details: 'placed new order for \'Computer networking\' books.',
        timestamp: '1min ago'
      },
      {
        id: '937485',
        user: 'Jessae',
        details: 'placed new order for \'Computer networking\' books.',
        timestamp: '1min ago'
      }
    ],
    summary: {
      income: 92,
      profite: 82,
      expenses: 40
    },
    stockStatus: {
      soldOut: 63,
      inStock: 37
    },
    monthlyProgress: [
      { month: 'Jan', value: 10 },
      { month: 'Feb', value: 25 },
      { month: 'Mar', value: 15 },
      { month: 'Apr', value: 20 },
      { month: 'May', value: 35 },
      { month: 'Jun', value: 25 },
      { month: 'Jul', value: 30 },
      { month: 'Aug', value: 20 },
      { month: 'Sep', value: 35 },
      { month: 'Oct', value: 50 },
      { month: 'Nov', value: 65 },
      { month: 'Dec', value: 90 }
    ]
  },
  mutations: {
    // Add mutations here
  },
  actions: {
    // Add actions here
  },
  getters: {
    // Add getters here
  }
})