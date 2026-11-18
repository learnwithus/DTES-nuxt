<template>
  <main class="watch-page">
    <tour-video :src="conclusion.video" :hls="conclusion.hls" :poster="conclusion.poster" @video-ended="onVideoEnded">
      <template #videoEndScreen >
        <nuxt-content :document="conclusion" class="light-page-document conclusion-document" />
        <vs-button
          to="/tour"
          @click="$store.commit('resetUserProgress')"
          flat
          border
          color="#fff"
          class="back-to-map-button"
          >Back to Map</vs-button
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
    const conclusion = courseDocument("tour/conclusion");

    return {
      conclusion,
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
    onVideoEnded() {

    },
  },
});
</script>

<style lang="scss">
.watch-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.conclusion-document {
  text-align: left;
  margin-bottom: 3rem;
}

</style>
