<template>
  <div style="display:flex; flex:1 1 auto; flex-direction:column;"> 
    <router-link to="/">Home</router-link>
    <div >
        <router-link to="/veg">Cabbage Identification Center</router-link>
        <router-view v-if="userLoaded"></router-view>
    </div>

  </div>
</template>
<script>

export default {
  name: 'App',
  data(){
    return {
      userLoaded : false
    }
  },
  watch: {},
  methods:{},
  mounted: async function ()
  {
    await this.$store.dispatch(`userStore/fetchUser`);
    this.userLoaded  = true;
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fxDisplay { display:Flex }
.fxStretch { flex : 1 1 auto }
.fxFixed { flex:  0 0 auto }
.fxDirRow { flex-direction:row}
.fxDirCol {flex-direction:column}
</style>
