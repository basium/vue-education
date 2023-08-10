import cabbageCollection from '../objects/cabbages.js';
import sproutCollection from '../objects/sprouts.js';

export default
{
    namespaced : true,
    state: {
      cabbages: [],
      sprouts: [],
      currentSprout : {},
      currentCabbage : {}
    },
    mutations: {
      SET_CABBAGES(state, cabbages) {
        state.cabbages = cabbages;
      },
      SET_SPROUTS(state, sprouts) {
        state.sprouts = sprouts;
      },
      SET_CURRENT_CABBAGE_BY_INDEX(state,index)
      {
        /* Check if index within bounds first */
        state.currentCabbage = state.cabbages[index];
      },
      SET_CURRENT_SPROUT_BY_INDEX( state, index )
      {
        state.currentSprout = state.sprouts[index]
      },
      REMOVE_LAST_CABBAGE( state )
      {
        state.cabbages.pop();
      }
    },
    actions: {
        fetchCabbages: function ( context ) {
            const cabbages = cabbageCollection;
            context.commit('SET_CABBAGES', cabbages );
            if( cabbages.length > 0 )
            {
              context.commit("SET_CURRENT_CABBAGE_BY_INDEX",0);
            }
            return cabbages;
        },
        fetchSprouts : function ( context ) {
          const sprouts = sproutCollection;
          context.commit('SET_SPROUTS', sprouts )
          if( sprouts.length > 0 )
          {
            context.commit("SET_CURRENT_SPROUT_BY_INDEX",0);
          }
          return sprouts;
        } 
    },
    getters: {
      getCabbages: (state) => state.cabbages,
      getSprouts: (state) => state.sprouts,
      getCurrentSprout : (state) => state.currentSprout,
      getCurrentCabbage: (state) => state.currentCabbage,
      allVegetables: (state) => [...state.cabbages, ...state.sprouts],
    }
}