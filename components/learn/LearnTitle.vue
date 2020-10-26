<template>
  <div class="learn-title">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.learn-title {
  font-family: masqualero, sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 2.5em;
  color: $colour-secondary;

  @include breakpoint(phablet) {
    font-size: 3em;
  }

  .dark & {
    color: $colour-light;
  }
}
</style>