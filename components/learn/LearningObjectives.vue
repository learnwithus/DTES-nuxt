<template>
  <div class="learning-objectives">
    <h1 class="objectives-title">Learning Objectives</h1>
    <div class="columns">
      <nuxt-content :document="$props.learningObjectives" class="column is-10"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ["learningObjectives"],
};
</script>

<style lang="scss">
.objectives-title {
  font-family: $font-serif;
}
</style>