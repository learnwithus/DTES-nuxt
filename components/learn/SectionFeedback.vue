<template>
  <div class="section-feedback">
    <nuxt-content :document="feedback" />
  </div>
</template>

<script>
export default {
  props: ["feedback"],
};
</script>

<style lang="scss">
.section-feedback {
  img {
    max-width: 500px;
    // margin: 0 auto;
    display: block;
  }
}
</style>