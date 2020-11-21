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
      <data-headers :data="activeHeaders" />

      <data-list :data="activeData" />
    </div>

    <button
      class="absolute bg-blue-400 hover:bg-blue-500 rounded right-0 top-2 py-1 px-2 text-white"
      @click="showThreshold = !showThreshold"
    >
      Update Thresholds
    </button>

    <div class="threshold" v-if="showThreshold">
      <div class="absolute top-12 right-0 bg-white p-3 inline-block">
        <div
          class="grid grid-cols-2 mb-2"
          v-for="({ shortName, name }, index) in thresholdAvailable" :key="index"
        >
          <div>
            {{ name }}
          </div>
          <div>
            <input
              class="bg-gray-100"
              type="number"
              v-model="threshold[shortName]"
              placeholder="0"
              @keydown.enter="showThreshold = !showThreshold"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-all
import { fetchPageMeta, fetchItemMeta, fetchAnimalData } from '@/data';

import DataHeaders from '@/components/DataHeaders.vue';
import DataList from '@/components/DataList.vue';
import Tab from '@/components/Tab.vue';

export default {
  name: 'Tabs',
  components: {
    'data-headers': DataHeaders,
    'data-list': DataList,
    'inner-tab': Tab,
  },
  data() {
    return {
      active: 'Basic',
      animalData: null,
      itemMeta: null,
      pageMeta: null,
      showThreshold: false,
      threshold: {},
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
    activeHeaders() {
      if (this.activePage) {
        const { items } = this.activePage;

        return items.map((item) => this.itemMeta.find(({ shortName }) => shortName === item))
          .filter((i) => i !== undefined);
      }

      return false;
    },
    activeData() {
      if (this.activeHeaders) {
        return this.activeHeaders.map(({ shortName }) => {
          const keys = Object.keys(this.animalData);
          const { dataType } = this.itemMeta.find((item) => item.shortName === shortName);
          let list;

          if (keys.includes(shortName)) {
            list = {
              shortName,
              dataType,
              value: this.animalData[shortName],
              threshold: this.threshold[shortName],
            };
          }

          return list;
        });
      }

      return false;
    },
    thresholdAvailable() {
      return this.itemMeta.filter((item) => item.dataType === 'Integer' || item.dataType === 'Decimal');
    },
  },
  async created() {
    this.animalData = await fetchAnimalData();
    this.itemMeta = await fetchItemMeta();
    this.pageMeta = await fetchPageMeta();
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
