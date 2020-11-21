<template>
  <div class="inline-flex relative">
    <div
      class="bg-blue-400 cursor-pointer h-5 items-center info inline-flex
        justify-center ml-1 rounded-full text-sm text-white w-5"
    >
      ?
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
  mounted() {
    this.displayInfo();
  },
  methods: {
    displayInfo() {
      const el = this.$el;
      const tooltip = document.createElement('div');
      tooltip.classList = 'absolute bg-blue-400 leading-normal p-2 text-sm text-white w-80';

      el.addEventListener('mousemove', (event) => {
        tooltip.innerHTML = `<b>Short Name:</b> ${this.data.shortName}

        <p><b>Description:</b> ${this.data.description}</p>`;
        tooltip.style.left = `${event.pageX + 15}px`;
        tooltip.style.top = `${event.pageY}px`;

        document.body.appendChild(tooltip);
      });

      el.addEventListener('mouseout', () => {
        document.body.removeChild(tooltip);
      });
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
