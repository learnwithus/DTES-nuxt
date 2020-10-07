<template>
  <div>
    <h1>Speaker Video</h1>
    <h2>{{ speaker.name }}</h2>
    <v-plyr :options="videoOptions" ref="plyr">
      <video poster="poster.png" src="video.mp4">
        <source :src="require(`~/assets/videos/${speaker.video}`)" type="video/mp4" size="720" />
      </video>
    </v-plyr>
  </div>
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

<style>
</style>