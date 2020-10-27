<template>
  <div class="container tour-map-page-container">
    <TourMap :interactive="true" :speakers="speakers"/>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
    };
  },
  async asyncData({ redirect, store, $content }) {
    // If the user hasn't been to the tour intro page yet, redirect them there first
    if (!store.state.tour.started) {
      redirect("/tour/intro");
    }

    store.commit("requestDarkBackground");

    const speakers = await $content("tour/speakers").fetch();

    return {
      speakers,
    };
  },
};
</script>

<style>
.tour-map-page-container {
  margin-top: 5em;
}
</style>