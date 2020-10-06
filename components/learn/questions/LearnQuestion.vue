<template>
  <div class="learn-question">{{question}}</div>
</template>

<script>
export default {
  props: ["question"],
};
</script>

<style lang="scss">
.learn-question {
  font-family: $font-serif;
  font-size: 1.5em;
}
</style>