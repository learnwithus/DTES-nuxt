<template>
  <div>
    <div class="container skinny pb-6">
      <h1 class="light-page-title">Resources</h1>
      <nuxt-content :document="resources" class="light-page-content"/>
      </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Resisting Stigma - Resources",
    };
  },
  async asyncData({ $content, params, store }){
        const resources = await $content("resources").fetch();

        return {
            resources
        }
    }
};
</script>

<style>
</style>