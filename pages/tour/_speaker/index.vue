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
        <tour-minimap class="speaker-map" :location="speaker.slug" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
    };
  },
  async asyncData({ params, store }) {
    const speaker = store.getters.getSpeakerBySlug(params.speaker);

    store.commit("setBackgroundImage", `tour/${speaker.background}`);

    return {
      speaker,
    };
  },
  mounted() {},
  computed: {
    speakerType() {
      if (this.speaker.type.toLowerCase() == "peer") {
        return "Peer";
      } else return "Organization";
    },
    ...mapGetters([]),
  },
};
</script>

<style scoped lang="scss">
.speaker-container {
  align-items: flex-end;
  justify-content: space-between;
  height: calc(100% - 5em);
  padding-bottom: 5em;
  text-align: center;

  @include breakpoint(phablet) {
    display: flex;
  }
}

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
  align-self: start;
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
  margin-top: 4em;
}
</style>