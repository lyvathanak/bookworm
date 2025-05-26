import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import HomeView from '../views/HomeView.vue'
import DescriptionPage from '../views/DescriptionPage.vue'
import WishListPage from '@/views/WishListPage.vue'
import CheckoutPageVue from '@/views/CheckoutPage.vue'
import CartPageVue from '@/views/CartPage.vue'
import AuthPage from '@/views/AuthPage.vue'
import ProfileView from '../views/ProfileView.vue'
import ProfileInfo from '../components/ProfileInfo.vue'
import UserOrders from '../components/UserOrders.vue'
import UserWishlist from '../components/UserWishlist.vue'
import UserAddress from '../components/UserAddress.vue'
import ChangePassword from '../components/ChangePassword.vue'

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
        path: 'signin',
        name: 'signin',
        component: () => import('../components/SignIn.vue')
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('../components/SignUp.vue')
      },
      {
        path: '',
        redirect: '/auth/signin'
      }
    ]
  },
  {
    path: '/profile',
    component: ProfileView,
    children: [
      {
        path: '',
        name: 'profile',
        component: ProfileInfo
      },
      {
        path: 'orders',
        name: 'profile-orders',
        component: UserOrders
      },
      {
        path: 'wishlist',
        name: 'profile-wishlist',
        component: UserWishlist
      },
      {
        path: 'address',
        name: 'profile-address',
        component: UserAddress
      },
      {
        path: 'change-password',
        name: 'profile-change-password',
        component: ChangePassword
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router