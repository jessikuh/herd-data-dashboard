<template>
  <div>
    <template v-if="pageMeta && pageMeta.sections">
      <inner-tab
        v-for="({ label }, index) in pageMeta.sections" :key="index"
        :title="label"
      />
    </template>
  </div>
</template>

<script>
import { fetchPageMeta } from '@/data';

import Tab from '@/components/Tab.vue';

export default {
  name: 'Tabs',
  components: {
    'inner-tab': Tab,
  },
  data() {
    return {
      pageMeta: null,
    };
  },
  async created() {
    this.pageMeta = await fetchPageMeta();
  },
};
</script>

<style>

</style>
