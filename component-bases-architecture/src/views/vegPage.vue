<template>
    <div class="vegatableContainer">
        <cabbage-identifier></cabbage-identifier>
    </div>
</template>
<script>
    import cabbageIdentifier from '../components/CabbageIdentifier.vue'
    export default {
        components : {
            'cabbage-identifier': cabbageIdentifier
        }
    }
</script>