<template>
  <div class="container">
    <h1>Tour</h1>
    <nuxt-link to="/tour/speakers">Speakers</nuxt-link>
    <template>
      <div class="center grid">
        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="5">
            <h2>Interactive Documentary</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque vel erat at augue accumsan cursus ac eget turpis.
              Praesent lectus felis, blandit vel facilisis eget, commodo sit
              amet tortor. Vivamus porta magna at mollis feugiat. Suspendisse
              eget tortor enim. Nulla auctor nisi at tortor lacinia maximus. Sed
              vehicula pretium lacus ac vestibulum. In id tempus eros. In
              eleifend, purus fermentum vehicula porta, orci justo placerat
              libero, eget iaculis lorem nunc in sapien.
            </p>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="5" offset="1">
            <h2>HOW TO USE</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque vel erat at augue accumsan cursus ac eget turpis.
              Praesent lectus felis, blandit vel facilisis eget, commodo sit
              amet tortor. Vivamus porta magna at mollis feugiat. Suspendisse
              eget tortor enim. Nulla auctor nisi at tortor lacinia maximus. Sed
              vehicula pretium lacus ac vestibulum. In id tempus eros. In
              eleifend, purus fermentum vehicula porta, orci justo placerat
              libero, eget iaculis lorem nunc in sapien. Click on the video to
              pause.
            </p>
          </vs-col>
        </vs-row>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
    };
  },
};
</script>

<style>
</style>