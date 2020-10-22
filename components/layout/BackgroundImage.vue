<template>
  <div class="global-background-wrapper">
    <div class="global-background-placeholder"></div>
    <div
      class="global-background-image"
      v-lazy:background-image="dynamicImage"
    ></div>
  </div>
</template>

<script>
export default {
  name: "DynamicImage",

  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
    },
  },

  computed: {
    dynamicImage() {
      return require(`~/assets/${this.src}`);
    },
  },
};
</script>

<style lang="scss">
.global-background-wrapper {
    z-index: -1;
}
.global-background-placeholder {
  background-color: $colour-primary;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.global-background-image {
  position: absolute;
  background-size: cover;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 200ms linear;

  &[lazy="loaded"] {
    opacity: 1;
  }
}
</style>