<template>
    <div id="app" class="container">
        <Sidebar :problems="totalProblems"></Sidebar>

        <div id="welcome" class="center modal" v-if="state == 1">
            <h1>Welcome!</h1>
            <div id="question-box">
              <label for="ticks">Number of Problems: {{ totalProblems }}</label>
              <input type="range" min="10" value="10" max="50" step="10" list="ticks" v-model="totalProblems" >
              <datalist id="ticks">
                  <option data-value="10">10</option>
                  <option data-value="20">20</option>
                  <option data-value="30">30</option>
                  <option data-value="40">40</option>
                  <option data-value="50">50</option>
              </datalist>
            </div>
            <p>
                <strong>R - Start/Re-start</strong><br>
                <strong>Enter - Submit Answer</strong>
            </p>
            <button v-on:click="resetBoard">New Game</button>
        </div>

        <div id="board" class="center" v-else-if="state == 2">
            <div id="problem">
                <div id="top">
                    <span>{{ partA }}</span>
                </div>
                <div id="bottom">
                    <span id="operator" v-html="operator"></span>
                    <span>{{ partB }}</span>
                </div>
                <hr></hr>
                <input v-model="userAnswer" @keyup.enter="checkAnswer" :class="{ 'shake': onError }" type="number" id="answer" placeholder="0" maxlength="5" value="" autofocus > 
            </div>
        </div>

        <div id="winner" class="center modal" v-else-if="state == 3">
            <h1>Winner!</h1>
            <h2>Time: <span class="time">{{ time }}</span></h2>
            <h2>Rank: {{ rank }}</h2>
            <button v-on:click="saveScore">Submit Score</button>
            <h3>OR</h3>
            <button v-on:click="resetBoard">New Game</button>
        </div>

        <div id="controls" class="side">
            <Timer ref="timer"></Timer>
            <h3><span>{{ correct }}</span> / {{ totalProblems }} <span class="correct"> Correct</span></h3>
            <h3><span>{{ errors }}</span> <span class="errors">Errors</span></h3>
        </div>
    </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import Timer from './components/Timer'

export default {
  name: 'app',
  components: {
    Timer, Sidebar
  },
  data: function() {
    return {
      partA: 0,
      partB: 0,
      operator: "",
      answer: 0,
      correct: 0,
      errors: 0,
      rank: 0,
      onError: false,
      totalProblems: 10,
      userAnswer: "",
      state: 1,
      time: 0
    }
  }, 
  methods: {
    checkAnswer: function() {
      const self = this;
      // correct answer
      if (Number(this.userAnswer) == this.answer){
        this.correct += 1;
        if (this.correct >= this.totalProblems){ // check if last problem
          this.$refs.timer.stopTimer();
          this.state = 3;
          this.time = this.$refs.timer.time;
          this.correct = this.totalProblems; // fix double score bug
        }else{
          this.generateProblem();
        }
      // wrong answer
      }else if(this.userAnswer != ""){ // skip if answer is empty
        this.onError = true;
        setTimeout(function(){ // stop error animation after timelapsed
          self.onError = false
        }, 500);
        this.userAnswer = "";
        this.errors += 1;
      }
    },

    generateProblem: function(){
      let op = this.randomNumber(1,4); // pick random operation
      let a = 0;
      let b = 0;

      switch (op) {
        // subtraction
        case 1:
          this.operator = "-";
          a = this.randomNumber(5,100);
          b = this.randomNumber(1, a);
          this.answer = a - b;
          break;

        // mulitplication
        case 2:
          this.operator = "x";
          a = this.randomNumber(2,12);
          b = this.randomNumber(2,9);
          this.answer = a * b;
          break;

        // division
        case 3:
          this.operator = "&divide;"; // html entity for division
          a = this.randomNumber(2,11);
          b = this.randomNumber(2,11);
          let c = a * b;
          this.answer = a;
          a = c;
          break;

        // addition
        default:
          this.operator = "+";
          a = this.randomNumber(1,50);
          b = this.randomNumber(1,50);
          this.answer = a + b;
          break;
      }

      this.partA = a;
      this.partB = b;
      this.userAnswer = "";
    },

    // completely reset to new game
    resetBoard: function(){
      this.$refs.timer.stopTimer();
      this.errors = 0;
      this.correct = 0;
      this.userAnswer = "";
      this.$refs.timer.startTimer();
      this.generateProblem();
      this.state = 2;
    },

    randomNumber: function(minimum, maximum){
      return Math.floor(Math.random() * maximum) + minimum;
    }
  },

  mounted: function () {
    const self = this;
    window.addEventListener("keypress", function(e){
      let pressed = String.fromCharCode(e.keyCode);
      if(pressed == 'R' || pressed == 'r'){
        self.resetBoard();
      }
    });
  }

}
</script>
