import Vuex from 'vuex'
import Axios from 'axios';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

Vue.prototype.$http = Axios;

const token = localStorage.getItem('token');
if (token) {
  // Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
};
