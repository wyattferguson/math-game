<template>
  <div id="leaderboard" class="container">
    <div id="sidebar" class="side">
        <h1 id="logo">sMATH</h1>
        <div class="details">
            <p>Speed Math! Answer 10 math problems as quickly as possible. Tip: Answers are always whole numbers.<br><br>
                <router-link to="/">Start A New Game</router-link><br><br>
                Checkout the code on <a href="https://github.com/wyattferguson/math-game">Github</a><br>
                Follow me on <a href="https://twitter.com/wyattferguson">Twitter</a>
            </p>
        </div>
    </div>
    <div class="center">
      <h1>HIGHSCORES</h1>
      <p>{{ info }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'leaderboard',
  data(){
    return{
      info: null
    }
  },
  mounted() {
    axios.get("http://localhost:80/math-game/leaderboard.php", {crossdomain: true})
      .then(response => {
        // JSON responses are automatically parsed.
        this.info = response.data
      })
 
  }
}
</script>
