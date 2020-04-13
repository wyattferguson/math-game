// Styles
import "./styles/styles.scss";

// Vue
import Vue from 'vue';
import Router from 'vue-router';
import App from './App';
import axios from 'axios';

// Pages
import Game from './views/Game';
import Leaderboard from './views/Leaderboard';

Vue.use(Router);

const router = new Router({
  routes: [
    { path: '/', name:"home", component: Game },
    { path: '/leaderboard/:cat', name:"leaderboard", component: Leaderboard }
  ]
});


Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:80/math-game/leaderboard.php"
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});