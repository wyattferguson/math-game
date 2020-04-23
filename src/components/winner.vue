<template>
    <div id="winner" class="center modal">
        <h1>Winner!</h1>
        <h2>Time: <span>{{ time }}</span></h2>
        <h2>Rank: <span>{{ rank }}</span></h2>

        <div v-if="!saved">
            <input type="text" name="userName" id="userName" :class="{ 'shake': errors }" placeholder="Your Name" maxlength="10" v-model="name">
            <button v-on:click="saveScore">Save Score</button>
        </div>

        <div v-else>
            <h3><span>SAVED!</span></h3>
            <button v-on:click="resetBoard">New Game</button>
        </div>
    </div>
</template>

<script>
    export default {
        name:"winner",
        props: {
            time: String,
            cat: Number
        },
        data() {
            return {
                rank: 0,
                name: "",
                saved: false,
                errors: false,
            }
        },
        methods: {
            resetBoard() {
                this.$emit('reset-game');
            },

            isAlphaNumeric(ch){
                return ch.match(/^[a-z0-9]+$/i) !== null;
            },

            saveScore(){
                let formData = new FormData();
                if(this.name && this.name.length < 16 && this.isAlphaNumeric(this.name)){
                    formData.append("c", this.cat);
                    formData.append("n", this.name);
                    formData.append("t", this.time);

                    this.$http.post('',
                        formData
                    ).then(response => {
                        this.saved = true;
                    });
                }else{
                    const self = this;
                    this.errors = true;
                    setTimeout(function(){ // stop error animation after timelapsed
                        self.errors = false
                    }, 500);
                }
            }
        },
        mounted () {
            this.$http.get("?c="+this.cat+"&s="+this.time).then(response => {
                this.rank = response.data
            });
        },
    }
</script>