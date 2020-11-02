<template>
  <div class="learning-objectives">
    <h1 class="objectives-title">Learning Objectives</h1>
    <nuxt-content :document="$props.learningObjectives" />
  </div>
</template>

<script>
export default {
    props: ["learningObjectives"]
};
</script>

<style lang="scss">
.objectives-title {
    font-family: $font-serif;
}
</style>