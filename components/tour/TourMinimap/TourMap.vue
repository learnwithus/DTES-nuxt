<template>
  <div>
    <svg
      width="225"
      height="100"
      viewBox="0 0 225 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    <!-- Base Map Lines -->
      <g>
        <path
          class="svg-map-fill"
          d="M17.72,23.43l29,7.1,3.16,2.77L99.83,18.1l34.34.94v-5L170.78,1.77l24.58.78,27.45,11.94-2.58,83.94L45.75,93.89l-44-13Z"
        />
        <path class="svg-map-line" d="M7.45,60.33l45.4,12,168,4.92" />
        <path class="svg-map-line" d="M12.49,42.23,55,54.22l166.41,5.12" />
        <path
          class="svg-map-line"
          d="M45.75,92.9l.79-50.67,3.35-8.93,6.32,3L222.6,40"
        />
        <path class="svg-map-line" d="M15,33.3l31.57,8.93" />
        <path class="svg-map-line" d="M170.78,1.77l-2.85,95.3" />
        <path class="svg-map-line" d="M196.51,3.05l-1.94,94" />
        <path class="svg-map-line" d="M220.52,89,120,86.58" />
        <path class="svg-map-line" d="M112.16,18.44l-2.84,77.1" />
        <path class="svg-map-line" d="M134.17,20l7.6,77.08" />
        <path class="svg-map-line" d="M99.83,18.1l-.75,77.18" />
        <path class="svg-map-line" d="M75.55,25.06,73.32,94.6" />
        <path class="svg-map-line" d="M45.75,84.51l53.71,1.33" />
        <path class="svg-map-line" d="M9.71,52.19l36,10.69L99.38,64.7" />
        <path class="svg-map-line" d="M56.21,36.26v9.17l43.35.89" />
        <path class="svg-map-line" d="M222.31,30.63,121.74,28.11" />
        <path class="svg-map-line" d="M124,37.73l.15,8.59" />
        <path class="svg-map-line" d="M136.87,47.35l31.65.9" />
        <path class="svg-map-line" d="M196.15,49l25.59.43" />
        <path class="svg-map-line" d="M5.23,71.39l27.69,7.79L27.39,89" />
        <path class="svg-map-line" d="M120.55,56.24,120,95.82" />
        <path class="svg-map-line" d="M221.15,68.4,120.41,65.64" />
        <path class="svg-map-line" d="M134.17,19l88.43,2.41" />
        <path class="svg-map-line" d="M204.5,6.53l-.74,14.41" />
        <path class="svg-map-line" d="M196.51,11.24l-26.27-.44" />
        <path
          class="svg-map-line"
          d="M17.72,23.43l29,7.1,3.16,2.77L99.83,18.1l34.34.94v-5L170.78,1.77l24.58.78,27.45,11.94-2.58,83.94L45.75,93.89l-44-13Z"
        />
      </g>
      <!-- Map Dots -->
      <g>
        <ellipse
          v-for="speaker in speakers"
          v-bind:key="speaker.id"
          :cx="speaker.map.x"
          :cy="speaker.map.y"
          @mouseover="/*hoverLocation = speaker*/"
          @click="$router.push({path: `/tour/${speaker.slug}`});"
          v-tooltip="{ content: speaker.name, offset: 20 }"
          class="speaker-map-dot"
          rx="5"
          ry="5"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    speakers: {
      type: Array,
      required: false,
    },
    interactive: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    hoverLocation: undefined,
  }),
};
</script>

<style scoped lang="scss">
svg {
  width: 100%;
  height: auto;
}
.svg-map-line {
  fill: none;
  stroke: white;
  stroke-miterlimit: 10;
}
.svg-map-fill {
  opacity: 0.5;
  fill: rgb(83, 83, 83);
  /* isolation: isolate; */
}
.map-popover{
    position: absolute;
}
.speaker-map-dot {
  cursor: pointer;
  transition: all 200ms;
  fill: white;
  filter: drop-shadow(0 0 30px rgba(0, 0, 0, 0));
  transform-origin: center center;
  transform-box: fill-box;

  &:hover {
    fill: $colour-accent;
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.63));
    transform: rotate(-10deg) scale(1.61803398874989484820);
  }
}
</style>