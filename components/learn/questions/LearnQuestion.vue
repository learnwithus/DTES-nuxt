<template>
  <div class="learn-question">{{ question }}</div>
</template>

<script>
export default {
  props: ["question"],
};
</script>

<style lang="scss">
.learn-question {
  font-family: $font-serif;
  font-size: 1.1em;

  @include breakpoint(phone) {
    font-size: 1.3em;
  }

  @include breakpoint(thone) {
    font-size: 1.4em;
  }

  @include breakpoint(phablet) {
    font-size: 1.5em;
  }
}
</style>