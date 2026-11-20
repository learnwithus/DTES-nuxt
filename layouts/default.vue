<template>
  <div id="dtes-layout" :class="{ dark: background.dark }">
    <nav-bar />
    <!-- Dynamic Image Background -->
    <transition name="fade" mode="out-in">
      <background-image v-if="background.image || background.dark || background.black" :src="background.image" :black="background.black" />
    </transition>
    <!-- Page -->
    <div id="dtes-page"><slot /></div>
  </div>
</template>

<script>
// Matches the page leave transition in assets/scss/transitions.scss
const PAGE_LEAVE_MS = 200;

export default {
  data() {
    return { background: { ...this.$store.state.background } };
  },
  watch: {
    // The route middleware updates the background as soon as navigation starts.
    // Apply it once the old page has faded out so the new background never shows behind it.
    "$store.state.background": {
      deep: true,
      handler(background) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => (this.background = { ...background }), PAGE_LEAVE_MS);
      },
    },
  },
};
</script>

<style lang="scss">
#dtes-layout {
  display: flex;
  flex-direction: column;
}

#dtes-page {
  flex: 1 1 auto;
}

</style>
