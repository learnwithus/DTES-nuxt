<template>
  <div>
    <h1>Tour - Speakers</h1>
    <ul>
      <li v-for="speaker in speakers" v-bind:key="speaker.id">
        <nuxt-link :to="`/tour/${speaker.slug}`"
          ><img
            class="profile"
            :src="require(`~/assets/tour/${speaker.profile}`)"
            :alt="`An image of ${speaker.name}`"
          />{{ speaker.name }}</nuxt-link
        >
      </li>
    </ul>
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
    const speakers = await $content("tour/speakers").fetch();

    return {
      speakers,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile {
  width: 7em;
  border-radius: 50%;
}
</style>