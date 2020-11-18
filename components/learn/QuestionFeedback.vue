<template>
  <div class="question-feedback">
    <nuxt-content :document="feedback" />
  </div>
</template>

<script>
export default {
  props: ["feedback"],
};
</script>

<style lang="scss">
.question-feedback {
  color: $colour-primary;

  .dark & {
    color: white;
  }

  :first-child {
    margin-top: 0px;
  }
}
</style>