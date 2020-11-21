<template>
  <div
    class="bg-blue-400 h-5 inline-flex items-center info
      justify-center ml-1 rounded-full text-sm text-white w-5"
    >
      ?
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  font-family: 'Poppins';
  font-weight: 500;
}
</style>
