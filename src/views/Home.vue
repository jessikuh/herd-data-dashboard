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
      @click="toggleConfigurations"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    </button>

    <div class="threshold" v-if="showPanel">
      <configuration-panel
        :data="thresholdAvailable"
        :decimal-place="decimal"
        :thresholds="thresholds"
        @decimal-place="changeDecimal"
        @close="showPanel = false"
      />
    </div>
  </div>
</template>

<script>
// eslint-disable-all
import { fetchPageMeta, fetchItemMeta, fetchAnimalData } from '@/data';

import ConfigurationPanel from '@/components/ConfigurationPanel.vue';
import DataHeaders from '@/components/DataHeaders.vue';
import DataList from '@/components/DataList.vue';
import Tab from '@/components/Tab.vue';

export default {
  name: 'Home',
  components: {
    'configuration-panel': ConfigurationPanel,
    'data-headers': DataHeaders,
    'data-list': DataList,
    'inner-tab': Tab,
  },
  data() {
    return {
      active: 'Basic',
      animalData: null,
      decimal: 3,
      itemMeta: null,
      pageMeta: null,
      showPanel: false,
      thresholds: {},
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
            let value = this.animalData[shortName];

            if (dataType === 'Decimal') value = value.toFixed(this.decimal);

            list = {
              shortName,
              dataType,
              value,
              threshold: this.thresholds[shortName],
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
    changeDecimal(value) {
      this.decimal = value;
    },
    changeTab(title) {
      this.active = title;
    },
    toggleConfigurations(event) {
      event.stopPropagation();

      this.showPanel = !this.showPanel;

      if (this.showPanel) {
        window.addEventListener('click', () => {
          this.showPanel = false;
        });
      } else {
        window.removeEventListener('click', () => {
          this.showPanel = false;
        });
      }
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

    &.active {
      color: rgb(31,41,55);
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
