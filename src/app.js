
function defaultData(){
  return {
    partA: 0,
    partB: 0,
    operator: "",
    answer: 0,
    correct: 0,
    time: "00:00:00",
    timeStart: 0,
    timeID: 0,
    errors: 0,
    onError: false,
    totalProblems: 10,
    userAnswer: "",
    state: 1,
  };
}


export default {
  name: 'app',
  data: function() { return defaultData(); }, 
  methods: {

    startTimer: function(){
      this.timeStart = new Date();
      this.timeID = setInterval(this.updateTimer, 20);
    },

    stopTimer: function(){
      clearInterval(this.timeID);
    },

    updateTimer: function(){
      let currentTime = new Date()
      , timeElapsed = new Date(currentTime - this.timeStart)
      , min = timeElapsed.getUTCMinutes()
      , sec = timeElapsed.getUTCSeconds()
      , ms = timeElapsed.getUTCMilliseconds();
    
      this.time = min + ":" + sec + ":" + ms;
    },

    checkAnswer: function() {
      self = this;
      if (Number(this.userAnswer) == this.answer){
        this.correct += 1;
        if (this.correct >= this.totalProblems){
          this.stopTimer();
          this.state = 3;
          this.correct = this.totalProblems; // fix double score bug
        }else{
          this.generateProblem();
        }
      }else if(this.userAnswer != ""){
        this.onError = true;
        setTimeout(function(){
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

    resetBoard: function(){
      this.stopTimer();
      let def = defaultData();
      Object.assign(this.$data, def);
      this.startTimer();
      this.generateProblem();
      this.state = 2;
    },

    randomNumber: function(minimum, maximum){
      return Math.floor(Math.random() * maximum) + minimum;
    }, 

    startGame: function(){
      self = this;
      this.resetBoard();
    
      window.addEventListener("keypress", function(e){
        let pressed = String.fromCharCode(e.keyCode);
        if(pressed == 'a'){ // used for testing, fills in answer
          self.userAnswer = self.answer;
        }else if(e.keyCode == '13'){
          self.checkAnswer();
        }
      });
    }
  },

  mounted: function () {
    self = this;
    window.addEventListener("keypress", function(e){
      let pressed = String.fromCharCode(e.keyCode);
      if(pressed == 'R' || pressed == 'r'){
        self.startGame();
      }
    });
  }

}