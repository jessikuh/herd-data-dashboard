<template>
  <div
    class="absolute top-12 right-0 bg-white p-3 inline-block"
    @click.stop
  >
    <p class="mb-1 text-lg">
      <b>Thresholds</b>
    </p>

    <div
      class="grid grid-cols-2 mb-2"
      v-for="({ shortName, name }, index) in data" :key="index"
    >
      <div class="text-sm">
        {{ name }}
      </div>
      <div>
        <input
          class="bg-gray-100 px-1"
          type="number"
          v-model="thresholds[shortName]"
          placeholder="0"
          @keydown.enter="$emit('close')"
        >
      </div>
    </div>

    <p class="mb-1 mt-4 text-lg">
      <b>Configurations</b>
    </p>
    <div class="grid grid-cols-2">
      <div class="text-sm">
        Decimal places
      </div>
      <div>
        <input
          class="bg-gray-100 px-1"
          type="number"
          :value="decimal"
          placeholder="0"
          @input="$emit('decimal-place', $event.target.value)"
          @change="$emit('decimal-place', $event.target.value)"
          @keydown.enter="$emit('close')"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigurationPanel',
  props: {
    data: {
      type: Array,
      required: true,
    },
    decimalPlace: {
      type: [Number, String],
    },
    thresholds: {
      type: Object,
      required: true,
    },
  },
  computed: {
    decimal: {
      get() {
        return this.decimalPlace;
      },
      set(value) {
        return value;
      },
    },
  },
};
</script>
