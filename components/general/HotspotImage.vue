<template>
  <div class="hotspot-image-wrapper">
    <img v-bind="dynamicImage" :alt="alt" />
    <VDropdown
      v-for="(hotspot, index) in hotspots"
      v-bind:key="index"
      :style="{ left: hotspot.x, top: hotspot.y }"
      popper-class="hotspot-image-theme"
      class="popover-hotspot"
      :triggers="['hover', 'focus']"
      :distance="12"
      placement="bottom"
    >
      <!-- This will be the popover target (for the events and position) -->
      <button type="button" class="hotspot" :aria-label="hotspot.text"></button>
      <!-- This will be the content of the popover -->
      <template #popper>
        {{ hotspot.text }}
      </template>
    </VDropdown>
  </div>
</template>

<script>
import { responsiveImage } from "~/utils/responsive-image";
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
      return responsiveImage(this.$img, this.src, "content");
    },
  },
};
</script>

<style lang="scss">
.popover-hotspot {
  position: absolute;
  // The wrapper is the popover's reference box, so it must match the dot exactly for the
  // arrow to point at its centre. Keeps the dot where the old margins placed it:
  // centred on x, with its centre 1.875em below y.
  transform: translate(-50%, calc(-50% + 1.875em));
}
.hotspot-image-wrapper {
  position: relative;

  img {
    width: 100%;
  }

  .hotspot {
    box-sizing: content-box;
    padding: 0;
    display: block;
    font: inherit;
    height: 0.75em;
    width: 0.75em;
    border-radius: 50%;
    background: white;
    border: solid 0.5em $colour-accent;
    position: relative;
  }
}
.hotspot-image-theme{
  max-width: 500px;
  font-size: 14px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  // padding: 1em;

  .v-popper__inner {
    padding: 1em;
    border-radius: 5px;
    background: #f9f9f9;
  }
}
</style>