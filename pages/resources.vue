<template>
  <div>
    <div class="container">
      <h1>Resources</h1>
      <nuxt-content :document="resources" />
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