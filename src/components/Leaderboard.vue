<template>
        <div id="save">
          <h1>Save Time To Leaderboards</h1>
        </div>

</template>

<script>

export default {
    name: 'Leaderboard',
    data: function() {
        return {
        }
    }, 
    methods: {
        saveScore: function(){
            // Pushes posts to the server when called.
            this.$http.post(`#`, {
                body: this.postBody
            })
            .then(response => {})
            .catch(e => {
                this.errors.push(e)
            })
        },
    }
}
</script>