<template>
  <div class="tour-video-wrapper">
    <div class="video-overlay">
      <transition name="fade" mode="out-in">
        <div v-if="videoEnded" id="video-end-screen" class="container">
          <slot name="videoEndScreen" />
        </div>
        <div v-else-if="videoPaused" id="video-pause-screen">
          <slot name="videoPausedScreen">
            <!-- <transition name="zoom-fade" mode="in-out" appear> -->
            <div class="pause-circle" v-if="videoPaused">
              <div class="title">Paused</div>
              <div class="instructions" v-if="!isTouchscreen">
                Click on the screen to continue listening
              </div>
            </div>
            <!-- </transition> -->
          </slot>
        </div>
      </transition>
    </div>
    <v-plyr
      :emit="playerEvents"
      @controlsshown="$store.commit('showHeader')"
      @controlshidden="$store.commit('hideHeader')"
      @ended="onVideoEnded()"
      @playing="videoEnded = false"
      @pause="onVideoPaused()"
      @play="videoPaused = false"
      @ready="onVideoReady()"
      :options="videoOptions"
      ref="plyr"
      id="video-wrapper"
      :hls="hls"
    >
      <video :poster="require(`~/assets/tour/${poster}`)" playsinline="true">
        <source :src="videoSource" type="video/mp4" size="720" />
      </video>
    </v-plyr>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["src", "hls", "poster"],
  data() {
    return {
      isTouchscreen: false,
      videoOptions: {
        fullscreen: { enabled: false },
        keyboard: { focused: true, global: true },
      },
      playerEvents: [
        "controlsshown",
        "controlshidden",
        "ended",
        "playing",
        "pause",
        "play",
        "ready",
      ],
      videoEnded: false,
      videoPaused: false,
    };
  },
  mounted() {
    this.$store.commit("overlayHeader");

    // Check if screen is touchscreen or not
    if (
      "ontouchstart" in window ||
      navigator.MaxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    ) {
      this.isTouchscreen = true;
    } else {
      this.isTouchscreen = false;
    }
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
      return absoluteUrl.test(this.$props.src)
        ? this.$props.src
        : require(`~/assets/tour/${this.$props.src}`);
    },
  },
  methods: {
    onVideoEnded() {
      this.videoEnded = true;
      this.$emit("video-ended");
    },
    onVideoPaused() {
      this.$nextTick(() => {
        this.videoPaused = true;
      });
    },
    onVideoReady() {
      this.player.play().catch((e) => {
        console.info("Not permitted to autoplay video");
      });
    },
  },
};
</script>

<style lang="scss">
.tour-video-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
}

.plyr {
  flex: 1 1 auto;
}

#video-wrapper {
  max-height: 100vh;
  display: flex;
  flex: 1 1 auto;

  .plyr__poster {
    background-size: cover;
  }

  video {
    object-fit: cover;
    transition: opacity 200ms linear;
    width: 100%;
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
.video-overlay {
  position: absolute;
  z-index: 2;
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
#video-pause-screen {
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
#video-end-screen {
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
