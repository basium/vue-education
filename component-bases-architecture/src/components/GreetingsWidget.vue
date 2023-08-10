<template>
    <div style="display: flex; flex: 1 1 auto; flex-direction:column">
        <greeting-message-config @settingsChanged = event_settingsChanged style="display:flex; flex:1 1 auto; flex-direction:column" v-if="settingsMode"></greeting-message-config>
        <greeting-message :person="user" style="display:flex; flex:1 1 auto; flex-direction:column" v-if="!settingsMode" :greetingMessage="message"></greeting-message>
        <div style="margin-top:50px;">
            <button @click="event_viewSettingsClick" v-if="!settingsMode">Change Settings</button>
            <button @click="event_viewWidgetClick" v-if="settingsMode">Close</button>
        </div>

    </div>
</template>
<script>
    import greetingMessageConfig from './GreetingSettings.vue';
    import greetingMessage from './GreetingDisplay.vue';

    export default {
        data:function() {
            return {
                settingsMode :false
            }
        },
        components :{
            "greeting-message":  greetingMessage,
            "greeting-message-config": greetingMessageConfig
        },
        computed:
        {
            message: function () {
                return this.$store.getters[`greetingsStore/getMessage`];
            },
            user : function ()
            {
                return this.$store.getters[`userStore/getUser`];
            }
        },
        methods:
        {
            event_viewSettingsClick: function()
            {
                this.settingsMode = true;
            },
            event_viewWidgetClick: function () 
            {
                this.settingsMode = false;
            }
        }
    }
</script>