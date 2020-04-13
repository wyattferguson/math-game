<template>
  <div id="leaderboard" class="container">
    <Sidebar page="leaderboard"></Sidebar>
    <div class="center">
      <h1>HIGHSCORES</h1>
      <h4>For answering {{ category }} questions the fastest</h4>
      <ul>
        <li>Categories</li>
        <li v-for="i in (maxQuestions/minStep)" :key="i"><router-link :to="{name:'leaderboard', params:{cat:i*minStep}}" class="btn">{{ i*minStep }}</router-link></li>
      </ul>
      <p>{{ info }}</p>
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
      info: null,
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
          this.info = response.data
      });
    }
  },
  mounted() {
    this.getCategory();
  }
}
</script>
