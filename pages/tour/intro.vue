<template>
  <div class="container">
    <h1>Tour</h1>
    <div class="columns is-variable is-8">
      <div class="column">
        <h2>Interactive Documentary</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          vel erat at augue accumsan cursus ac eget turpis. Praesent lectus
          felis, blandit vel facilisis eget, commodo sit amet tortor. Vivamus
          porta magna at mollis feugiat. Suspendisse eget tortor enim. Nulla
          auctor nisi at tortor lacinia maximus. Sed vehicula pretium lacus ac
          vestibulum. In id tempus eros. In eleifend, purus fermentum vehicula
          porta, orci justo placerat libero, eget iaculis lorem nunc in sapien.
        </p>
      </div>
      <div class="column">
        <h2>HOW TO USE</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          vel erat at augue accumsan cursus ac eget turpis. Praesent lectus
          felis, blandit vel facilisis eget, commodo sit amet tortor. Vivamus
          porta magna at mollis feugiat. Suspendisse eget tortor enim. Nulla
          auctor nisi at tortor lacinia maximus. Sed vehicula pretium lacus ac
          vestibulum. In id tempus eros. In eleifend, purus fermentum vehicula
          porta, orci justo placerat libero, eget iaculis lorem nunc in sapien.
          Click on the video to pause.
        </p>
      </div>
    </div>
    <nuxt-link to="/tour">Begin</nuxt-link>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
    };
  },
  mounted() {
    this.$store.commit("beginTour");
  },
};
</script>

<style lang="scss">
</style>