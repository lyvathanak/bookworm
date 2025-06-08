import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import AppLayout from '@/layouts/AppLayout.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import ProductManager from '@/views/ProductManager.vue';
import AccountManager from '@/views/AccountManager.vue';
import RatingsManager from '@/views/RatingsManager.vue';
import CustomerService from '@/views/CustomerService.vue';
import OrderManager from '@/views/OrderManager.vue';
import AuthorManager from '@/views/AuthorManager.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/', component: AppLayout, meta: { requiresAuth: true },
      children: [
        { path: '', name: 'dashboard', component: Dashboard }, { path: 'products', name: 'products', component: ProductManager },
        { path: 'orders', name: 'orders', component: OrderManager }, { path: 'authors', name: 'authors', component: AuthorManager },
        { path: 'accounts', name: 'accounts', component: AccountManager }, { path: 'ratings', name: 'ratings', component: RatingsManager },
        { path: 'support', name: 'support', component: CustomerService },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' });
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
