

<template>
  <div class="cat">
    <h1>This is the cat page</h1>
    <div>And the cat's name is  {{name}}</div>
    <div>And it is 
        <span v-if="inside" style="color:green;font-weight:bold ">inside </span>  
        <span v-if="!inside" style="color:red;font-weight:bold">outside! </span>  
    </div>
    <div v-if="isNeutered"> The cat is <span style="color:red"> neutered</span></div>
  </div>
</template>
<script>
    export default 
    {
        props : 
        {
            name : {default:''},
            inside : {default:true},
            neutered: {default:false}
        },
        mounted : function () 
        {
            /* Just to proove the point. The $route variable is still accessible */
            console.log( `name=${this.$route.params.name}, inside=${this.$route.query? this.$route.query.inside : false}, isNeutered=${this.$route.meta?this.$route.meta.isNeutered: false }` )
        }
    } 
</script>