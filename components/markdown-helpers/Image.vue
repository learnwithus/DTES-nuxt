<template>
  <img :src="dynamicImage" :alt="alt" class="markdown-image"/>
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
.markdown-image {
  width: 100%;
}
</style>