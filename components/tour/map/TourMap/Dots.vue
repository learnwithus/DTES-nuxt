<template>
  <g>
    <template v-for="video in videos" :key="video.slug">
      <!-- If it's a peer, draw a circle -->
      <ellipse
        v-if="video.type == 'peer' && video.slug != location"
        :cx="video.map.x"
        :cy="video.map.y"
        @mouseover="$emit('hover', video.location)"
        @mouseleave="$emit('hover', '')"
        @click="
          $props.interactive
            ? $router.push({ path: generateVideoLink(video) })
            : undefined
        "
        v-tooltip="
          $props.interactive
            ? {
                content: generateTooltip({
                  name: video.name,
                  image: video.profile,
                }),
                distance: 20,
                popperClass: 'map-tooltip',
                html: true,
              }
            : undefined
        "
        class="video-map-dot"
        :class="{
          interactive: $props.interactive,
        }"
        rx="15"
        ry="15"
      />
      <!-- If it's a service, draw a diamond (rotated rect) -->
      <rect
        v-else-if="video.type == 'service' && video.slug != location"
        transform="rotate(45)"
        class="video-map-dot video-map-diamond"
        :class="{
          interactive: $props.interactive,
        }"
        width="25"
        height="25"
        :x="video.map.x - 25 / 2"
        :y="video.map.y - 25 / 2"
        @mouseover="$emit('hover', video.location)"
        @mouseleave="$emit('hover', '')"
        @click="
          $props.interactive
            ? $router.push({ path: generateVideoLink(video) })
            : undefined
        "
        v-tooltip="
          $props.interactive
            ? {
                content: generateTooltip({
                  name: video.name,
                  image: video.profile,
                }),
                distance: 20,
                popperClass: 'map-tooltip',
                html: true,
              }
            : undefined
        "
      />
      <!-- Pushpin if location matched video -->
      <g
        v-else-if="video.slug == location"
        :transform="`translate(${video.map.x - 20} ${
          video.map.y - 25
        }) scale(0.5)`"
        @click="
          $props.interactive
            ? $router.push({ path: generateVideoLink(video) })
            : undefined
        "
        v-tooltip="
          $props.interactive
            ? {
                content: generateTooltip({
                  name: video.name,
                  image: video.profile,
                }),
                //distance: 20,
                popperClass: 'map-tooltip',
                html: true,
              }
            : undefined
        "
      >
        <path
          d="M38.9997 82.0599C38.9997 82.0599 67.9994 54.8237 67.9994 38.8759C67.9994 22.9282 55.0158 10 38.9997 10C22.9836 10 10 22.9282 10 38.8759C10 54.8237 38.9997 82.0599 38.9997 82.0599Z"
          fill="white"
        />
        <path
          d="M45.7806 60.0908C43.4394 62.9334 41.0854 65.5694 38.9997 67.8083C36.9141 65.5694 34.56 62.9334 32.2188 60.0908C28.7843 55.9209 25.5539 51.5183 23.2307 47.4199C20.7554 43.0533 20 40.218 20 38.8759C20 28.4913 28.4661 20 38.9997 20C49.5333 20 57.9994 28.4913 57.9994 38.8759C57.9994 40.218 57.244 43.0533 54.7688 47.4199C52.4455 51.5183 49.2151 55.9209 45.7806 60.0908Z"
          stroke="#248FDD"
          stroke-width="20"
        />
      </g>
      <!-- Show checkmark if video is complete && the active location is NOT this location beacuse we display a pushin in that instance-->
        <path
          v-if="isVideoComplete(video.slug) && video.slug != location"
          :transform="`translate(${video.map.x - 6} ${
            video.map.y - 6
          }) scale(0.05)`"
          d="M 30,180 90,240 240,30"
          style="
            stroke: #91c7ee;
            stroke-width: 30;
            fill: none;
            pointer-events: none;
          "
        />
    </template>
  </g>
</template>

<script>
import { singleImage } from "~/utils/responsive-image";
import { mapGetters } from "vuex";

export default {
  props: {
    videos: Array,
    interactive: {
      type: Boolean,
      required: false,
      default: true,
    },
    region: String,
    location: {
      type: String,
      required: false,
    },
  },
  data: () => ({
    hoverLocation: undefined,
  }),
  methods: {
    generateTooltip({ name, image }) {
      return `
        <img class="tooltip-image" src="${singleImage(this.$img, `tour/${image}`, "tooltip")}" />
        <div class="video-name">${name}</div>
      `;
    },
    isVideoComplete(videoslug) {
      return this.userProgress.videos.find((x) => x === videoslug)
        ? true
        : false;
    },
    generateVideoLink(video) {
      return `/tour/${this.region}/${video.slug}`;
    },
  },
  computed: {
    ...mapGetters(["userProgress"]),
  },
};
</script>

<style lang="scss" scoped>
.map-popover {
  position: absolute;
}
.video-map-dot {
  cursor: pointer;
  transition: all 200ms;
  fill: #248fdd;
  transform-origin: center center;
  transform-box: fill-box;
  stroke: #91c7ee;
  stroke-width: 2px;

  &.video-map-diamond {
    transform: rotate(45deg);
  }

  &.interactive {
    &:hover {
      transform: scale(1.2);
      filter: drop-shadow(0px 0px 10px #2490ddaf);

      &.video-map-diamond {
        transform: rotate(45deg) scale(1.2);
      }
    }
  }
}
</style>