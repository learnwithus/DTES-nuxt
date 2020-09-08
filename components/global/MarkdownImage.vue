<template>
  <img :src="dynamicImage" :alt="alt" />
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