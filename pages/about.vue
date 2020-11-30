<template>
  <div>
    <div class="container">
      <h1>About</h1>
      <nuxt-content :document="about" />
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
  async asyncData({ $content, params, store }){
        const about = await $content("about").fetch();

        return {
            about
        }
    }
};
</script>

<style>
</style>