<template>
  <div style="display:flex; flex:0 0 auto; flex-direction:column">
    <h3>Change greeting widget settings.</h3>
    <div style="display: flex; flex-direction:row;"> 
      <span>Message: </span>
      <textbox :value="message" @valueChanged="event_MessageChanged"></textbox>    
      <button style="width:100px;" @click="event_saveButtonClick">Save</button>
    </div>

  </div>
</template>
<script>
  import textBox from './ParentControlledTextBox.vue';
  export default{
    components :{
      'textbox':textBox
    },
    computed : 
    {
      message: function ()
      {
        return this.$store.getters[`greetingsStore/getMessage`];
      }
    },

    methods: {
      event_saveButtonClick : async function() 
      {
        await this.$store.dispatch('greetingsStore/saveMessage', this.userId);
        this.saveComplete();
      },
      event_MessageChanged : function ( value ) 
      {
        this.$store.commit('greetingsStore/SET_MESSAGE', value);
      },
      saveComplete : function ( )
      {
        this.$emit('settingsChanged', {
          'message':this.message
        })
      }
    }
  }

</script>