<template>
  <div class="learn-background-wrapper" :class="{ accent: accent }">
    <div class="learn-background" ref="learnBG"></div>
  </div>
</template>

<script>
export default {
  props: ["accent"],
  data: () => ({
    supportClipPath: true,
  }),
  mounted() {},
};
</script>

<style lang="scss">
.learn-background-wrapper {
  position: fixed;
  overflow: hidden;
  z-index: -1;
  height: 100%;
  width: 100%;
  right: 0;
  top: 0;
  z-index: 12;
  pointer-events: none;
  // Stay behind the page until the sweep back from full blue has finished (450ms below),
  // so it doesn't cover the bottom UI mid-sweep
  transition: z-index 0s linear 450ms;

  &.accent {
    z-index: -1;
    transition: none;
  }
}
.learn-background {
  position: relative;
  background-color: $text-colour-light;
  height: 100%;
  width: 120%;
  right: 20%;

  transition: background-color 200ms ease-in-out;
  animation: learn-background-slide-in 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  // Use support queries to create a fallback for browsers that don't support clip-path because text would become unreadable otherwise
  @supports (clip-path: polygon(96% 0, 100% 0, 100% 100%, 85% 100%)) {
    transition: clip-path 450ms ease-in-out;
    background-color: $colour-primary;
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);

    @include breakpoint(tablet) {
      clip-path: polygon(96% 0, 100% 0, 100% 100%, 85% 100%);
    }
  }

  .accent & {
    background-color: $colour-primary;
    @supports (clip-path: polygon(96% 0, 100% 0, 100% 100%, 85% 100%)) {
      clip-path: polygon(11% 0, 100% 0, 100% 100%, 0% 100%);
    }
  }
}
@keyframes learn-background-slide-in {
  from {
    transform: translateX(20%);
  }
  to {
    transform: translateX(0);
  }
}
</style>