<template>
  <div class="px-4 py-2 flex text-xs uppercase">
    <div
      v-for="({ name, shortName, description }) in data"
      :key="name"
      class="w-64"
    >
      {{ name }}

      <info
        :data="{
          shortName,
          description
        }"
      />
    </div>
  </div>
</template>

<script>
import Info from '@/components/Info.vue';

export default {
  name: 'DataHeaders',
  props: {
    data: {
      type: [Array, Boolean],
      required: true,
    },
  },
  components: {
    info: Info,
  },
};
</script>
