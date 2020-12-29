<template>
  <header
    @mouseover="headerHover = true"
    @mouseleave="headerHover = false"
    :class="{
      hide: !$store.state.header.visible && !headerHover,
      overlay: $store.state.header.overlay,
      transparent: $store.state.header.transparent,
    }"
  >
    <nav
      class="navbar is-transparent container-is-desktop"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link
          id="logo"
          to="/"
          class="navbar-item opacity-show"
          :class="{ 'opacity-hide': !$store.state.header.logo }"
          @click.native="hamburgerOpen = false"
          ><img src="~assets/images/logo-small.png" alt="Resisting Stigma"
        /></nuxt-link>

        <!-- Hamburger Menu -->
        <button
          class="navbar-burger burger"
          :class="{ 'is-active': hamburgerOpen }"
          @click="hamburgerOpen = !hamburgerOpen"
          aria-label="menu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': hamburgerOpen }">
        <div class="navbar-end">
          <nuxt-link
            class="navbar-item"
            to="/learn"
            @click.native="hamburgerOpen = false"
            >Learn</nuxt-link
          >

          <div class="navbar-item has-dropdown is-hoverable">
            <nuxt-link
              class="navbar-link is-arrowless"
              to="/tour"
              @click.native="hamburgerOpen = false"
              >Tour</nuxt-link
            >

            <div class="navbar-dropdown-wrapper">
              <div class="navbar-dropdown is-boxed">
                <nuxt-link
                  class="navbar-item"
                  to="/tour/intro"
                  @click.native="hamburgerOpen = false"
                  >Intro</nuxt-link
                >
                <nuxt-link
                  class="navbar-item"
                  to="/tour/speakers"
                  @click.native="hamburgerOpen = false"
                  >Speakers</nuxt-link
                >
              </div>
            </div>
          </div>
          <nuxt-link
            class="navbar-item"
            to="/about"
            @click.native="hamburgerOpen = false"
            >About</nuxt-link
          >
          <nuxt-link
            class="navbar-item"
            to="/resources"
            @click.native="hamburgerOpen = false"
            >Resources</nuxt-link
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      headerHover: false,
      hamburgerOpen: false,
    };
  },
};
</script>

<style lang="scss">
header {
  z-index: 3;
  // Will be themed in the future, depending on context
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  height: $nav-height;
  min-height: $nav-height;
  position: sticky;
  top: 0;

  &.transparent {
    background-color: unset;
  }

  .navbar-burger {
    border: none;
    background: none;
    height: $nav-height;
  }

  a.navbar-item,
  a.navbar-link {
    border: none;
    color: $nav-text-colour;

    &:hover {
      color: $colour-primary-dark;
      @include breakpoint(phablet) {
        color: white;
      }
    }
  }

  &.overlay {
    position: absolute;
    z-index: 3;
    width: 100%;
    transition: opacity 200ms linear;

    &.hide {
      opacity: 0;
    }
  }

  .has-dropdown {
    padding-bottom: 1em;
  }

  nav {
    height: 100%;
  }

  a {
    border: none;
  }

  .navbar-menu {
    background-color: $colour-primary-dark;
    @include breakpoint(phablet) {
      background-color: unset;
    }
  }

  .navbar-dropdown-wrapper {
    @include breakpoint(phablet) {
      left: 0;
      min-width: 100%;
      position: absolute;
      top: 100%;
      height: 0.5em;
    }
  }
}

// #logo {
//   border: none;
//   display: flex;
//   align-items: center;
//   img {
//     width: 200px;
//     height: 100%;
//   }
// }
</style>