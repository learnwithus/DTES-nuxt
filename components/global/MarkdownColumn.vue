<template>
  <div class="markdown-column" :style="{'flex-grow': size}">
    <slot />
  </div>
</template>

<script>
export default {
  props: ["size"]
};
</script>

<style>
.markdown-column {
  display: inline-block;
  flex: 1;
}
</style>