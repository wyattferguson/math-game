<template>
  <div id="leaderboard" class="container">
    <Sidebar page="leaderboard"></Sidebar>
    <div class="center">
      <h1>HIGHSCORES</h1>
      <h4>Top 50 times for {{ category }} questions</h4>
      <ul>
        <li>Categories</li>
        <li v-for="i in (maxQuestions/minStep)" :key="i"><router-link :to="{name:'leaderboard', params:{cat:i*minStep}}" class="btn">{{ i*minStep }}</router-link></li>
      </ul>
      <table>
        <tr>
          <th class="rank">Rank</th>
          <th class="name">Name</th>
          <th class="time">Time</th>
          <th class="date">Date</th>
        </tr>
        <tr v-for="(user, rank) in users" :key="rank">
				  <td class="rank">{{ rank + 1}}</td>
          <td class="name">{{ user['name']}}</td>
          <td class="time">{{ user['time']}}</td>
          <td class="date">{{ user['date_added']}}</td>
			  </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Fixed from '../config'

export default {
  name: 'leaderboard',
  components: {
    Sidebar
  },
  data(){
    return{
      category: 0,
      users: null,
      maxQuestions: Fixed.maxQuestions,
      minQuestions: Fixed.minQuestions,
      minStep: Fixed.minStep,
    }
  },
  watch: {
    '$route': 'getCategory'
  },
  methods: {
    getCategory(){
      this.category = this.$route.params.cat;
      let cat = '?c=' + this.category;
      console.log(cat);
      this.$http.get(cat,{crossdomain: true})
        .then(response => {
          this.users = response.data
      });
    }
  },
  mounted() {
    this.getCategory();
  }
}
</script>
