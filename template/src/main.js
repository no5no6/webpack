// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store';
import moment from 'moment';
import _ from 'lodash';
import coolComponents from 'cool-components';

Vue.config.productionTip = false;

axios.interceptors.request.use(
  config => {
    console.log(sessionStorage.getItem("accessTocken"), 'sessionStorage.getItem("accessTocken")');
    config.headers.accessTocken = sessionStorage.getItem("accessTocken");
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// 全局变量写入vue对象。
Vue.prototype.$kuyun = store;
// 全局变量写入moment。
Vue.prototype.moment = moment;
// axios写入vue对象。
Vue.prototype.axios = axios;
// lodash写入vue对象。
Vue.prototype.lodash = _;

Vue.use(iView);
Vue.use(coolComponents);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
