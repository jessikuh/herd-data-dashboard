<template>
  <div class="bg-white mt-2 px-4 py-4">
    <ul class="border-b-2 flex pb-2">
      <li
        class="w-64"
        v-for="(item, index) in data"
        :key="index"
      >
        {{ item ? item : 'N/A' }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DataList',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
