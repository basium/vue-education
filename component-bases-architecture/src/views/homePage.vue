<template>
    <div class="Home Page">
        <greeting ></greeting>
    </div>
</template>
<script>
    import greetingsWidget from '../components/GreetingsWidget.vue';
    export default 
    {
        computed: {
            userId : function () { 
                let userObject =  this.$store.getters['userStore/getUser']; 
                return `${userObject.name}-${userObject.surname}`
            }
        },
        components : 
        {
            'greeting' : greetingsWidget
        },
        mounted :async  function () {
            await this.$store.dispatch('greetingsStore/fetchMessage', this.userId );
        }        

          
    }
</script>
