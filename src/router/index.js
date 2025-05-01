import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DescriptionPage from '../views/DescriptionPage.vue'
import UserProfile from '../views/UserProfile.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/book/:id',
    name: 'book-description',
    component: DescriptionPage
  },
  {
    path: '/account',
    name: 'user-profile',
    component: UserProfile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router