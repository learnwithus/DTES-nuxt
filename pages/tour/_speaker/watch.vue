<template>
  <main class="watch-page">
    <!-- <h1>Speaker Video</h1>
    <h2>{{ speaker.name }}</h2> -->
    <div class="interview-overlay">
      <transition name="fade" mode="out-in">
        <div v-if="videoEnded" id="interview-end-screen" class="container">
          <!-- <h3>"Video Finished Screen"</h3> -->
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
        </div>
        <div v-else-if="videoPaused" id="interview-pause-screen">
          <!-- <transition name="zoom-fade" mode="in-out" appear> -->
          <div class="pause-circle" v-if="videoPaused">
            <div class="title">Paused</div>
            <div class="instructions">
              Click on the screen to continue listening
            </div>
          </div>
          <!-- </transition> -->
          <tour-minimap class="speaker-map" />
        </div>
      </transition>
    </div>
    <v-plyr :options="videoOptions" ref="plyr" id="video-wrapper">
      <video poster="" playsinline="true">
        <source :src="videoSource" type="video/mp4" size="720" />
      </video>
    </v-plyr>
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
      videoOptions: {
        fullscreen: { enabled: false },
        keyboard: { focused: true, global: true },
      },
      videoEnded: false,
      videoPaused: false,
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
      this.$store.commit("userWatchedSpeaker", this.speaker.slug);
    });
    this.player.on("playing", (event) => {
      this.videoEnded = false;
    });

    this.player.on("pause", (event) => {
      this.$nextTick(() => {
        this.videoPaused = true;
      });
    });
    this.player.on("play", (event) => {
      this.videoPaused = false;
    });

    // Play the video (if the browser lets us)
    this.player.play();
  },
  destroyed() {
    this.$store.commit("fixedHeader");
  },
  computed: {
    ...mapGetters([]),
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
    display: none;
  }

  .plyr__controls {
    z-index: 10;
    position: fixed;
  }

  .plyr__video-wrapper {
    // width: auto;
    // position: absolute;
    background-color: black;
    height: 100vh;
    // width: 100vw;
    position: fixed;
  }

  .plyr--paused {
    video {
      opacity: 0.4;
    }
  }
}
.interview-overlay {
  position: absolute;
  z-index: 5;
  top: $nav-height;
  color: $text-colour-light;
  text-align: center;
  width: 100%;
  height: calc(100% - #{$nav-height + 77px});
  display: flex;
  flex-direction: column;
  pointer-events: none;

  .back-to-map-button {
    margin: 2em auto 0 auto;
  }
}
#interview-pause-screen {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .pause-circle {
    height: 10em;
    width: 10em;
    border: 2px solid white;
    border-radius: 50%;
    margin: 0 auto;
    padding: 1.25em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 5em;

    .title {
      font-family: $font-serif;
      font-weight: bold;
      font-size: 1.4em;
    }
    .instructions {
      font-size: 0.9em;
    }
  }

  .tour-map > * {
    pointer-events: auto;
  }
}
#interview-end-screen {
  padding-top: 1em;
  pointer-events: auto;
  padding-bottom: 4em;

  ul {
    padding: 0;
  }
}

.additional-info {
  list-style: none;
  text-align: left;
}
</style>
