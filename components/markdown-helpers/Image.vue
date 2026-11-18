<template>
  <img :src="dynamicImage" :alt="alt" class="markdown-image"/>
</template>

<script>
import { assetUrl } from "~/utils/asset-url";
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
      return assetUrl(`${this.src}`);
    },
  },
};
</script>

<style lang="scss">
.markdown-image {
  width: 100%;
}
</style>