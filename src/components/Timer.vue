<template>
    <div id="Timer">
        <h2 id="clock">{{ time }}</h2>
    </div>
</template>

<script>
export default {
    name: 'Timer',
    data: function() {
        return {
            time: "00:00:00",
            timeStart: 0,
            timeID: 0,
        }
    }, 
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
            , sec = this.leadingZeros(timeElapsed.getUTCSeconds())
            , ms = this.leadingZeros(timeElapsed.getUTCMilliseconds());
            
            this.time = min + ":" + sec + ":" + ms;
        },

        leadingZeros: function(dt){
            return (dt < 10 ? '0' : '') + dt
        }
    }
}
</script>