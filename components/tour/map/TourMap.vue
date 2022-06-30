<template>
  <div class="container tour-map-page-container">
    <p class="land-acknowledgement">
      The filming and creation of this project took place on the unceded and
      occupied Coast Salish territories of the xʷməθkʷəy̓əm (Musqueam),
      Sḵwx̱wú7mesh (Squamish) and səl̓ilwətaɁɬ (Tsleil-Waututh) Nations in the
      community of the Downtown Eastside (DTES) of Vancouver, BC.
    </p>
    <p class="tour-map-instruction">Select a location on the map</p>
    <slot/>
    <img
      src="~assets/images/legend.svg"
      alt="Legend"
      class="tour-map-page-legend"
    />
    <div id="map-page-bottom-ui" class="columns">
      <div class="column is-one-fifth"></div>
      <div class="column is-half location">{{ locationText }}</div>
      <div class="column is-one-fifth columns">
        <vs-button
          id="switch-map-btn"
          size="xl"
          flat
          border
          color="#fff"
          v-tooltip="{
            content: `Switch to the ... map`,
            offset: 20,
            classes: 'map-tooltip map-page-tooltip',
          }"
          >Switch to ...
        </vs-button>
        <vs-button
          v-if="!tourComplete"
          id="tour-progress-btn"
          size="xl"
          flat
          border
          color="#fff"
          v-tooltip="{
            content: `Visit at least ${tourVideoRequirement} locations and watch \n the videos there to complete the course`,
            offset: 20,
            classes: 'map-tooltip map-page-tooltip',
          }"
          >{{ videosWatchedCount }}/{{ tourVideoRequirement }}
        </vs-button>
        <vs-button
          v-else
          id="tour-progress-btn"
          to="/tour/conclusion"
          size="xl"
          flat
          border
          color="#fff"
          v-tooltip="{
            content: 'You did it! Press this button to complete your journey',
            offset: 20,
            classes: 'map-tooltip map-page-tooltip',
          }"
          >Complete Tour
        </vs-button>
      </div>
    </div>
    <!-- <p class="center-text">
      <small>
        Map and videos for coastal and other community of care and services
        coming soon.
      </small>
    </p> -->
    <!-- <button @click="$store.commit('resetUserProgress')">Reset Progress</button> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ redirect, store, $content }) {
    store.commit("requestDarkBackground");

    return {
      locationText: "",
    };
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