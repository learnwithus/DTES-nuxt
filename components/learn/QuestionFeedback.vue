<template>
  <div class="question-feedback">
      <nuxt-content :document="feedback" />
  </div>
</template>

<script>
export default {
    props: ["feedback"]
}
</script>

<style lang="scss">
.question-feedback {
  color: $colour-accent;
}
</style>