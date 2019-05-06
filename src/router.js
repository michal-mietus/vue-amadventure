import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/user/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/user/Login.vue'),
    },
    {
      path: '/hero/create',
      name: 'hero/create',
      component: () => import('./views/hero/CreateHero.vue'),
    },
    {
      path: '/hero/owned',
      name: 'hero/owned',
      component: () => import('./views/hero/OwnedHero.vue'),
    },
    {
      path: '/hero/equipment',
      name: 'hero/equipment',
      component: () => import('./views/hero/EquipmentView.vue'),
    },
    {
      path: '/expedition',
      name: 'expedition',
      component: () => import('./views/artifical/LocationListView.vue'),
    },
    {
      path: '/fight',
      name: 'fight',
      component: () => import('./views/fight/Fight.vue'),
    },
  ],
});
