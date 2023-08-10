export default
{
    namespaced : true,
    state : function()
    {
        return {
            message : 'No message available'
        }
    },
    getters : {
        getMessage: function ( state )
        {
            return state.message;
        }
    },
    mutations : {
        SET_MESSAGE: function ( state, message ) 
        {
            state.message = message;
        }
    },
    actions : {
        fetchMessage : function ( context, userKey ) 
        {
            let result = 'No greating message available, sorry.',
            settings = { message: null };
            if( localStorage.getItem(`${userKey}-settings`)  )
            {
              settings =  JSON.parse( localStorage.getItem(`${userKey}-settings`) );
              if( settings && settings.message )
              {
                result = settings.message;
              }
            }
            context.commit( 'SET_MESSAGE',settings.message );
            return result;
        },
        saveMessage : function ( context, userKey )
        {
            localStorage.setItem(`${userKey}-settings`, JSON.stringify({ 'message': context.state.message }) );
        }
    }
}