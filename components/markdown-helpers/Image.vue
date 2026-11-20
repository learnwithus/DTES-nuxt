<template>
  <img v-bind="dynamicImage" :alt="alt" class="markdown-image" loading="lazy" />
</template>

<script>
import { responsiveImage } from "~/utils/responsive-image";
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
      return responsiveImage(this.$img, this.src, "content");
    },
  },
};
</script>

<style lang="scss">
.markdown-image {
  width: 100%;
}
</style>