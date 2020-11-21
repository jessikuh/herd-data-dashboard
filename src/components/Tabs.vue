<template>
  <div>
    <template v-if="pageMeta && pageMeta.sections">
      <ul class="border-b-4 border-opacity-100 cursor-pointer font-bold flex tabs text-sm">
        <li
          v-for="({ label }, index) in pageMeta.sections" :key="index"
          class="hover:text-gray-800 py-2 relative text-gray-500 uppercase"
          :class="active === label ? 'active' : null"
        >
          <inner-tab :title="label" @selected="changeTab" />
        </li>
      </ul>
    </template>

    <div class="mt-6 text-gray-500">
      <div
        class="px-4 py-2 flex text-xs uppercase"
        v-if="activeItems.length > 0"
      >
        <div
          v-for="({ name, shortName, description }) in activeItems"
          :key="name"
          class="w-44"
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

      <div class="bg-white mt-2 px-4 py-4">
        <ul class="border-b-2 flex pb-2">
          <li
            class="w-44"
            v-for="(item, index) in activeData" :key="index"
          >
            {{ item ? item : 'N/A' }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-all
import { fetchPageMeta, fetchItemMeta, fetchAnimalData } from '@/data';

import Info from '@/components/Info.vue';
import Tab from '@/components/Tab.vue';

export default {
  name: 'Tabs',
  components: {
    info: Info,
    'inner-tab': Tab,
  },
  data() {
    return {
      active: 'Basic',
      animalData: null,
      itemMeta: null,
      pageMeta: null,
    };
  },
  computed: {
    activePage() {
      if (this.pageMeta && this.pageMeta.sections) {
        const page = this.pageMeta.sections.find(({ label }) => label === this.active);

        return page;
      }

      return null;
    },
    activeItems() {
      if (this.activePage) {
        const { items } = this.activePage;

        return items.map((item) => this.itemMeta.find(({ shortName }) => shortName === item))
          .filter((i) => i !== undefined);
      }

      return false;
    },
    activeData() {
      if (this.activeItems) {
        return this.activeItems.map(({ shortName }) => {
          const keys = Object.keys(this.animalData);

          if (keys.includes(shortName)) return this.animalData[shortName];

          return null;
        });
      }

      return false;
    },
  },
  async created() {
    this.animalData = await fetchAnimalData();
    this.itemMeta = await fetchItemMeta();
    this.pageMeta = await fetchPageMeta();
  },
  mounted() {
  },
  methods: {
    changeTab(title) {
      this.active = title;
    },
  },
};
</script>

<style lang="scss">
.tabs {
  font-family: 'Poppins', sans-serif;

  li {
    user-select: none;

    + li {
      margin-left: 30px;
    }

    &.active,
    &:hover {
      &::after {
        background-color: rgb(96, 165, 250);
        bottom: -4px;
        content: '';
        display: inline;
        height: 4px;
        left: 0;
        position: absolute;
        width: 100%;
      }
    }
  }
}
</style>
