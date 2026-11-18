<template>
  <main class="watch-page">
    <tour-video
      :src="intro.video"
      :hls="intro.hls"
      :poster="intro.poster"
      @video-ended="onVideoEnded"
    >
      <template #videoEndScreen>
        <nuxt-content
          :document="intro"
          class="light-page-document intro-document"
        />
        <vs-button
          to="/tour"
          flat
          border
          color="#fff"
          class="back-to-map-button"
          >Continue to Map</vs-button
        >
      </template>
    </tour-video>
  </main>
</template>

<script>
import { defineCoursePage } from "~/utils/course-page";
import { courseDocument } from "~/utils/course-content";
import { mapGetters } from "vuex";
export default defineCoursePage({
  head() {
    return {
      title: "Resisting Stigma - Tour",
    };
  },
  loadPage({ store, params }) {
    const intro = courseDocument("tour/intro");

    return {
      intro,
    };
  },
  mounted() {
    this.$store.commit("overlayHeader");
  },
  beforeUnmount() {
    this.$store.commit("fixedHeader");
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    onVideoEnded() {},
  },
});
</script>

<style lang="scss">
.watch-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.intro-document {
  text-align: left;
  margin-bottom: 3rem;
}
</style>
