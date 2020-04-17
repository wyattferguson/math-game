<template>
    <div id="winner" class="center modal">
        <h1>Winner!</h1>
        <h2>Time: <span class="time">{{ time }}</span></h2>
        <!--<h2>Rank: {{ rank }}</h2>
        <button v-on:click="saveScore">Submit Score</button>
        <h3>OR</h3>-->
        <button v-on:click="resetBoard">New Game</button>
    </div>
</template>

<script>
    export default {
        name:"winner",
        props: {
            time: String
        },
        methods: {
            resetBoard() {
                this.$emit('reset-game');
            }
        },
    }
</script>