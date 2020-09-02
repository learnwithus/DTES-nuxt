<template>
  <div class="feedback">
      <nuxt-content :document="feedback" />
  </div>
</template>

<script>
export default {
    props: ["feedback"]
}
</script>

<style>

</style>