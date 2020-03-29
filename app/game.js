var Vue = require('vue');
var md5 = require('md5');

function defaultData(){
  return {
    partA: 0,
    partB: 0,
    operator: "",
    answer: 0,
    correct: 0,
    time: "00:00:00.00",
    errors: 0,
    totalProblems: 20,
    userAnswer: "",
  };
}

var app = new Vue({
    el: '#app',
    data: function() { return defaultData(); }, 
    methods: {

      startTimer: function(){
        
      },

      stopTimer: function(){

      },

      resetTimer: function(){

      },

      checkAnswer: function() {
        if (md5(Number(this.userAnswer)) == this.answer){
          this.correct += 1;
          if (this.correct == this.totalProblems){
            alert("Winner");
            this.resetBoard();
          }else{
            this.generateProblem();
          }
        }else{
          this.errors += 1;
        }
        
      },

      generateProblem: function(){
        val = this.randomNumber(1,4);
        a = 0;
        b = 0;

        switch (val) {
          case 1:
            this.operator = "-";
            a = this.randomNumber(10,100);
            b = this.randomNumber(1, a);
            this.answer = md5(a - b);
            break;

          case 2:
            this.operator = "x";
            a = this.randomNumber(2,15);
            b = this.randomNumber(2, 15);
            this.answer = md5(a * b);
            break;

          case 3:
            this.operator = "&divide;"; // html entity for division
            a = this.randomNumber(2,15);
            b = this.randomNumber(2,10);
            c = a * b;
            this.answer = md5(a);
            a = c;
            break;

          default:
            this.operator = "+";
            a = this.randomNumber(1,50);
            b = this.randomNumber(1, 50);
            this.answer = md5(a + b);
            break;
        }

        this.partA = a;
        this.partB = b;
        this.userAnswer = "";
      },

      resetBoard: function(){
        def = defaultData();
        Object.assign(this.$data, def);
        this.generateProblem();
      },

      randomNumber : function(minimum, maximum){
        return Math.floor(Math.random() * maximum) + minimum;
      }
    },

    mounted: function(){
      self = this;
      this.resetBoard();

      window.addEventListener("keypress", function(e){
        pressed = String.fromCharCode(e.keyCode);
        this.console.log(e.keyCode);
        if(pressed == 'R' || pressed == 'r'){
          self.resetBoard();
        }else if(pressed == 'a'){
          self.userAnswer = self.answer;
        }else if(e.keyCode == '13'){
          self.checkAnswer();
        }

      });
    }

})
