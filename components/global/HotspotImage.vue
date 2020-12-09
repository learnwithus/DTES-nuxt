<template>
  <div class="hotspot-image-wrapper">
    <img :src="dynamicImage" :alt="alt" />
    <v-popover
      v-for="(hotspot, index) in hotspots"
      v-bind:key="index"
      :style="{ left: hotspot.x, top: hotspot.y }"
      popoverClass="hotspot-image-theme"
      class="popover-hotspot"
      trigger="hover"
      offset="25"
    >
      <!-- This will be the popover target (for the events and position) -->
      <div class="hotspot"></div>
      <!-- This will be the content of the popover -->
      <template slot="popover">
        {{ hotspot.text }}
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
    height: 0.75em;
    width: 0.75em;
    margin-left: -0.85em;
    border-radius: 50%;
    background: white;
    border: solid 0.5em $colour-accent;
    position: absolute;
  }
}
.hotspot-image-theme{
  max-width: 500px;
  font-size: 14px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  // padding: 1em;

  .tooltip-inner.popover-inner {
    padding: 1em;
  }
}
</style>