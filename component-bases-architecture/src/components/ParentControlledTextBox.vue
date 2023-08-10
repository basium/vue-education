<template>
  <div>
    <input type="text" :value="value" @input="updateName" />
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    updateName(event) {

      this.$emit('valueChanged', event.target.value);
    }
  },
};
</script>