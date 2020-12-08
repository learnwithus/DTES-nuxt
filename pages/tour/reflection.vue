<template>
  <div class="container">
      <h1 class="light-page-title">Refelction</h1>
      <nuxt-content :document="conclusion" class="light-page-document"/>
  </div>
</template>

<script>
export default {
    async asyncData({ $content, params, store }){
        const conclusion = await $content("tour/conclusion").fetch();

        return {
            conclusion
        }
    }
}
</script>

<style>

</style>