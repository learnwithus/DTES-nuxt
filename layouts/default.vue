<template>
  <div id="dtes-layout">
    <nav-bar />
    <!-- Dynamic Image Background -->
    <transition name="fade" mode="out-in">
      <background-image v-if="getBackgroundImage || getBackgroundDark" :src="getBackgroundImage" />
    </transition>
    <!-- Page -->
    <div id="dtes-page"><Nuxt /></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // watchQuery: true,
  data() {
    return {
      // backgroundImage: require(this.$store.state.backgroundImage)
    };
  },
  mounted() {},
  watch: {
    // $route(route) {
    //   this.$store.commit("clearBackgroundImage");
    // },
  },
  computed: {
    ...mapGetters(["getBackgroundImage", "getBackgroundDark"]),
  },
};
</script>>

<style lang="scss">
#dtes-layout {
  display: flex;
  flex-direction: column;
}

#dtes-page {
  flex: 1 1 auto;
}

#logo {
  border: none;
  display: flex;
  align-items: center;
  img {
    width: 200px;
    height: 100%;
  }
}
</style>
