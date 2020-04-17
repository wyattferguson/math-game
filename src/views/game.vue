<template>
    <div id="game" class="container">
        <sidebar page="game"></sidebar>

        <welcome v-on:update-total="updateTotalProblems" @reset-board="resetBoard" v-if="state == 'welcome'"></welcome>
        
        <countdown @start-game="startGame" v-else-if="state == 'countdown'"></countdown>

        <div id="board" class="center" v-else-if="state == 'board'">
            <div id="problem">
                <div id="top">
                    <span>{{ partA }}</span>
                </div>
                <div id="bottom">
                    <span id="operator" v-html="operator"></span>
                    <span>{{ partB }}</span>
                </div>
                <hr></hr>
                <input v-model.number="userAnswer" @keyup.enter="checkAnswer" :class="{ 'shake': onError }" type="number" id="answer" value="" ref="userAnswer" autofocus> 
            </div>
        </div>

        <div id="winner" class="center modal" v-else-if="state == 'winner'">
            <h1>Winner!</h1>
            <h2>Time: <span class="time">{{ time }}</span></h2>
            <!--<h2>Rank: {{ rank }}</h2>
            <button v-on:click="saveScore">Submit Score</button>
            <h3>OR</h3>-->
            <button v-on:click="resetBoard">New Game</button>
        </div>

        <div id="controls" class="side">
            <timer ref="timer"></timer>
            <h3><span>{{ correct }}</span> / {{ totalProblems }} <span class="correct"> Correct</span></h3>
            <h3><span>{{ errors }}</span> <span class="errors">Errors</span></h3>
        </div>
    </div>
</template>

<script>
import sidebar from '../components/sidebar'
import timer from '../components/timer'
import welcome from '../components/welcome'
import countdown from '../components/countdown'
import cfg from '../config'

export default {
  name: 'game',
  components: {
    timer, sidebar, welcome, countdown
  },
  data() {
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
      state: "welcome",
      time: 0
    }
  }, 
  methods: {
    checkAnswer() {
      const self = this;
      // correct answer
      if (Number(this.userAnswer) == this.answer){
        this.correct += 1;
        if (this.correct >= this.totalProblems){ // check if last problem
          this.$refs.timer.stopTimer();
          this.state = "winner";
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

    generateProblem(){
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
    resetBoard(){
      this.$refs.timer.stopTimer();
      this.state = "countdown";
      this.errors = 0;
      this.correct = 0;
    },

    startGame(){
      this.state = "board";
      this.$refs.timer.startTimer();
      this.generateProblem();
      this.userAnswer = "";

      // wait a beat and set focus on answer box
      this.$nextTick(() =>{
        this.$refs.userAnswer.focus();
      });
    },

    // catch updated total from welcome component
    updateTotalProblems(event){
      this.totalProblems = event.target.value;
    },

    randomNumber(minimum, maximum){
      return Math.floor(Math.random() * maximum) + minimum;
    }
  },

  mounted() {
    const self = this;
    window.addEventListener("keypress", function(e){
      let pressed = String.fromCharCode(e.keyCode);
      if(pressed == 'R' || pressed == 'r'){
        self.resetBoard();
      }else if(pressed =='a' && cfg.debug){ // quick answer for testing
        self.userAnswer = self.answer;
      }
    });
  }

}
</script>
