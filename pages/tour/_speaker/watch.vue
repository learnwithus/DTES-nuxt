<template>
  <main class="watch-page">
    <!-- <h1>Speaker Video</h1>
    <h2>{{ speaker.name }}</h2> -->
    <div v-if="videoEnded" class="interview-end-screen">
      <h3>"Video Finished Screen"</h3>
      <vs-button to="/tour" flat border color="#fff" class="back-to-map-button"
        >Continue To Map</vs-button
      >
    </div>
    <v-plyr :options="videoOptions" ref="plyr" id="video-wrapper">
      <video poster="poster.png" src="video.mp4">
        <source :src="videoSource" type="video/mp4" size="720" />
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
      videoEnded: false,
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
    this.player.on("ended", (event) => {
      this.videoEnded = true;
    });
    this.player.on("playing", (event) => {
      this.videoEnded = false;
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
    videoSource() {
      const absoluteUrl = new RegExp("^(?:[a-z]+:)?//", "i");
      return absoluteUrl.test(this.speaker.video)
        ? this.speaker.video
        : require(`~/assets/tour/${this.speaker.video}`);
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

  video {
    object-fit: cover;
    transition: opacity 200ms linear;
  }

  // Styles of paused video overlay
  .plyr__control--overlaid {
    // display: none;
  }

  .plyr__video-wrapper {
    // width: auto;
    position: absolute;
    background-color: black;
  }

  .plyr--paused {
    video {
      opacity: 0.4;
    }
  }
}
.interview-end-screen {
  position: absolute;
  z-index: 5;
  top: $nav-height;
  color: $text-colour-light;
  text-align: center;
  width: 100%;

  .back-to-map-button {
    margin: 0 auto;
  }
}
</style>