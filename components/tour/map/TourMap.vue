<template>
  <div class="container tour-map-page-container">
    <p class="land-acknowledgement">
      The filming and creation of this project took place on the unceded and
      occupied Coast Salish territories of the xʷməθkʷəy̓əm (Musqueam),
      Sḵwx̱wú7mesh (Squamish) and səl̓ilwətaɁɬ (Tsleil-Waututh) Nations in the
      community of the Downtown Eastside (DTES) of Vancouver, BC.
    </p>
    <p class="tour-map-instruction">Select a location on the map</p>
    <div class="tour-map-container" @click.self="$emit('click-container')">
      <slot />
    </div>
    <img
      src="~assets/images/legend.svg"
      alt="Legend"
      class="tour-map-page-legend"
    />
    <div id="map-page-bottom-ui" class="columns">
      <div class="column is-one-fifth"></div>
      <div class="column is-half location">
        {{ hoverLocation }}
      </div>
      <div class="column is-one-fifth columns">
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
    hoverLocation: null | String,
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
    otherMap(){
      if(this.region == 'coastal') return {
        title: 'DTES',
        url: '/tour/dtes'
      }
      else if(this.region == 'dtes') return {
        title: 'Coastal',
        url: '/tour/coastal'
      }
    }
  },
  methods: {},
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
}
</style>