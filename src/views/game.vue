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

        <winner :cat="totalProblems" :time="time" @reset-game="resetBoard" v-else-if="state == 'winner'"></winner>

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
import winner from '../components/winner'

export default {
  name: 'game',
  components: {
    timer, sidebar, welcome, countdown, winner
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
      time: 0,
      ops: [
        {
          sign: '-',
          max: 100,
          min: 5,
          calc: (a, b) => {
            return a - b;
          }
        },{
          sign: 'x',
          max: 10,
          min: 1,
          calc: (a, b) => {
            return a * b;
          }
        },{
          sign: '&divide;', // html entity for division
          max: 11,
          min: 1,
          calc: (a, b) => {
            return a * b;
          }
        },{
          sign: '+',
          max: 50,
          min: 1,
          calc: (a, b) => {
            return a + b;
          }
        }
      ]
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
      let op = this.randomNumber(0,this.ops.length); // pick random operation
      let formula = this.ops[op];
      let a = this.randomNumber(formula.min,formula.max);
      let b = this.randomNumber(formula.min,formula.max);

      switch (op) {
        // subtraction
        case 0:
          if(a < b){
            b = [a, a = b][0]; // swap values so answer cant be negative
          }
          this.answer = formula.calc(a,b);
          break;

        // division
        case 2:
          // force answer to be a whole number
          let c = formula.calc(a,b);
          this.answer = a;
          a = c;
          break;

        // everything else
        default:
          this.answer = formula.calc(a,b);
      }

      this.operator = formula.sign;
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
      if(self.state != "winner"){
        if(pressed == 'R' || pressed == 'r'){
          self.resetBoard();
        }else if(pressed =='a' && this.$debug){ // quick answer for testing
          self.userAnswer = self.answer;
        }
      }
    });
  }

}
</script>
