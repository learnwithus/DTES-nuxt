<template>
  <main class="watch-page">
    <h1>Speaker Video</h1>
    <h2>{{ speaker.name }}</h2>
    <v-plyr :options="videoOptions" ref="plyr" id="video-wrapper">
      <video poster="poster.png" src="video.mp4">
        <source
          :src="require(`~/assets/videos/${speaker.video}`)"
          type="video/mp4"
          size="720"
        />
      </video>
    </v-plyr>
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
    };
  },
  async asyncData({ $content, params }) {
    const speaker = await $content("tour/speakers", params.speaker).fetch();

    return {
      speaker,
      videoOptions: {
        fullscreen: { enabled: false },
      },
    };
  },
  computed: {
    player() {
      return this.$refs.plyr.player;
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

.plyr {
  flex: 1 1 auto;
  // width: 100%;
  // height: 100%;
  // width: 100%;
}

#video-wrapper {
  display: flex;
  flex: 1 1 auto;

  .plyr__video-wrapper {
    width: auto;
  }
}
</style>