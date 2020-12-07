<template>
  <div class="container tour-map-page-container">
    <p class="land-acknowledgement">
      The filming and creation of this project took place on the unceded and
      occupied Coast Salish territories of the xʷməθkʷəy̓əm (Musqueam),
      Sḵwx̱wú7mesh (Squamish) and səl̓ilwətaɁɬ (Tsleil-Waututh) Nations in the
      community of the Downtown Eastside (DTES) of Vancouver, BC.
    </p>
    <p class="tour-map-instruction">Select a location on the map</p>
    <TourMap :interactive="true" />
    <button @click="$store.commit('resetUserProgress')">Reset Progress</button>
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
    ...mapGetters([]),
  },
};
</script>

<style>
.land-acknowledgement {
  padding: 1.5em;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 1em;
  max-width: 45em;
  margin: 0 auto;
  font-size: 0.75em;
  margin-top: 2em;
  color: #ffffffa6;
}
.tour-map-page-container {
  margin-top: 2em;
}
.tour-map-instruction {
  font-style: oblique;
  text-align: center;
  margin-bottom: 1em;
}
</style>