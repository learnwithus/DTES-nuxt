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
        <div v-if="!showDetails">
          <!-- Hidden until the logo has loaded so it fades in with the logo rather than before it -->
          <div class="landing-begin-reveal" :class="{ loaded: logoLoaded }">
            <vs-button @click="showDetails = true" id="landing-begin" size="xl" flat border color="#fff">
              Begin
            </vs-button>
          </div>
        </div>
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
  // A flex item with auto side margins shrinks to fit its content, so without this the logo set the
  // width before Begin and the wider details widened it after, making the logo grow as it moved up
  width: 100%;
  box-sizing: border-box;
  // Keep the usual 1400px content width now the padding counts towards it
  max-width: 1400px + $container-padding * 2;
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
    transition: margin-top 0.5s ease-in-out;
  }

  &.details img {
    margin-top: 2em;
  }
}
.landing-begin-reveal {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.6s ease-in-out 0.4s, visibility 0s linear 0.4s;

  &.loaded {
    opacity: 1;
    visibility: visible;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
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
