<template>
  <div class="hotspot-image-wrapper">
    <img :src="dynamicImage" :alt="alt" />
    <v-popover
      v-for="(hotspot, index) in hotspots"
      v-bind:key="index"
      :style="{left: hotspot.x, top: hotspot.y}"
      class="popover-hotspot"
      trigger="hover"
      offset="25"
    >
      <!-- This will be the popover target (for the events and position) -->
      <div class="hotspot"></div>
      <!-- This will be the content of the popover -->
      <template slot="popover">
          {{hotspot.text}}
      </template>
    </v-popover>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
    },
    hotspots: {
      type: Array,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    dynamicImage() {
      return require(`~/assets/${this.src}`);
    },
  },
};
</script>

<style lang="scss">
.popover-hotspot {
  position: absolute;
}
.hotspot-image-wrapper {
  position: relative;

  img {
    width: 100%;
  }

  .hotspot {
    height: 1em;
    width: 1em;
    margin-left: -0.5em;
    border-radius: 50%;
    background: orange;
    position: absolute;
  }
}
</style>