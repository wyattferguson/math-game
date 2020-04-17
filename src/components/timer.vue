<template>
    <div id="Timer">
        <h2 id="clock">{{ time }}</h2>
    </div>
</template>

<script>
export default {
    name: 'timer',
    data() {
        return {
            time: "00:00:00",
            timeStart: 0,
            timeID: 0,
        }
    }, 
    methods: {
        startTimer(){
            const interval = 25;
            this.timeStart = new Date();
            this.timeID = setInterval(this.updateTimer, interval);
        },

        stopTimer(){
            clearInterval(this.timeID);
        },

        updateTimer(){
            let currentTime = new Date()
            , timeElapsed = new Date(currentTime - this.timeStart)
            , min = timeElapsed.getUTCMinutes()
            , sec = this.leadingZeros(timeElapsed.getUTCSeconds())
            , ms = this.msLeadingZeros(timeElapsed.getUTCMilliseconds());
            
            this.time = min + ":" + sec + ":" + ms;
        },

        // pad times with 0's
        leadingZeros(dt){
            return (dt < 10 ? '0' : '') + dt
        },

        // fix special cases timing in milliseconds
        msLeadingZeros(dt){
            if(dt < 100 && dt > 9){
                return "0" + dt;
            }else if(dt < 10){
                return "00" + dt;
            }else{
                return dt;
            }
        }
    }
}
</script>