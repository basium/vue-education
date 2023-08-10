<template>
    <div class="Veg">   
        <h1>Vegitable Identification helper.</h1>
        <div>
            <h3> These is a cabbage </h3>
            <img style="width:200px; height:200px;" :src="currentCabbageImage"/>    
            <div>{{currentCabbage.name}}</div>
        </div>
        <div>
            <h3> These is a sprout: </h3>
            <img style="width:200px; height:200px;" :src="currentSproutImage"/>
            <div>{{currentSprout.name}}</div>
        </div>
        <button @click="nextImages">Next</button>
        <button @click="popCabbage">POP</button>
    </div>
</template>
<script>
import vegPicsHelper from '../helpers/vegPicsHelper.js';
export default 
{
    data : function (){
        return {
           
        }
    },
   computed: {
        cabbages() {
            return this.$store.getters[`vegStore/getCabbages`];
        },
        sprouts() {
            return this.$store.getters[`vegStore/getSprouts`];
        },
        allVegetables() {
            return this.$store.getters[`vegStore/allVegetables`];
        },
        currentCabbage()
        {
         return this.$store.getters[`vegStore/getCurrentCabbage`];   
        },
        currentCabbageImage()
        {
            if( this.currentCabbage && this.currentCabbage.pic ){
                return vegPicsHelper.getImage( this.currentCabbage.pic ).src;
            }
            else {
                return ""
            }
            
        },
        currentSprout()
        {
         return this.$store.getters[`vegStore/getCurrentSprout`];   
        },
        currentSproutImage()
        {
            if( this.currentSprout && this.currentSprout.pic  )
            {
                return vegPicsHelper.getImage( this.currentSprout.pic ).src;
            }
            else {
                return ""
            }

        }

    }, 
    beforeCreate : async function () {
        await this.$store.dispatch(`vegStore/fetchCabbages`);
        await this.$store.dispatch(`vegStore/fetchSprouts`);
    },
    methods: {
        popCabbage : function () 
        {
            this.$store.commit('vegStore/REMOVE_LAST_CABBAGE');
        },
        nextImages : function () 
        {
            if( !this.currentCabbage || !this.currentCabbage.name )
            {
             this.$store.commit('vegStore/SET_CURRENT_CABBAGE_BY_INDEX',0);
            }
            if( !this.currentSprout || !this.currentSprout.name )
            {
               this.$store.commit('vegStore/SET_CURRENT_SPROUT_BY_INDEX',0);
            }

            if( this.currentCabbage && this.currentCabbage.name )
            {
                let currentCabbageIndex = this.cabbages.indexOf( this.currentCabbage ),
                    nextCabbageIndex = ( currentCabbageIndex+1 <= this.cabbages.length-1)? currentCabbageIndex+1 : 0;
                    this.$store.commit('vegStore/SET_CURRENT_CABBAGE_BY_INDEX',nextCabbageIndex);
            }
            if( this.currentSprout && this.currentSprout.name )
           {
                let currentSproutIndex = this.sprouts.indexOf( this.currentSprout ),
                    nextSproutIndex = ( currentSproutIndex+1 <= this.sprouts.length-1)? currentSproutIndex+1 : 0;
                     this.$store.commit('vegStore/SET_CURRENT_SPROUT_BY_INDEX',nextSproutIndex);
            }  
        }
    }
}
</script>