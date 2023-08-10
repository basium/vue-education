export default
{
    namespaced : true,
    state : function()
    {
        return {
            name: "No Name",
            surname : "No Surname"
        }
    },
    getters : {
        getUser: function ( state ) {
            return {
                name :  state.name,
                surname : state.surname
            }
        }
    },
    mutations : {
        SET_USER : function ( state, user )
        {
            state.name = user.name,
            state.surname = user.surname
        }
    },
    actions : {
        fetchUser: function ( context ) 
        {
            let loggedInUser = { name:"Alessio", surname:"Cristiano"};
            context.commit("SET_USER", loggedInUser );
            return loggedInUser;
        }
    }
}