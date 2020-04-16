<template>
    <div id="welcome" class="center modal">
        <h1>Welcome!</h1>
        <div id="question-box">
            <label for="ticks">Number of Problems: {{ totalProblems }}</label>
            <input type="range" :min="minQuestions" :max="maxQuestions" :step="minStep" list="ticks" v-model="totalProblems" v-on:input="(e) => this.$emit('update-total',e)">
            <datalist id="ticks">
                <option v-for="i in (maxQuestions/minStep)" :value="i * minStep" :key="i">{{ i * minStep }}</option>
            </datalist>
        </div>
        <p>
            <strong>R - Start/Re-start</strong><br>
            <strong>Enter - Submit Answer</strong>
        </p>
        <button v-on:click="resetBoard">New Game</button>
    </div>
</template>

<script>
    import cfg from '../config'
    export default {
        name: "welcome",
        data() {
            return {
                maxQuestions: cfg.maxQuestions,
                minQuestions: cfg.minQuestions,
                minStep: cfg.minStep,
                totalProblems: 10
            }
        },
        methods: {
            resetBoard() {
                this.$emit('reset-board');
            }
        },
    }
</script>
