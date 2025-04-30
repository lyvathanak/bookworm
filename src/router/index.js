import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import HomeView from '../views/HomeView.vue'
import DescriptionPage from '../views/DescriptionPage.vue'


const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/book/:id',
    name: 'book-description',
    component: DescriptionPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router