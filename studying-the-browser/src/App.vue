<template>
  <trippySpinner></trippySpinner>
</template>

<script>

import trippyuSpinner from './components/trippySpinner.vue'
export default {
  name: 'App',
  components: {
    'trippySpinner':trippyuSpinner
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
</style>
