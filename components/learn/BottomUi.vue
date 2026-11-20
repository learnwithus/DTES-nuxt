<template>
  <div class="bottom-fixed-ui" :class="{ accent }">
    <div class="container">
      <!-- Buttons -->
      <div class="button-wrapper">
        <vs-button v-if="button != 'start-module'" flat size="large" dark color="#ffffff"
          @click="$emit('click-back')">Back</vs-button>
        <vs-button flat size="large" border @click="$emit('click-start-module')" v-if="button == 'start-module'">Begin
          Module</vs-button>
        <vs-button flat size="large" border @click="$emit('click-submit')"
          v-else-if="button == 'question-submit'">Submit</vs-button>
        <vs-button flat size="large" :border="!progress.lastSectionQuestion" :active="progress.lastSectionQuestion"
          @click="$emit('click-next')" v-else-if="button == 'question-next'">Next</vs-button>
        <vs-button flat size="large" dark border :active="true" v-else-if="button == 'feedback-next-section' ||
          button == 'feedback-next-feedback'
          " @click="$emit('click-next')" class="submit">{{
    button == "feedback-next-section" ? "Next Section" : "Next"
  }}</vs-button>
        <vs-button flat size="large" dark border :active="true" v-else-if="button == 'start-tour'"
          @click="$emit('click-start-tour')" class="submit">Start Tour</vs-button>
      </div>

      <!-- Prgoress Dots -->
      <div class="learn-progress-wrapper is-hidden-mobile opacity-show" ref="progressWrapper"
        :class="{ 'opacity-hide': !$props.progress.show }" :style="clipOffset">
        <progress-dots :sections="progress.sectionCount" :current-section="progress.currentSection"
          :progress="progress.sectionProgress" />
        <!-- Same dots in their blue-background colours, clipped to the blue shape so the colours
             change exactly along the edge as it sweeps across -->
        <progress-dots class="on-blue progress-dots-blue" aria-hidden="true" :sections="progress.sectionCount"
          :current-section="progress.currentSection" :progress="progress.sectionProgress" />
      </div>
      <div class="is-hidden-mobile"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // True while the learn background is (or is sweeping to) all blue
    accent: Boolean,
    button: {
      // 'question-submit' || 'question-next' || 'feedback-next-section' || 'feedback-next-feedback'
      type: String,
      required: true,
    },
    progress: {
      type: Object,
      required: true,
      //   {
      //       show: true, //whether or now we show the prgress
      //       sectionCount: 5, // How many sections
      //       currentSection: 3, // Which section / dot we're on
      //       sectionProgress: 40: // Percentage progress bewteen sections / dots
      //   }
    },
  },
  data: () => ({ clipOffset: {} }),
  mounted() {
    this.measureClip();
    // Window resizes, plus width changes such as a scrollbar appearing on a long slide
    window.addEventListener("resize", this.measureClip);
    this.resizeObserver = new ResizeObserver(() => this.measureClip());
    this.resizeObserver.observe(document.documentElement);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.measureClip);
    this.resizeObserver?.disconnect();
  },
  methods: {
    // The blue shape is drawn relative to the viewport (LearnBackground.vue); the clip is relative to
    // the dots, so pass in the viewport size and where the dots sit within it.
    measureClip() {
      const rect = this.$refs.progressWrapper.getBoundingClientRect();
      this.clipOffset = {
        "--vw": `${document.documentElement.clientWidth}px`,
        "--vh": `${window.innerHeight}px`,
        "--x": `${rect.left}px`,
        "--y": `${rect.top}px`,
      };
    },
  },
};
</script>

<style lang="scss">
/* The animation code */
@keyframes fade-in-bottom-ui {
  from {
    opacity: 0;
  }

  to {}
}

.bottom-fixed-ui {
  position: fixed;
  bottom: 0;
  padding-bottom: 2em;
  padding-top: 5em;
  left: 0;
  width: 100%;
  transition: all 200ms linear 200ms;
  z-index: 11;
  pointer-events: none;

  @include breakpoint(phablet) {
    padding-bottom: 3em;
  }

  @include breakpoint(phablet) {
    padding-top: 2rem;
    background: unset;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    animation: fade-in-bottom-ui 0.3s linear; // Looks nicer when combined with page transition
    background: linear-gradient(0deg,
        rgba($colour-primary, 1) 0%,
        rgba($colour-primary, 0.75) 80%,
        rgba($colour-primary, 0) 100%);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    animation: fade-in-bottom-ui 0.3s linear; // Looks nicer when combined with page transition
    // Wait for the blue sweep back to white (450ms in LearnBackground.vue) before fading in
    transition: opacity 200ms linear 450ms;
    background: linear-gradient(0deg,
        rgba(white, 1) 0%,
        rgba(white, 0.8) 80%,
        rgba(white, 0) 100%);
  }

  // Follows the background sweep rather than the slide content, so the white fade never sits over blue
  &.accent::before {
    opacity: 1;
    transition: opacity 200ms linear 250ms;
  }
  &.accent::after {
    opacity: 0;
    transition: none;
  }

  .dark & {
    // background: linear-gradient(
    //   0deg,
    //   rgba($colour-primary, 1) 0%,
    //   rgba($colour-primary, 0.5) 50%,
    //   ≈
    //   rgba($colour-primary, 0) 100%
    // );
  }

  .container {
    display: flex;
    align-items: center;
    pointer-events: auto;

    >* {
      flex-grow: 1;
      flex-basis: 0;
    }
  }

  .button-wrapper {
    .vs-button.dark:not(.active) { color: #2c3e50; }
    .vs-button:not(.bordered) { background: rgba(255, 255, 255, .15); }
    .vs-button.bordered:hover, .vs-button.bordered:focus-visible { color: white; }
    .vs-button.active:not(.bordered) { background: var(--button-color); }
    display: flex;
    justify-content: center;

    @include breakpoint(phablet) {
      justify-content: unset;
    }
  }

  // Two copies of the dots share one grid cell: the normal colours clipped to the white side of the
  // background's edge, and the blue-background colours (.on-blue) clipped to the blue side.
  // The edge mirrors the clip-path polygons and timing in LearnBackground.vue. That layer is 120% of
  // the viewport wide and shifted 20% left, so a point p% across it sits at (1.2p - 20)% of the
  // viewport; --x/--y (set in measureClip) move each point into the dots' own coordinates.
  .learn-progress-wrapper {
    position: relative;
    // Above the ::before/::after fades; the clip-paths stop the dots' own z-index reaching them
    z-index: 1;
    display: grid;
    min-width: 300px;
    margin: 0 auto;
    transition: opacity linear 200ms;

    --far-left: calc(var(--vw) * -0.3 - var(--x));
    --far-right: calc(var(--vw) - var(--x));
    --y-top: calc(0px - var(--y));
    --y-bottom: calc(var(--vh) - var(--y));
    // --top/--bottom: where the blue edge crosses the top and bottom of the viewport.
    // Below the tablet breakpoint the blue shape is hidden off the right edge.
    --top: var(--far-right);
    --bottom: var(--far-right);

    @include breakpoint(tablet) {
      // Background sliver: 96% → 95.2%, 85% → 82% of the viewport
      --top: calc(var(--vw) * 0.952 - var(--x));
      --bottom: calc(var(--vw) * 0.82 - var(--x));
    }

    > .progress-bar {
      grid-area: 1 / 1;
      width: 100%;
      transition: clip-path 450ms ease-in-out;
    }
  }

  // White side of the edge
  .learn-progress-wrapper > .progress-bar:not(.on-blue) {
    clip-path: polygon(var(--far-left) var(--y-top), var(--top) var(--y-top), var(--bottom) var(--y-bottom), var(--far-left) var(--y-bottom));
  }
  // Blue side of the edge
  .progress-dots-blue {
    clip-path: polygon(var(--top) var(--y-top), var(--far-right) var(--y-top), var(--far-right) var(--y-bottom), var(--bottom) var(--y-bottom));
  }

  // Full blue: 11% → -6.8%, 0% → -20% of the viewport
  &.accent .learn-progress-wrapper {
    --top: calc(var(--vw) * -0.068 - var(--x));
    --bottom: calc(var(--vw) * -0.2 - var(--x));
  }
}
</style>