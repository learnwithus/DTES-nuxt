<template>
  <main class="watch-page">
    <tour-video :src="conclusion.video" :hls="conclusion.hls" :poster="conclusion.poster" @video-ended="onVideoEnded">
      <template #videoEndScreen>
        <p></p>
        <vs-button
          to="/tour/reflection"
          flat
          border
          color="#fff"
          class="back-to-map-button"
          >Continue to Reflection</vs-button
        >
      </template>
    </tour-video>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
    };
  },
  async asyncData({ params,  $content }) {
    const conclusion = await $content("tour/conclusion").fetch();

    return {
      conclusion,
    };
  },
  mounted() {
    this.$store.commit("overlayHeader");
  },
  destroyed() {
    this.$store.commit("fixedHeader");
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    onVideoEnded() {

    },
  },
};
</script>

<style lang="scss">
.watch-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

</style>
