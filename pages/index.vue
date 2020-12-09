<template>
  <div id="landing-container">
    <div class="container" id="landing-content">
      <img
        id="landing-logo"
        src="~assets/images/logo-large.png"
        alt=""
        :class="{ details: showDetails }"
      />
      <transition name="fade" mode="out-in">
        <vs-button
          @click="showDetails = true"
          id="landing-begin"
          size="xl"
          flat
          border
          color="#fff"
          v-if="!showDetails"
        >
          Begin
        </vs-button>
        <div v-if="showDetails" class="columns">
          <div class="column is-three-fifths-desktop">
            <nuxt-content :document="content" />
            <vs-button
              id="landing-start-course"
              to="/learn"
              size="xl"
              flat
              border
              color="#fff"
              >Start Course
            </vs-button>
          </div>
        </div>
      </transition>
    </div>
    <div id="landing-logos">
      <div class="container">
        <img src="~assets/images/vch.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ store, $content }) {
    store.commit("hideHeaderLogo");
    store.commit("transparentHeader");
    store.commit("requestDarkBackground");
    store.commit("setBackgroundImage", `images/tourintrobg.jpg`);

    const content = await $content("landing").fetch();

    return {
      showDetails: false,
      content,
    };
  },
  destroyed() {
    this.$store.commit("defaultHeader");
  },
};
</script>

<style lang="scss">
#landing-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
#landing-content {
  flex: 1 0 auto;
}
#landing-logo {
  margin-top: 20%;
  width: 100%;
  transition: all 0.5s ease-in-out;

  &.details {
    margin-top: 2em;
  }
}
#landing-begin {
  margin: 0 auto;
  margin-top: 10%;
}
#landing-logos {
  flex-shrink: 0;
  padding-bottom: 2em;

  > .container {
    display: flex;
    flex-direction: row-reverse;
  }

  img {
    max-width: 10em;
    width: 30%;
  }
}
#landing-start-course {
  margin-top: 3em;
}
</style>
