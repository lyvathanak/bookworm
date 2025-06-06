import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import LoginView from '../components/Login.vue'
import DashboardView from '../components/Dashboard.vue'
import ProductManager from '../components/ProductManager.vue'
import AccountManager from '../components/AccountManager.vue'
import UserDetail from '../components/UserDetail.vue'
import ReviewManager from '../components/ReviewManager.vue'
import OrderManager from '../components/OrderManager.vue'
import OrderDetail from '../components/OrderDetail.vue'
import AuthorManager from '../components/AuthorManager.vue'
import AuthorDetail from '../components/AuthorDetail.vue'
import SalesReport from '../components/SalesReport.vue' // New
import CustomerService from '../components/CustomerService.vue'

const routes = [
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/', name: 'Dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/products', name: 'ProductManager', component: ProductManager, meta: { requiresAuth: true } },
  { path: '/authors', name: 'AuthorManager', component: AuthorManager, meta: { requiresAuth: true } },
  { path: '/authors/:id', name: 'AuthorDetail', component: AuthorDetail, meta: { requiresAuth: true } },
  { path: '/orders', name: 'OrderManager', component: OrderManager, meta: { requiresAuth: true } },
  { path: '/orders/:id', name: 'OrderDetail', component: OrderDetail, meta: { requiresAuth: true } },
  { path: '/accounts', name: 'AccountManager', component: AccountManager, meta: { requiresAuth: true } },
  { path: '/users/:id', name: 'UserDetail', component: UserDetail, meta: { requiresAuth: true } },
  { path: '/reviews', name: 'ReviewManager', component: ReviewManager, meta: { requiresAuth: true } },
  { path: '/reports/sales', name: 'SalesReport', component: SalesReport, meta: { requiresAuth: true } }, // New
  { path: '/customer-service', name: 'CustomerService', component: CustomerService, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/isAuthenticated']) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;