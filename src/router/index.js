import { createRouter, createWebHistory } from 'vue-router'
import AdminDashboard from '../components/Dashboard.vue'
import AccountManager from '../components/AccountManager.vue'
import CommentManager from '../components/CommentManager.vue'
import CustomerService from '../components/CustomerService.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: AdminDashboard
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: AccountManager
  },
  {
    path: '/comments',
    name: 'Comments',
    component: CommentManager
  },
  {
    path: '/customer-service',
    name: 'CustomerService',
    component: CustomerService
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router