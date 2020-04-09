// Styles
import "./styles/styles.scss";

// Vue
import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App';


// Pages
import Game from './views/Game';
import Leaderboard from './views/Leaderboard';

Vue.use(Router, axios, VueAxios);

const router = new Router({
  routes: [
    { path: '/', component: Game },
    { path: '/leaderboard', component: Leaderboard }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});