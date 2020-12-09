<template>
  <div class="tour-map-container">
    <svg
      width="1006"
      height="400"
      viewBox="0 0 1006 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Base Map Background -->
      <path
        opacity="0.5"
        d="M72.2279 88.3398L189.218 116.988L201.953 128.128L403.303 66.8536L541.781 70.6376V50.5383L689.396 1L788.497 4.16314L899.188 52.3071L898.324 80.3803L1005 83.2952L997.737 393.574L185.241 372.438L7.76367 319.915L72.2279 88.3398Z"
        fill="white"
      />
      <!-- Base Map Lines -->
      <g opacity="0.5">
        <path
          opacity="0.75"
          d="M788.058 155L682.289 152.512L679.8 229.35L785.57 232.15L788.058 155Z"
          fill="white"
          fill-opacity="0.5"
        />
        <path
          opacity="0.75"
          d="M165.572 271.347L184.238 249.26V278.813L165.572 271.347Z"
          fill="white"
          fill-opacity="0.5"
        />
        <path
          d="M182.478 374.823L185.661 166.77L200.103 131.357"
          stroke="white"
          stroke-width="17.7177"
          stroke-miterlimit="10"
        />
        <path d="M58.3887 130.76L185.66 166.771" class="svg-map-line" />
        <path d="M686.638 3.63281L675.128 387.886" class="svg-map-line" />
        <path d="M790.392 8.82422L782.547 387.887" class="svg-map-line" />
        <path d="M995.871 357.813L481.716 345.625" class="svg-map-line" />
        <path
          d="M539.188 73.6582L569.675 387.857"
          stroke="white"
          stroke-width="10.6306"
          stroke-miterlimit="10"
        />
        <path d="M400.539 69.4863L397.543 380.664" class="svg-map-line" />
        <path d="M302.65 97.5371L293.663 377.96" class="svg-map-line" />
        <path d="M182.478 337.268L399.043 342.639" class="svg-map-line" />
        <path
          d="M37.1855 206.934L182.478 250.028L398.731 257.391"
          class="svg-map-line"
        />
        <path
          d="M224.654 142.699V179.703L399.443 183.279"
          class="svg-map-line"
        />
        <path d="M302.256 109.84H400.54" class="svg-map-line" />
        <path d="M488.879 73.0664V148.638" class="svg-map-line" />
        <path d="M1002.24 124.595L488.879 109.84" class="svg-map-line" />
        <path d="M497.832 148.641L498.429 183.279" class="svg-map-line" />
        <path d="M549.766 187.354L680.423 191.087" class="svg-map-line" />
        <path d="M786.192 194.197L999.424 200.449" class="svg-map-line" />
        <path
          d="M19.127 284.348L130.745 315.78L108.463 355.234"
          class="svg-map-line"
        />
        <path d="M484.104 223.254L481.717 382.855" class="svg-map-line" />
        <path d="M997.804 275.276L483.54 261.17" class="svg-map-line" />
        <path d="M539.017 73.2695L1002.24 85.9271" class="svg-map-line" />
        <path d="M822.578 22.8242L819.598 80.9398" class="svg-map-line" />
        <path d="M790.392 41.8297L684.454 40.0391" class="svg-map-line" />
        <path
          d="M28.0469 239.762L211.127 288.328L997.804 314.165"
          stroke="white"
          stroke-width="17.7177"
          stroke-miterlimit="10"
        />
        <path
          d="M1000.44 162.591L224.034 142.074L202.592 130.734"
          stroke="white"
          stroke-width="10.6306"
          stroke-miterlimit="10"
        />
        <path
          d="M48.3643 166.771L219.879 215.116L998.727 237.65"
          stroke="white"
          stroke-width="10.6306"
          stroke-miterlimit="10"
        />
        <path
          d="M450.28 71.0059L438.815 381.9"
          stroke="white"
          stroke-width="10.6306"
          stroke-miterlimit="10"
        />
        <path
          d="M994.062 85.9297L986.799 396.208"
          stroke="white"
          stroke-width="10.6306"
          stroke-miterlimit="10"
        />
        <path d="M895.56 83.0156L886.009 393.374" class="svg-map-line" />
      </g>
      <!-- Map Outline -->
      <path
        d="M69.4643 90.9746L186.454 119.623L199.19 130.763L400.54 69.4883L539.018 73.2724V53.173L686.633 3.63477L785.733 6.79791L896.424 54.9419L895.56 83.0151L1002.24 85.93L994.973 396.208L182.477 375.072L5 322.55L69.4643 90.9746Z"
        stroke="white"
        stroke-width="7.08708"
        stroke-miterlimit="10"
      />
      <!-- Map Labels -->
      <g v-if="!$props.simple">
        <text
          transform="translate(560.393 219.5) rotate(1.5521)"
          class="svg-map-text"
        >
          <tspan x="4.94163" y="9.66474">EAST CORDOVA</tspan>
        </text>
        <text
          transform="translate(459.595 290.91) rotate(1.97189)"
          class="svg-map-text"
        >
          <tspan x="11.3114" y="9.66474">EAST HASTINGS</tspan>
        </text>
        <text
          transform="translate(585.076 146.588) rotate(1.21631)"
          class="svg-map-text"
        >
          <tspan x="9.96217" y="9.66474">POWELL</tspan>
        </text>
        <text
          transform="translate(696.257 181.83) rotate(1.21631)"
          class="svg-map-text"
        >
          <tspan x="3.59825" y="9.66474">Oppenheimer</tspan>
          <tspan x="25.0145" y="23.6647">Park</tspan>
        </text>

        <text
          transform="translate(542.5 162.365) rotate(-5.20265)"
          class="svg-map-text"
        >
          <tspan x="0.266052" y="9.66474">G</tspan>
          <tspan x="0.183" y="23.6647">O</tspan>
          <tspan x="0.947076" y="37.6647">R</tspan>
          <tspan x="1.11318" y="51.6647">E</tspan>
        </text>
        <text
          transform="translate(986.151 195.676) rotate(1.38725)"
          class="svg-map-text"
        >
          <tspan x="0.133169" y="9.66474">H</tspan>
          <tspan x="1.11318" y="23.6647">E</tspan>
          <tspan x="0.780972" y="37.6647">A</tspan>
          <tspan x="0.908319" y="51.6647">T</tspan>
          <tspan x="1.20177" y="65.6647">L</tspan>
          <tspan x="1.11318" y="79.6647">E</tspan>
          <tspan x="1.03013" y="93.6647">Y</tspan>
        </text>
        <text
          transform="translate(181.441 168.811) rotate(1.37935)"
          class="svg-map-text"
        >
          <tspan x="0.247752" y="9.66474">C</tspan>
          <tspan x="0.280972" y="23.6647">A</tspan>
          <tspan x="0.447076" y="37.6647">R</tspan>
          <tspan x="0.447076" y="51.6647">R</tspan>
          <tspan x="0.280972" y="65.6647">A</tspan>
          <tspan x="0.701768" y="79.6647">L</tspan>
          <tspan x="0.701768" y="93.6647">L</tspan>
        </text>
        <text
          transform="translate(438 232.49) rotate(1.37935)"
          class="svg-map-text"
        >
          <tspan x="0.352483" y="9.66474">M</tspan>
          <tspan x="1.78097" y="23.6647">A</tspan>
          <tspan x="3.8019" y="37.6647">I</tspan>
          <tspan x="1.42108" y="51.6647">N</tspan>
        </text>
      </g>
      <!-- Map Dots -->
      <g>
        <template v-for="speaker in speakers">
          <!-- If it's a peer, draw a circle -->
          <ellipse
            v-if="speaker.type == 'peer' && speaker.slug != location"
            v-bind:key="speaker.id"
            :cx="speaker.map.x"
            :cy="speaker.map.y"
            @mouseover="$emit('hover', speaker.location)"
            @mouseleave="$emit('hover', '')"
            @click="
              $props.interactive
                ? $router.push({ path: `/tour/${speaker.slug}` })
                : false
            "
            v-tooltip="
              $props.interactive
                ? {
                    content: generateTooltip({
                      name: speaker.name,
                      image: speaker.profile,
                    }),
                    offset: 20,
                    classes: 'map-tooltip',
                  }
                : false
            "
            class="speaker-map-dot"
            :class="{
              interactive: $props.interactive,
              complete: isSpeakerComplete(speaker.slug),
            }"
            rx="15"
            ry="15"
          />
          <!-- If it's a service, draw a diamond (rotated rect) -->
          <rect
            v-else-if="speaker.type == 'service' && speaker.slug != location"
            v-bind:key="speaker.id"
            transform="rotate(45)"
            class="speaker-map-dot speaker-map-diamond"
            :class="{
              interactive: $props.interactive,
              complete: isSpeakerComplete(speaker.slug),
            }"
            width="25"
            height="25"
            :x="speaker.map.x - 25 / 2"
            :y="speaker.map.y - 25 / 2"
            @mouseover="$emit('hover', speaker.location)"
            @mouseleave="$emit('hover', '')"
            @click="
              $props.interactive
                ? $router.push({ path: `/tour/${speaker.slug}` })
                : false
            "
            v-tooltip="
              $props.interactive
                ? {
                    content: generateTooltip({
                      name: speaker.name,
                      image: speaker.profile,
                    }),
                    offset: 20,
                    classes: 'map-tooltip',
                  }
                : false
            "
          />
          <!-- Pushpin if location matched speaker -->
          <g
            v-else-if="speaker.slug == location"
            v-bind:key="speaker.id"
            :transform="`translate(${speaker.map.x - 20} ${
              speaker.map.y - 25
            }) scale(0.5)`"
            @click="
              $props.interactive
                ? $router.push({ path: `/tour/${speaker.slug}` })
                : false
            "
            v-tooltip="
              $props.interactive
                ? {
                    content: generateTooltip({
                      name: speaker.name,
                      image: speaker.profile,
                    }),
                    //offset: 20,
                    classes: 'map-tooltip',
                  }
                : false
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
          <!-- <path
            v-bind:key="speaker.id"
            :transform="`translate(${speaker.map.x - 6} ${speaker.map.y - 6}) scale(0.05)`"
            d="M 30,180 90,240 240,30"
            style="stroke: #fff; stroke-width: 30; fill: none"
          /> -->
        </template>
      </g>
    </svg>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    interactive: {
      type: Boolean,
      required: false,
      default: true,
    },
    simple: {
      type: Boolean,
      required: false,
      default: false,
    },
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
        <img class="tooltip-image" src="${require(`~/assets/tour/${image}`)}" />
        <div class="speaker-name">${name}</div>
      `;
    },
    isSpeakerComplete(speakerSlug) {
      return this.userProgress.speakers.find((x) => x === speakerSlug)
        ? true
        : false;
    },
  },
  computed: {
    ...mapGetters(["speakers", "userProgress"]),
  },
  mounted() {},
};
</script>

<style lang="scss">
.map-tooltip {
  .tooltip-inner {
    text-align: center;
    padding: 1em;
    background-color: rgba(0, 0, 0, 0.75);
  }
  .tooltip-arrow {
    border-color: rgba(0, 0, 0, 0.75);
  }
  .tooltip-image {
    border-radius: 50%;
    width: 5em;
    height: 5em;
    margin: 0 auto;
  }
  .speaker-name {
    font-size: 0.9em;
  }
}

.tour-map-container {
  svg {
    width: 100%;
    height: auto;
  }
  .svg-map-text {
    fill: black;
    fill-opacity: 0.5;
    // stroke: white;
    // stroke-opacity: 0.5;
    // stroke-width: 0.7px;
    white-space: pre;
    font-family: "Adobe Caslon Pro";
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.1em;
  }
  .svg-map-line {
    stroke: white;
    stroke-miterlimit: 10;
    stroke-width: 3.54354;
  }
  .svg-map-fill {
    opacity: 0.5;
    fill: rgb(83, 83, 83);
    /* isolation: isolate; */
  }
  .map-popover {
    position: absolute;
  }
  .speaker-map-dot {
    cursor: pointer;
    transition: all 200ms;
    fill: white;
    filter: drop-shadow(0 0 30px rgba(0, 0, 0, 0));
    transform-origin: center center;
    transform-box: fill-box;

    &.speaker-map-diamond {
      transform: rotate(45deg);
    }

    &.interactive {
      &.complete {
        fill: $colour-green;
        content: "done";
      }
      &:hover {
        // fill: $colour-accent;
        filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.4));
        transform: scale(1.2);

        &.speaker-map-diamond {
          transform: rotate(45deg) scale(1.2);
        }
      }
    }
  }
}
</style>
