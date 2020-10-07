<template>
  <div>
    <h1>Speaker Intro</h1>
    <p>{{speaker.about}}</p>
    <nuxt-link :to="`/tour/${speaker.slug}/watch`">Watch Interview</nuxt-link>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
    };
  },
  async asyncData({ $content, params }) {
    const speaker = await $content("tour/speakers", params.speaker).fetch();

    return {
      speaker,
    };
  },
};
</script>

<style>
</style>