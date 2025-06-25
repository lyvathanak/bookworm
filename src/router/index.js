import { createRouter, createWebHistory } from 'vue-router';
import { authStore } from '@/store/auth';

const routes = [
  {
 path: '/',
    name: 'home',
    // FIX: Use lazy loading for the component
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    // FIX: Use lazy loading for the component
    component: () => import(/* webpackChunkName: "wishlist" */ '../views/WishListPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/book/:id',
    name: 'book-description',
    // FIX: Use lazy loading for the component
    component: () => import(/* webpackChunkName: "book-description" */ '../views/DescriptionPage.vue'),
    props: true,
  },
  {
    path: '/checkout',
    name: 'checkout',
    // FIX: Use lazy loading for the component
    component: () => import(/* webpackChunkName: "checkout" */ '../views/CheckoutPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    name: 'cart',
    // FIX: Use lazy loading for the component
    component: () => import(/* webpackChunkName: "cart" */ '../views/CartPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/author/:id',
    name: 'author-profile',
    // FIX: Use lazy loading for the component
    component: () => import(/* webpackChunkName: "author-profile" */ '../views/AuthorProfile.vue'),
    props: true,
  },
  {
    path: '/author/:id/books',
    name: 'book-list',
    // FIX: Use lazy loading for the component
    component: () => import(/* webpackChunkName: "book-list" */ '../views/BookList.vue'),
    props: true,
  },
  {
    path: '/profile',
    name: 'profile',
    // FIX: Use lazy loading for the component
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    // FIX: Use lazy loading for the parent and child components
    component: () => import(/* webpackChunkName: "auth" */ '../views/AuthPage.vue'),
    children: [
      { path: '', redirect: { name: 'signin' } },
      { path: 'signin', name: 'signin', component: () => import(/* webpackChunkName: "auth-signin" */ '../views/SignIn.vue') },
      { path: 'signup', name: 'signup', component: () => import(/* webpackChunkName: "auth-signup" */ '../views/SignUp.vue') },
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