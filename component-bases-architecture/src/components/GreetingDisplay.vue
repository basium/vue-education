<template>
    <div>
        <h3>Greetings!</h3>
        <div>{{person.name}} {{person.surname}}</div>
        <div style="margin-top:50px">{{greetingMessage}}</div>        
    </div>
</template>
<script>
    export default 
    {
        /* We could access the user store and get the person ourselves. But this way
        keeps the scope of this component narrower, decouples this component from the store, so 
        other components can use it without a need for the store. */
        props:{
            greetingMessage :{ default:'No greeting message available'},
            person: {default : { name:'NoName', surname:'NoSurname'}}
        }
    }
</script>
