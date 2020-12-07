<template>
  <div>
    <div class="container">
      <h1 class="light-page-title">About</h1>
      <nuxt-content :document="about" class="light-page-content"/>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Resisting Stigma - About",
    };
  },
  async asyncData({ $content, params, store }) {
    const about = await $content("about").fetch();

    return {
      about,
    };
  },
};
</script>

<style lang="scss">

</style>