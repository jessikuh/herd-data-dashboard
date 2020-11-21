<template>
  <div @click="$emit(title)">
    {{ title }}
  </div>
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
