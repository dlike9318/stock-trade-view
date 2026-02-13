import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Users from '../views/Users.vue';
import Stocks from '../views/Stocks.vue';
import Config from '../views/Config.vue';
import Logs from '../views/Logs.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: Stocks
  },
  {
    path: '/config',
    name: 'Config',
    component: Config
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
