<template>
  <div class="learn-background-wrapper">
      <div class="learn-background" :class="{accent: accent}"></div>
  </div>
</template>

<script>
export default {
    props: ["accent"]
}
</script>

<style lang="scss">
.learn-background-wrapper {
    position: absolute;
    height: 100%;
    width: 100%;
    right: 0;
    top: 0;
    overflow: hidden;
    z-index: -1;
}
.learn-background {
    position: relative;
    right: -80%;
    top: -20%;
    transform: rotate(0deg);
    height: 200vh;
    width: 200vw;
    background-color: $colour-primary;

    transition: all 200ms linear;

    @include breakpoint(phone) {
        transform: rotate(8deg);
    }

    @include breakpoint(phablet) {
        transform: rotate(11deg);
    }

    &.accent {
        right: 25%;
    }
}
</style>