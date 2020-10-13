<template>
  <div>
    <h1>Speaker Intro</h1>

    <img
      class="profile"
      :src="require(`~/assets/tour/${speaker.profile}`)"
      :alt="`An image of ${speaker.name}`"
    />
    <h3>{{ speaker.name }}</h3>
    <p>{{ speaker.bio }}</p>
    <nuxt-link :to="`/tour/${speaker.slug}/watch`">Watch Interview</nuxt-link>
    <tour-map />
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

<style scoped>
.profile {
  width: 10em;
  border-radius: 50%;
}
</style>