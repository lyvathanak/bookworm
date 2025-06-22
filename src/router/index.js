import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthPage from '../views/AuthPage.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import WishListPage from '../views/WishListPage.vue';
import CheckoutPage from '../views/CheckoutPage.vue';
import CartPage from '../views/CartPage.vue';
import AuthorProfile from '../views/AuthorProfile.vue';
import BookList from '../views/BookList.vue';
import DescriptionPage from '../views/DescriptionPage.vue';
import ProfileView from '../views/ProfileView.vue';
import { authStore } from '@/store/auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: WishListPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/book/:id',
    name: 'book-description',
    component: DescriptionPage,
    props: true,
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/author/:id',
    name: 'author-profile',
    component: AuthorProfile,
    props: true,
  },
  {
    path: '/author/:id/books',
    name: 'book-list',
    component: BookList,
    props: true,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    component: AuthPage,
    children: [
      { path: '', redirect: { name: 'signin' } },
      // Corrected paths point directly to the components
      { path: 'signin', name: 'signin', component: SignIn },
      { path: 'signup', name: 'signup', component: SignUp },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  authStore.loadToken();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !authStore.isAuthenticated) {
    return { name: 'signin', query: { redirect: to.fullPath } };
  }
});

export default router;