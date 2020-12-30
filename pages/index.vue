<template>
  <div id="landing-container">
    <div class="container" id="landing-content">
      <img
        id="landing-logo"
        src="~assets/images/logo-large.png"
        alt="Resisting Stigma"
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
        <img
          src="~assets/images/vch.svg"
          alt="Vancouver Coastal Health Logo"
          class="vch"
        />
        <img
          src="~assets/images/lt-logo.svg"
          alt="Learning Technologies Logo"
          @click="openLTSite()"
          style="cursor: pointer"
          class="lt"
          v-tooltip="{
            content: 'Designed and developed by Learning Technologies',
            offset: 20,
            classes: 'map-tooltip map-page-tooltip',
          }"
        />
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
  methods: {
    openLTSite() {
      window.open("https://vchdesign.ca");
    },
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
  margin-bottom: 2em;
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
    justify-content: space-between;
  }

  img {
    max-width: 10em;
    width: 30%;
    max-height: 4em;

    &.lt {
      max-height: 2em;
    }

    @include breakpoint(phone) {
      width: unset;

      &.lt {
        max-height: 3.5em;
      }
    }

    @include breakpoint(phablet) {
      width: unset;
    }
  }
}
#landing-start-course {
  margin-top: 3em;
}
</style>
