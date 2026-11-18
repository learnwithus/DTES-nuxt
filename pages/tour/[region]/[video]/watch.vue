<template>
  <main class="watch-page">
    <tour-video :src="video.video" :hls="video.hls" :subtitles="video.subtitles" :poster="video.poster" @video-ended="onVideoEnded">
      <template #videoEndScreen>
        <ul class="additional-info" v-if="video['additional-info']">
          <li
            v-for="(item, index) in video['additional-info']"
            v-bind:key="index"
          >
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </li>
        </ul>
        <vs-button
          :to="`/tour`"
          flat
          border
          color="#fff"
          class="back-to-tour-button"
          >Back to Tour</vs-button
        >
      </template>
      <template #videoPausedScreen>
        <tour-minimap class="video-map" :location="video.slug" :region="region" />
      </template>
    </tour-video>
  </main>
</template>

<script>
import { defineCoursePage } from "~/utils/course-page";
import { mapGetters } from "vuex";
export default defineCoursePage({
  head() {
    return {
      title: "Resisting Stigma - Tour",
    };
  },
  loadPage({ store, params }) {
    const video = store.getters.getVideoBySlug(params.video);
    if (!video || video.region !== params.region) throw createError({ statusCode: 404, statusMessage: "Video not found" });
    const region = params.region;

    return {
      video,
      region,
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
      this.$store.commit("userWatchedVideo", this.video.slug);
    },
  },
});
</script>

<style lang="scss" scoped>
.watch-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.additional-info {
  list-style: none;
  text-align: left;
}

.back-to-tour-button {
  margin: 2em auto 0 auto;
}
</style>
