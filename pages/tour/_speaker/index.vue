<template>
  <div>
    <div class="speaker-intro-page">
      <div class="container speaker-container">
        <div class="speaker-info">
          <img
            class="profile"
            :src="require(`~/assets/tour/${speaker.profile}`)"
            :alt="`An image of ${speaker.name}`"
          />
          <h3>{{ speaker.name }}</h3>
          <div class="speaker-type">{{ speakerType }}</div>
          <p>{{ speaker.bio }}</p>
          <vs-button
            :to="`/tour/${speaker.slug}/watch`"
            flat
            border
            color="#fff"
            class="watch-button"
            >Watch</vs-button
          >
        </div>
      </div>
      <tour-map :speakers="speakers" class="speaker-map" />
    </div>
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
    const speakers = await $content("tour/speakers").fetch();

    return {
      speaker,
      speakers,
    };
  },
  mounted(){
    this.$store.commit("setBackgroundImage", `tour/${this.speaker.background}`);
  },
  computed: {
    speakerType() {
      if (this.speaker.type.toLowerCase() == "peer") {
        return "Peer";
      } else return "Organization";
    },
  }
};
</script>

<style scoped lang="scss">
.profile {
  width: 10em;
  border-radius: 50%;
}

.speaker-intro-page {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  // .container {
  //   position: relative;
  // }
}

.speaker-info {
  color: white;
  background: rgba(0, 0, 0, 0.75);
  display: inline-block;
  max-width: 20em;
  text-align: center;
  padding: 2em;
  border-radius: 1em;
  margin-top: 7em;
}

.speaker-type {
  font-style: oblique;
}

.watch-button {
  margin: 2em auto 0 auto;
  text-transform: uppercase;
  padding: 0.5em;
}

.speaker-map {
  margin-right: 2em;
  display: flex;
  flex-direction: row-reverse;
}
</style>