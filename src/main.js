
import "./styles/styles.scss";

import Vue from 'vue';
import App from './App';
import axios from 'axios';
import router from './router';
import cfg from './config';

Vue.prototype.$http = axios.create({
  baseURL: cfg.server
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});