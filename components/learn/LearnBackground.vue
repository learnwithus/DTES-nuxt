<template>
  <div class="learn-background-wrapper">
    <div class="learn-background" :class="{accent: accent}"></div>
  </div>
</template>

<script>
export default {
  props: ["accent"],
};
</script>

<style lang="scss">
.learn-background-wrapper {
  position: absolute;
  overflow: hidden;
  z-index: -1;
  height: 100%;
  width: 100%;
  right: 0;
  top: 0;
}
.learn-background {
  position: relative;
  background-color: $colour-primary;
  height: 100%;
  width: 120%;
  right: 20%;
  transition: clip-path 300ms ease-in-out;
  clip-path: polygon(96% 0, 100% 0, 100% 100%, 85% 100%);

  &.accent {
    clip-path: polygon(11% 0, 100% 0, 100% 100%, 0% 100%);
  }
}
</style>