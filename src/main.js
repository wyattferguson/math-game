// Styles
import "./styles/styles.scss";

// Vue
import Vue from 'vue';
import Router from 'vue-router';
import App from './App';

// Pages
import Game from './views/Game';
import Leaderboard from './views/Leaderboard';

Vue.use(Router);

const router = new Router({
  routes: [
    { path: '/', component: Game },
    { path: '/led', component: Leaderboard }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});