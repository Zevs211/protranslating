import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';
import App from './App.vue';
import './styles/index.scss';

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
});
