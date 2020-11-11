<template>
  <div class="container tour-map-page-container">
    <p class="tour-map-instruction">Select a location on the map</p>
    <TourMap :interactive="true" :speakers="speakers" />
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
    ...mapGetters(["speakers"]),
  },
};
</script>

<style>
.tour-map-page-container {
  margin-top: 4em;
}
.tour-map-instruction {
  font-style: oblique;
  text-align: center;
  margin-bottom: 3em;
}
</style>