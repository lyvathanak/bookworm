import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import HomeView from '../views/HomeView.vue'
import DescriptionPage from '../views/DescriptionPage.vue'
import WishListPage from '@/views/WishListPage.vue'
import CheckoutPageVue from '@/views/CheckoutPage.vue'
import CartPageVue from '@/views/CartPage.vue'


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
    path: '/wishlist',
    name: 'wishlist',
    component: WishListPage
  },
  {
    path: '/book/:id',
    name: 'book-description',
    component: DescriptionPage
  },
  {
    path: '/Checkout',
    name: 'checkout',
    component: CheckoutPageVue
  },
  {
    path: '/Cart',
    name: 'cart',
    component: CartPageVue
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router