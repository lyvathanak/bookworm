import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import HomeView from '../views/HomeView.vue';
import DescriptionPage from '../views/DescriptionPage.vue';
import WishListPage from '@/views/WishListPage.vue';
import CheckoutPageVue from '@/views/CheckoutPage.vue';
import CartPageVue from '@/views/CartPage.vue';
import AuthorProfile from '@/views/AuthorProfile.vue';
import BookList from '@/views/BookList.vue';
import AuthPage from '@/views/AuthPage.vue';

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: WishListPage,
  },
  {
    path: '/book/:id',
    name: 'book-description',
    component: DescriptionPage,
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutPageVue,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPageVue,
  },
  {
    path: '/author/:authorName',
    name: 'author-profile',
    component: AuthorProfile,
  },
  {
    path: '/author/:authorName/books',
    name: 'book-list',
    component: BookList,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthPage,
    children: [
      {
        path: '',
        redirect: '/auth/signin', // Redirect /auth to /auth/signin
      },
      {
        path: 'signin',
        name: 'signin',
        component: () => import('../components/SignIn.vue'),
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('../components/SignUp.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;