<template>
  <span @click="$emit('selected', title)">
    {{ title }}
  </span>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>

</style>
