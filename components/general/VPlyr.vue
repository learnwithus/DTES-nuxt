
<template>
  <div>
    <slot />
  </div>
</template>

<script>
import Plyr from "plyr";
import Hls from "hls.js";

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
      player: {},
      opts: options,
    };
  },
  computed: {},
  mounted() {
    // For more options see: https://github.com/sampotts/plyr/#options
    // captions.update is required for captions to work with hls.js
    const defaultOptions = {};

    if (Hls.isSupported() && this.$props.hls !== undefined) {
      // console.log("we have hls!");
      // For more Hls.js options, see https://github.com/dailymotion/hls.js
      const hls = new Hls();
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
        // Initialize here
        this.player = new Plyr(this.$el.firstChild, this.opts);

        this.emit.forEach((element) => {
          this.player.on(element, this.emitPlayerEvent);
        });
      });
      hls.attachMedia(this.$el.firstChild);
      window.hls = hls;
    } else {
      console.info("HLS not supported");
      // default options with no quality update in case Hls is not supported
      this.player = new Plyr(this.$el.firstChild, this.opts);

      this.emit.forEach((element) => {
        this.player.on(element, this.emitPlayerEvent);
      });
    }
  },
  // destroyed() {
  //   try {
  //     this.player.destroy();
  //   } catch (e) {
  //     if (
  //       !(
  //         this.opts.hideYouTubeDOMError &&
  //         e.message === "The YouTube player is not attached to the DOM."
  //       )
  //     ) {
  //       // eslint-disable-next-line no-console
  //       console.error(e);
  //     }
  //   }
  // },
  methods: {
    emitPlayerEvent(event) {
      this.$emit(event.type, event);
    },
    updateQuality(newQuality) {
      window.hls.levels.forEach((level, levelIndex) => {
        if (level.height === newQuality) {
          // console.log("Found quality match with " + newQuality);
          window.hls.currentLevel = levelIndex;
        }
      });
    },
  },
};
</script>

<style lang="scss">
$plyr-color-main: $colour-accent;

@import "../../node_modules/plyr/src/sass/plyr.scss";
</style>