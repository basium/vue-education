

<template>
  <div class="employee">
    <h1>This is the employee page </h1>
    <div>And your name is {{name}}</div>
    <div>And you are 
        <span v-if="onleave" style="color:green;font-weight:bold ">on leave </span>  
        <span v-if="!onleave" style="color:indigo;font-weight:bold">working </span>  
        today    
    </div>
    <div v-if="isAdmin"> You are an <span style="color:red"> administrator</span></div>
  </div>
</template>
<script>
    export default 
    {
        data: function ()
        {
            return {
                name: this.$route.params.name,
                onleave: this.$route.query.onleave==='true'?true:false,
                isAdmin: this.$route.meta.isAdmin==='true'? true:false
            }
        }
    }
</script>