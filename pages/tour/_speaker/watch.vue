<template>
  <main class="watch-page">
    <tour-video :src="speaker.video" :hls="speaker.hls" :poster="speaker.poster" @video-ended="onVideoEnded">
      <template #videoEndScreen>
        <ul class="additional-info" v-if="speaker['additional-info']">
          <li
            v-for="(item, index) in speaker['additional-info']"
            v-bind:key="index"
          >
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </li>
        </ul>
        <vs-button
          to="/tour"
          flat
          border
          color="#fff"
          class="back-to-map-button"
          >Back to Map</vs-button
        >
      </template>
      <template #videoPausedScreen>
        <div class="pause-circle">
          <div class="title">Paused</div>
          <div class="instructions" v-if="!isTouchscreen">
            Click on the screen to continue listening
          </div>
        </div>
        <tour-minimap class="speaker-map" :location="speaker.slug" />
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
  async asyncData({ params, store }) {
    const speaker = store.getters.getSpeakerBySlug(params.speaker);

    return {
      speaker,
      isTouchscreen: false,
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
      this.$store.commit("userWatchedSpeaker", this.speaker.slug);
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
