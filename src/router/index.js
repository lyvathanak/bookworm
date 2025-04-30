import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Homeview.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // Your other routes...
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router