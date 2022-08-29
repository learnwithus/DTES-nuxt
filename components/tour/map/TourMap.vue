<template>
  <div class="container tour-map-page-container">
    <h1 class="tour-map-title center-text">{{ title }}</h1>
    <div v-if="landAcknowledgement" class="land-acknowledgement">
      <nuxt-content :document="{ body: landAcknowledgement }" />
    </div>
    <div class="tour-map-container" @click.self="$emit('click-container')">
      <slot />
    </div>
    <img
      src="~assets/images/legend.svg"
      alt="Legend"
      class="tour-map-page-legend"
    />
    <div id="map-page-bottom-ui" class="columns">
      <div class="column"></div>
      <div
        class="column is-two-fifths location"
        :class="{ active: hoverLocation }"
      >
        {{ hoverLocation ? hoverLocation : "Select a location on the map" }}
      </div>
      <div class="column columns">
        <vs-button
          id="switch-map-btn"
          class="column"
          size="xl"
          flat
          border
          color="#fff"
          :to="otherMap.url"
          v-tooltip="{
            content: `Switch to the ${otherMap.title} map`,
            offset: 20,
            classes: 'map-tooltip map-page-tooltip',
          }"
          >Switch to {{ otherMap.title }}
        </vs-button>
        <vs-button
          v-if="!tourComplete"
          id="tour-progress-btn"
          class="column"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    region: String,
    title: String,
    hoverLocation: null | String,
    landAcknowledgement: Object,
  },
  async asyncData({ redirect, store, $content }) {
    store.commit("requestDarkBackground");
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
    otherMap() {
      if (this.region == "coastal")
        return {
          title: "DTES",
          url: "/tour/dtes",
        };
      else if (this.region == "dtes")
        return {
          title: "Coastal",
          url: "/tour/coastal",
        };
    },
  },
  methods: {},
};
</script>

<style lang="scss">
.tour-map-title {
  margin: 0;
}
.land-acknowledgement {
  padding: 0 1.5em;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 1em;
  max-width: 46em;
  margin: 0 auto 2em auto;
  font-size: 0.6em;
  margin-top: 2em;
  color: #ffffffa6;


  @include breakpoint(phablet) {
    font-size: 0.7em;
  }

  p {
      text-align: center;
  }

}
.tour-map-page-container {
  margin-top: 2em;
}
#map-page-bottom-ui {
  margin-top: 1em;

  .location {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
    font-style: oblique;
    &:before {
      content: "\00a0";
    }
    &.active {
      opacity: 1;
      font-style: normal;
    }
  }
}
.map-page-tooltip {
  max-width: 250px;
}

.tour-map-page-legend {
  width: 100%;
  max-width: 17em;
  margin: 0 auto;
  display: block;
}

.map-tooltip {
  .tooltip-inner {
    max-width: 160px;
    text-align: center;
    padding: 1em;
    background-color: rgba(0, 0, 0, 0.75);
  }
  .tooltip-arrow {
    border-color: rgba(0, 0, 0, 0.75);
  }
  .tooltip-image {
    border-radius: 50%;
    width: 5em;
    height: 5em;
    margin: 0 auto;
  }
  .video-name {
    font-size: 0.9em;
  }

  &.no-max-width .tooltip-inner {
    max-width: unset;
  }
}
</style>