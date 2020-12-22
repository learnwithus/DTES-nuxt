<template>
  <div class="container">
    <h1 class="light-page-title">Reflection</h1>
    <nuxt-content :document="conclusion" class="light-page-document" />
    <br />
    <vs-button to="/tour" size="xl" flat border>Back to Map </vs-button>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, store }) {
    const conclusion = await $content("tour/conclusion").fetch();

    return {
      conclusion,
    };
  },
};
</script>

<style>
</style>