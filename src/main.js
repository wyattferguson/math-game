
import "./styles/styles.scss";

import Vue from 'vue';
import App from './App';
import axios from 'axios';
import router from './router';

Vue.prototype.$debug = true;
Vue.prototype.$maxQuestions = 50;
Vue.prototype.$minQuestions = 10;
Vue.prototype.$minStep = 10;
const server = (Vue.prototype.$debug) ? "http://localhost:80/math-game/server/leaderboard.php" : "http://math.wyattf.dev/server/leaderboard.php";

Vue.prototype.$http = axios.create({
  baseURL: server
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});