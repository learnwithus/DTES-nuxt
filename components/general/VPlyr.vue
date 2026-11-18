
<template>
  <div class="v-plyr">
    <slot />
  </div>
</template>

<script>

import Hls from "hls.js";
import { markRaw } from "vue";

export default {
  name: "VuePlyr",
  props: {
    hls: {
      type: String,
      required: false,
    },
    /** Options object for plyr config. **/
    options: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    /** Array of events to emit from the plyr object **/
    emit: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },
  data() {
    const options = this.$props.options;
    if (!this.$props.hasOwnProperty("hideYouTubeDOMError")) {
      options.hideYouTubeDOMError = true;
    }

    return {
      player: null,
      hlsPlayer: null,
      opts: options,
    };
  },
  computed: {},
  async mounted() {
    const { default: Plyr } = await import("plyr/dist/plyr.mjs");
    if (!this.$el?.isConnected) return;
    const video = this.$el.querySelector("video");
    if (!video) return;
    // For more options see: https://github.com/sampotts/plyr/#options
    // captions.update is required for captions to work with hls.js

    if (Hls.isSupported() && this.$props.hls !== undefined) {
      // console.log("we have hls!");
      // For more Hls.js options, see https://github.com/dailymotion/hls.js
      const hls = markRaw(new Hls());
      hls.loadSource(this.$props.hls);
      // console.log(hls);

      // From the m3u8 playlist, hls parses the manifest and returns
      // all available video qualities. This is important, in this approach,
      // we will have one source on the Plyr player.

      hls.on(Hls.Events.ERROR, function (event, data) {
        console.error(data);
      });

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        // Transform available levels into an array of integers (height values).
        const availableQualities = hls.levels.map((l) => l.height);

        // Add new qualities to option
        this.opts.quality = {
          default: Math.max.apply(Math, availableQualities),
          options: availableQualities,
          // this ensures Plyr to use Hls to update quality level
          forced: true,
          onChange: (e) => this.updateQuality(e),
        };

        this.opts.captions = {
          active: true,
          update: true,
          language: "en",
        };

        // Initialize here
        this.player = markRaw(new Plyr(video, this.opts));

        this.emit.forEach((element) => {
          this.player.on(element, this.emitPlayerEvent);
        });
      });
      hls.attachMedia(video);
      this.hlsPlayer = hls;
    } else {
      console.info("HLS not supported");
      // default options with no quality update in case Hls is not supported
      this.player = markRaw(new Plyr(video, this.opts));

      this.emit.forEach((element) => {
        this.player.on(element, this.emitPlayerEvent);
      });
    }
  },
  beforeUnmount() {
    this.player?.destroy();
    this.hlsPlayer?.destroy();
  },
  methods: {
    emitPlayerEvent(event) {
      this.$emit(event.type, event);
    },
    updateQuality(newQuality) {
      this.hlsPlayer.levels.forEach((level, levelIndex) => {
        if (level.height === newQuality) {
          // console.log("Found quality match with " + newQuality);
          this.hlsPlayer.currentLevel = levelIndex;
        }
      });
    },
  },
};
</script>

<style lang="scss">
$plyr-color-main: $colour-accent;

@import "../../node_modules/plyr/src/sass/plyr.scss";

.v-plyr {
  --plyr-font-size-large: 1.4rem;
  --plyr-font-size-base: 1.25rem;
}
</style>