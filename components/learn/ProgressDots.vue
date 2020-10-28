<template>
  <ul class="progress-bar">
    <li
      v-for="section in sections + 1"
      :key="section"
      class="progress-bar-step"
      :class="{current: currentSection == section, complete: currentSection > section, next: currentSection + 1 == section}"
      :style="{'--progress': progress + '%' }"
    >
      <div class="dot"></div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["sections", "currentSection", "progress"],
};
</script>

<style lang="scss">
.progress-bar {
  margin: 0 auto;
  // padding: 2em 0 3em;
  list-style: none;
  position: relative;
  display: flex;
  justify-content: space-between;
}

.progress-bar-step {
  text-align: center;
  position: relative;
  width: 100%;

  &:before,
  &:after {
    content: "";
    height: 0.25em;
    background-color: $colour-light;
    position: absolute;
    z-index: 1;
    width: 100%;
    left: -50%;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.25s ease-out;

    // Dark Mode Colours
    .dark & {
      background-color: $colour-dark;
    }
  }

  &:first-child:before,
  &:first-child:after {
    display: none;
  }

  &:after {
    background-color: $colour-accent;
    width: 0%;

    // Dark Mode Colours
    .dark & {
      background-color: $colour-light;
    }
  }

  &.complete + &.current:after,
  &.complete + &.complete:after {
    width: 100%;
  }

  &.next:after {
    width: var(--progress);
  }
}

.dot {
  margin: 0 auto;
  width: 0.4em;
  height: 0.4em;
  background-color: $colour-light;
  fill: $colour-light;
  border-radius: 50%;
  padding: 0.4em;
  max-width: 100%;
  z-index: 10;
  position: relative;
  transition: all 0.25s ease-out;

  // Dark Mode Colours
  .dark & {
    background-color: $colour-dark;
    fill: $colour-dark;
  }

  // Current Acive Section Dot
  .current & {
    fill: $colour-accent;
    background-color: $colour-accent;

    .dark & {
      background-color: $colour-light;
    }
  }

  // CompleteSection Dot
  .complete & {
    fill: $colour-light;
    background-color: $colour-accent;

    .dark & {
      background-color: $colour-light;
    }
  }
}
</style>