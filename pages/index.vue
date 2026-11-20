<template>
  <main id="landing-container">
    <div class="container" id="landing-content">
      <responsive-picture
        id="landing-logo"
        src="images/logo-large.png"
        preset="logo"
        alt="Resisting Stigma"
        :class="{ details: showDetails, loaded: logoLoaded }"
        @load="logoLoaded = true"
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
        <div v-else class="columns">
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
          src="~/assets/images/vch.svg"
          alt="Vancouver Coastal Health Logo"
          class="vch"
        />
        <img
          src="~/assets/images/lt-logo.svg"
          alt="Learning Technologies Logo"
          @click="openLTSite()"
          style="cursor: pointer"
          class="lt"
          v-tooltip="{
            content: 'Designed and developed by Learning Technologies',
            distance: 20,
            popperClass: 'map-tooltip map-page-tooltip no-max-width',
          }"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { defineCoursePage } from "~/utils/course-page";
import { courseDocument } from "~/utils/course-content";
export default defineCoursePage({
  loadPage({ store, params }) {

    const content = courseDocument("landing");

    return {
      showDetails: false,
      logoLoaded: false,
      content,
    };
  },
  methods: {
    openLTSite() {
      window.open("https://vchdesign.ca");
    },
  },
});
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
  display: block;
  opacity: 0;
  transition: opacity 1s ease-in-out;

  &.loaded {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  img {
    margin-top: 20%;
    width: 100%;
    transition: all 0.5s ease-in-out;
  }

  &.details img {
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
