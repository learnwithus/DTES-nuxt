<template>
  <div class="column">
    <slot />
  </div>
</template>

<script>
export default {
  // props: ["size"]
};
</script>

<style>
.markdown-column {
  display: inline-block;
  flex: 1;
}
</style>