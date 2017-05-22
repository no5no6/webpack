{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#router}}
import router from './router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/router}}
import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store';
import moment from 'moment';
import _ from 'lodash';

Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

// axios Header中添加token
axios.interceptors.request.use(
  config => {
    config.headers.accessTocken = sessionStorage.getItem("accessTocken");
    return config;
  },
  err => {
    return Promise.reject(err);
});

// 设置host
store.host = `http://${sessionStorage.getItem("domain")}`;

// 全局变量写入vue对象。
Vue.prototype.$kuyun = store;
// axios写入vue对象。
Vue.prototype.axios = axios;
// 全局变量写入moment。
Vue.prototype.moment = moment;
// lodash写入vue对象。
Vue.prototype.lodash = _;

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
