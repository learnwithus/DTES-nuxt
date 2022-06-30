<template>
  <TourMap>
    <TourMapDTES/>
  </TourMap>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
      // Preload the videos profile pictures and background images so the user doesn't have to wait when they click on them
      link: [
        ...this.dtesVideos.map((video) => ({
          rel: "preload",
          href: require(`~/assets/tour/${video.profile}`),
          as: "image",
        })),
        ...this.dtesVideos.map((video) => ({
          rel: "preload",
          href: require(`~/assets/tour/${video.background}`),
          as: "image",
        })),
      ],
    };
  },
  async asyncData({ redirect, store, $content }) {
    store.commit("requestDarkBackground");

    return {
      locationText: "",
    };
  },
  mounted() {

  },
  computed: {
    ...mapGetters([
      "userProgress",
      "tourVideoRequirement",
      "tourComplete",
      "dtesVideos",
    ]),
  },
  methods: {
    onLocationHover(location) {
      this.locationText = location;
    },
  },
};
</script>

<style lang="scss">
.land-acknowledgement {
  padding: 1.5em;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 1em;
  max-width: 45em;
  margin: 0 auto;
  font-size: 0.6em;
  margin-top: 2em;
  color: #ffffffa6;

  @include breakpoint(phablet) {
    font-size: 0.75em;
  }
}
.tour-map-page-container {
  margin-top: 2em;
}
.tour-map-instruction {
  font-style: oblique;
  text-align: center;
  margin-bottom: 1em;
}
#map-page-bottom-ui {
  // margin-top: 1em;

  .location {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    &:before {
      content: "\00a0";
    }
  }
}
.map-page-tooltip {
  max-width: 250px;
}
#tour-progress-btn {
  float: right;
}
.tour-map-page-legend {
  width: 100%;
  max-width: 17em;
  margin: 0 auto;
  display: block;
}
</style>