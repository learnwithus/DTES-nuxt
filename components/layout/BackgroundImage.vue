<template>
  <div class="global-background-wrapper">
    <div class="global-background-placeholder" :class="{ black }"></div>
    <transition name="background-crossfade">
      <img
        class="global-background-image"
        v-if="shownSrc"
        :key="shownSrc"
        v-bind="shownImage"
        alt=""
        fetchpriority="high"
      />
    </transition>
    <!-- Loads the next background with the same srcset so the crossfade starts once it is ready -->
    <img
      v-if="pendingSrc"
      :key="`pending-${pendingSrc}`"
      class="global-background-loader"
      v-bind="pendingImage"
      alt=""
      @load="showPending"
      @error="showPending"
    />
  </div>
</template>

<script>
import { responsiveImage } from "~/utils/responsive-image";
export default {
  name: "DynamicImage",

  props: {
    src: {
      required: true,
    },
    black: Boolean,
  },

  data() {
    return {
      // Rendered on the server and first paint so the initial background is not delayed
      shownSrc: this.src || null,
      pendingSrc: null,
    };
  },

  watch: {
    src(path) {
      if (!path) {
        this.pendingSrc = null;
        this.shownSrc = null;
      } else {
        this.pendingSrc = path === this.shownSrc ? null : path;
      }
    },
  },

  computed: {
    shownImage() {
      return responsiveImage(this.$img, this.shownSrc, "background");
    },
    pendingImage() {
      return responsiveImage(this.$img, this.pendingSrc, "background");
    },
  },

  methods: {
    // The loader is keyed by path, so a load event always belongs to the current pending image
    showPending() {
      if (!this.pendingSrc) return;
      this.shownSrc = this.pendingSrc;
      this.pendingSrc = null;
    },
  },
};
</script>

<style lang="scss">
.global-background-wrapper {
  z-index: -1;
}
.global-background-placeholder {
  background-color: $colour-primary-dark;
  transition: background-color 400ms ease-in-out;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  &.black {
    background-color: black;
  }
}

// Same framing as the previous CSS background (cover, anchored top left)
.global-background-image,
.global-background-loader {
  position: fixed;
  object-fit: cover;
  object-position: left top;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}

.global-background-image {
  opacity: 1;
  transition: opacity 500ms ease-in-out;

  .dark & {
    opacity: 0.125;
  }
}

.global-background-loader {
  opacity: 0;
  pointer-events: none;
}

.background-crossfade-enter-active,
.background-crossfade-leave-active {
  transition: opacity 600ms ease-in-out;
}
.background-crossfade-enter-from,
.background-crossfade-leave-to {
  opacity: 0 !important;
}

@media (prefers-reduced-motion: reduce) {
  .global-background-image,
  .background-crossfade-enter-active,
  .background-crossfade-leave-active {
    transition: none;
  }
}
</style>
