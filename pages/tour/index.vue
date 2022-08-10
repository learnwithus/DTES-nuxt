<template>
  <div class="container">
    <h1 class="center-text pt-5">Select a Region</h1>
    <p class="center-text pb-5">You can explore both regions during your tour</p>
    <nav>
      <nuxt-link to="/tour/dtes">
        <TourMapDTES class="map" :simple="true" :interactive="false" />
        <p class="center-text">Downtown Eastside</p>
      </nuxt-link>
      <nuxt-link to="/tour/coastal">
        <TourMapCoastal class="map" :simple="true" :interactive="false" />
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
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @include breakpoint(phablet) {
    flex-direction: row;
    gap: 10%;
  }

  a {
    border-bottom: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:first-child {
      width: 85%;
      @include breakpoint(phablet) {
        width: 65%;
      }
    }
    &:last-child {
      width: 70%;
      @include breakpoint(phablet) {
        width: 35%;
      }
    }

    &:hover, &:focus {
      .map {
        transform: scale(1.05);
      }
    }

    .map {
        transition: transform 175ms ease-out;
      }
  }
}
</style>