<template>
  <div
    class="speaker-intro-page"
    :style="{
      backgroundImage:
        'url(' + require(`~/assets/tour/${speaker.background}`) + ')',
    }"
  >
    <div class="container">
      <div class="speaker-info">
        <img
          class="profile"
          :src="require(`~/assets/tour/${speaker.profile}`)"
          :alt="`An image of ${speaker.name}`"
        />
        <h3>{{ speaker.name }}</h3>
        <p>{{ speaker.bio }}</p>
        <vs-button :to="`/tour/${speaker.slug}/watch`" flat border color="#fff" class="watch-button">Watch</vs-button>
      </div>
    </div>
    <tour-map class="speaker-map"/>
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

.speaker-intro-page {
  background-size: cover;
}

.speaker-info {
  color: white;
  background: rgba(0, 0, 0, 0.75);
  display: inline-block;
  max-width: 20em;
  text-align: center;
  padding: 2em;
  border-radius: 1em;
  margin-top: 5em;
}

.watch-button{
  margin: 2em auto 0 auto;
  text-transform: uppercase;
  padding: 0.5em;
}

.speaker-map{
  margin-right: 2em;
  display: flex;
  flex-direction: row-reverse;
}
</style>