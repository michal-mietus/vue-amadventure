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
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/resources',
      name: 'resources',
      component: () => import('./views/Resources.vue'),
    },
    {
      path: '/hero/create',
      name: 'hero/create',
      component: () => import('./views/CreateHero.vue'),
    },
    {
      path: '/hero/owned',
      name: 'hero/owned',
      component: () => import('./views/OwnedHero.vue'),
    },
  ],
});
