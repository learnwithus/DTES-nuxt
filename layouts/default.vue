<template>
  <div id="dtes-layout">
    <nav-bar />
    <!-- Dynamic Image Background -->
    <transition name="fade" mode="out-in">
      <background-image
        v-if="getBackground"
        :src="getBackground"
      />
    </transition>
    <!-- Page -->
    <Nuxt id="dtes-page" />
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
  ...mapGetters([
    "getBackground"
  ])
}
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
