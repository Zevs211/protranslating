import VueRouter from 'vue-router';
import ClientsPage from './views/ClientsPage.vue';
import ProvidersPage from './views/ProvidersPage.vue';

const routes = [
  {
    path: '/',
    name: 'clients',
    component: ClientsPage,
  },
  {
    path: '/providers',
    name: 'providers',
    component: ProvidersPage,
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
