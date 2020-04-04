<template>
    <div id="sidebar" class="side">
        <h1 id="logo">sMATH</h1>
        <div class="details">
            <p>Speed Math! Answer {{ problems }} math problems as quickly as possible. Tip: Answers are always whole numbers.<br><br>
                Checkout the code on <a href="https://github.com/wyattferguson/math-game">Github</a><br>
                Follow me on <a href="https://twitter.com/wyattferguson">Twitter</a>
            </p>

            <strong class="title">Controls</strong>
            <p>
                <strong>R - Start/Re-start</strong><br>
                <strong>Enter - Submit Answer</strong>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    props: {
        problems: Number
    }, 
}
</script>