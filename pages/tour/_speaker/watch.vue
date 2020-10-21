<template>
  <main class="watch-page">
    <!-- <h1>Speaker Video</h1>
    <h2>{{ speaker.name }}</h2> -->
    <v-plyr :options="videoOptions" ref="plyr" id="video-wrapper">
      <video poster="poster.png" src="video.mp4">
        <source
          :src="videoSource"
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
  mounted() {
    this.$store.commit("overlayHeader");

    // Add event listers for when player controls are shown and hidden and use them to show and hide the navbar
    this.player.on("controlsshown", (event) => {
      this.$store.commit("showHeader");
    });
    this.player.on("controlshidden", (event) => {
      this.$store.commit("hideHeader");
    });

    // Play the video (if the browser lets us)
    this.player.play();
  },
  destroyed() {
    this.$store.commit("fixedHeader");
  },
  computed: {
    player() {
      return this.$refs.plyr.player;
    },
    videoSource(){
      const absoluteUrl = new RegExp('^(?:[a-z]+:)?//', 'i');
      return absoluteUrl.test(this.speaker.video) ? this.speaker.video : require(`~/assets/tour/${this.speaker.video}`);
    }
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

  video {
    object-fit: cover;
  }

  .plyr__video-wrapper {
    // width: auto;
    position: absolute;
  }
}
</style>