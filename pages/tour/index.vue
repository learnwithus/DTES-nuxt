<template>
  <div class="container">Map</div>
</template>

<script>
export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
    };
  },
  async asyncData({ redirect, store }) {
    // If the user hasn't been to the tour intro page yet, redirect them there first
    if (!store.state.tour.started) {
      redirect("/tour/intro");
    }
  },
};
</script>

<style>
</style>