<template>
  <div class="bg-white mt-2 px-4 py-4">
    <ul class="border-b-2 flex pb-2">
      <li
        class="w-64"
        v-for="({ value, threshold }, index) in data"
        :key="index"
        :class="Number(threshold) && value > threshold ? 'text-red-400' : null"
      >
        {{ value ? value : 'Not provided' }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DataList',
  props: {
    data: {
      type: [Array, Boolean],
      required: true,
    },
  },
};
</script>
