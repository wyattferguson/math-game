<template>
    <div id="countdown" class="center modal">
        <h2>Game starts in...</h2>
        <h1>{{ time }}</h1>
    </div>
</template>

<script>
    export default {
        name:"countdown",
        data() {
            return {
                startTime: 3,
                time: this.startTime,
                timeStart: 0,
                timeID: 0,
            }
        }, 
        methods: {
            stopTimer(){
                clearInterval(this.timeID);
            },

            updateTimer(){
                let currentTime = new Date();
                let timeElapsed = new Date(currentTime - this.timeStart);
                this.time = this.startTime - timeElapsed.getUTCSeconds();
                if(this.time <= 0){
                    this.stopTimer();
                    this.$emit('start-game');
                }
            },
        },
        mounted () {
            const interval = 25;
            this.timeStart = new Date();
            this.timeID = setInterval(this.updateTimer, interval);
        },
    }
</script>
