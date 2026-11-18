<template>
  <div class="global-background-wrapper">
    <div class="global-background-placeholder"></div>
    <div
      class="global-background-image"
      v-if="dynamicImage"
      lazy="loaded"
      :style="{ backgroundImage: `url(${dynamicImage})` }"
    ></div>
  </div>
</template>

<script>
import { assetUrl } from "~/utils/asset-url";
export default {
  name: "DynamicImage",

  props: {
    src: {
      required: true,
    },
    alt: {
      type: String,
      required: false,
    },
  },

  computed: {
    dynamicImage() {
      return this.src ? assetUrl(`${this.src}`) : false;
    },
  },
};
</script>

<style lang="scss">
.global-background-wrapper {
  z-index: -1;
}
.global-background-placeholder {
  background-color: $colour-primary-dark;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}

.global-background-image {
  position: fixed;
  background-size: cover;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 200ms linear;

  &[lazy="loaded"] {
    opacity: 1;

    .dark & {
      opacity: 0.125;
    }
  }
}
</style>