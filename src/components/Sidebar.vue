<template>
    <div id="sidebar" class="side">
        <h1 id="logo">sMATH</h1>
        <div class="details">
            <p>Speed Math! Answer math problems as quickly as possible. Be quick enough and your name goes up on leaderboard!<br>
                <router-link v-if="page == 'game'" :to="{name:'leaderboard', params:{cat:10}}" class="btn">View Leaderboard</router-link>
                <router-link v-else to="/" class="btn">Start A New Game</router-link>
                Checkout the code on <a href="https://github.com/wyattferguson/math-game">Github</a><br>
                Follow me on <a href="https://twitter.com/wyattferguson">Twitter</a>
            </p>

            <div v-if="page == 'game'">
                <strong class="title">Controls</strong>
                <p>
                    <strong>R - Start/Re-start</strong><br>
                    <strong>Enter - Submit Answer</strong>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    props: {
        page: String
    }
}
</script>