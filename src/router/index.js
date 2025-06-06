import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import LoginView from '../components/Login.vue'
import DashboardView from '../components/Dashboard.vue'
import ProductManager from '../components/ProductManager.vue'
import AccountManager from '../components/AccountManager.vue'
import CommentManager from '../components/CommentManager.vue'
import CustomerService from '../components/CustomerService.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    name: 'ProductManager',
    component: ProductManager,
    meta: { requiresAuth: true }
  },
  {
    path: '/accounts',
    name: 'AccountManager',
    component: AccountManager,
    meta: { requiresAuth: true }
  },
  {
    path: '/comments',
    name: 'CommentManager',
    component: CommentManager,
    meta: { requiresAuth: true }
  },
  {
    path: '/customer-service',
    name: 'CustomerService',
    component: CustomerService,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/isAuthenticated']) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router