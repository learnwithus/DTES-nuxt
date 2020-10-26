<template>
  <div class="learn-background-wrapper">
    <div
      class="learn-background"
      :class="{ accent: accent }"
      ref="learnBG"
    ></div>
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
}
.learn-background {
  position: relative;
  background-color: $text-colour-light;
  height: 100%;
  width: 120%;
  right: 20%;

  transition: background-color 200ms ease-in-out;

  // Use support queries to create a fallback for browsers that don't support clip-path because text would become unreadable otherwise
  @supports (clip-path: polygon(96% 0, 100% 0, 100% 100%, 85% 100%)) {
    transition: clip-path 300ms ease-in-out;
    background-color: $colour-primary;
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);

    @include breakpoint(tablet) {
      clip-path: polygon(96% 0, 100% 0, 100% 100%, 85% 100%);
    }
  }

  &.accent {
    background-color: $colour-primary;
    @supports (clip-path: polygon(96% 0, 100% 0, 100% 100%, 85% 100%)) {
      clip-path: polygon(11% 0, 100% 0, 100% 100%, 0% 100%);
    }
  }
}
</style>