<template>
  <div class="container">
    <p class="center-text pt-5 pb-6">Pick a Map</p>
    <nav>
      <nuxt-link to="/tour/dtes">
        <TourMapDTES :simple="true" />
        <p class="center-text">Downtown Eastside</p>
      </nuxt-link>
      <nuxt-link to="/tour/coastal">
        <TourMapCoastal :simple="true"/>
        <p class="center-text">Coastal</p>
      </nuxt-link>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
      // Preload the videos profile pictures and background images so the user doesn't have to wait when they click on them
      link: [
        ...this.videos.map((video) => ({
          rel: "preload",
          href: require(`~/assets/tour/${video.profile}`),
          as: "image",
        })),
        ...this.videos.map((video) => ({
          rel: "preload",
          href: require(`~/assets/tour/${video.background}`),
          as: "image",
        })),
      ],
    };
  },
  async asyncData({ redirect, store, $content }) {
    store.commit("requestDarkBackground");

    return {};
  },
  mounted() {
    // If the user hasn't been to the tour intro page yet, redirect them there first
    // if (!this.$store.state.tour.started) {
    //   this.$router.push("/tour/intro");
    //   return;
    // }
  },
  computed: {
    ...mapGetters([
      "userProgress",
      "tourVideoRequirement",
      "tourComplete",
      "videos",
    ]),
    videosWatchedCount() {
      return this.userProgress.videos.length;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  gap: 5em;

  a {
    border-bottom: none;
    display: flex;
    flex-direction: column;
  }
}
</style>