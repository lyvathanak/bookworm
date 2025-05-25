import { createRouter, createWebHistory } from 'vue-router';
import Signup from '../views/Signup.vue';
import Signin from '../views/Signin.vue';

const routes = [
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/signin', name: 'Signin', component: Signin },
  // add other routes here
  { path: '/', redirect: '/signin' },  // default route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
