<template>
  <div id="dtes-layout" :class="{dark: getBackgroundDark}">
    <nav-bar />
    <!-- Dynamic Image Background -->
    <transition name="fade" mode="out-in">
      <background-image v-if="getBackgroundImage || getBackgroundDark" :src="getBackgroundImage" />
    </transition>
    <!-- Page -->
    <div id="dtes-page"><slot /></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getBackgroundImage", "getBackgroundDark"]),
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
