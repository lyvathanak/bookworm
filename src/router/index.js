import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import HomeView from '../views/HomeView.vue'
import DescriptionPage from '../views/DescriptionPage.vue'
import WishListPage from '@/views/WishListPage.vue'
import CheckoutPageVue from '@/views/CheckoutPage.vue'
import CartPageVue from '@/views/CartPage.vue'

// import Signup from '../components/SignUp.vue';
// import Signin from '../components/SignIn.vue';

import AuthPage from '@/views/AuthPage.vue'
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
  },

  { 
    path: '/auth',
    component: AuthPage,
    children: [
    {
      path:'',
      name: 'Authentication',
      component: AuthPage,
      children:[

        { path: 'signin', component: () => import('../components/SignIn.vue') },
        { path: 'signup', component: () => import('../components/SignUp.vue') },
        { path: '/', redirect: '/signin' },  // default route
      ]
    }
    ]
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router