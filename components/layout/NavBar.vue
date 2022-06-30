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
          ><nuxt-picture src="/assets/images/logo-large.png" alt="Resisting Stigma" sizes="sm:350px"
        /></nuxt-link>

        <!-- Hamburger Menu -->
        <button
          class="navbar-burger burger"
          :class="{ 'is-active': hamburgerOpen }"
          @click="hamburgerOpen = !hamburgerOpen"
          aria-label="Hamburger Menu"
          aria-controls="main-menu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': hamburgerOpen }" aria-label="menu" id="main-menu">
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
                  to="/tour/dtes"
                  @click.native="hamburgerOpen = false"
                  >DTES</nuxt-link
                >
                <nuxt-link
                  class="navbar-item"
                  to="/tour/coastal"
                  @click.native="hamburgerOpen = false"
                  >Coastal</nuxt-link
                >
                <nuxt-link
                  class="navbar-item"
                  to="/tour/videos"
                  @click.native="hamburgerOpen = false"
                  >Videos</nuxt-link
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
  z-index: 100;
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

    span {
      height: 2px;
      width: 2em;
      left: calc(50% - 1em);
    }
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

  #logo {
    display: flex;
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
    z-index: 5;
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

</style>