
function defaultData(){
  return {
    partA: 0,
    partB: 0,
    operator: "",
    answer: 0,
    correct: 0,
    time: "00:00:00",
    timeStart: 0,
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
        this.timeStart = new Date();
        started = setInterval(this.clockRunning, 10);
      },

      stopTimer: function(){
        clearInterval(this.timeStart);
        this.time = "00:00:00";
      },

      clockRunning: function(){
        var currentTime = new Date()
        , timeElapsed = new Date(currentTime - this.timeStart)
        , hour = timeElapsed.getUTCHours()
        , min = timeElapsed.getUTCMinutes()
        , sec = timeElapsed.getUTCSeconds()
        , ms = timeElapsed.getUTCMilliseconds();
      
        this.time = min + ":" + sec + ":" + ms;
      },

      checkAnswer: function() {
        if (Number(this.userAnswer) == this.answer){
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
            this.answer = a - b;
            break;

          case 2:
            this.operator = "x";
            a = this.randomNumber(2,15);
            b = this.randomNumber(2, 15);
            this.answer = a * b;
            break;

          case 3:
            this.operator = "&divide;"; // html entity for division
            a = this.randomNumber(2,15);
            b = this.randomNumber(2,10);
            c = a * b;
            this.answer = a;
            a = c;
            break;

          default:
            this.operator = "+";
            a = this.randomNumber(1,50);
            b = this.randomNumber(1, 50);
            this.answer = a + b;
            break;
        }

        this.partA = a;
        this.partB = b;
        this.userAnswer = "";
      },

      resetBoard: function(){
        def = defaultData();
        Object.assign(this.$data, def);
        this.startTimer();
        this.generateProblem();
      },

      randomNumber : function(minimum, maximum){
        return Math.floor(Math.random() * maximum) + minimum;
      }
    },

    mounted: function(){
      self = this;
      this.resetBoard();
      this.startTimer();

      window.addEventListener("keypress", function(e){
        pressed = String.fromCharCode(e.keyCode);
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
