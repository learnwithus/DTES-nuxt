<template>
  <header
    @mouseover="headerHover = true"
    @mouseleave="headerHover = false"
    :class="{
      hide: !$store.state.header.visible && !headerHover,
      overlay: $store.state.header.overlay,
    }"
  >
    <div class="nav-wrapper">
      <nuxt-link id="logo" to="/"
        ><img src="~assets/images/logo-small.png" alt="Resisting Stigma"
      /></nuxt-link>
      <nav>
        <ul>
          <li><nuxt-link to="/learn">Learn</nuxt-link></li>
          <li class="dropdown">
            <nuxt-link to="/tour">Tour</nuxt-link>
            <ul>
              <li><nuxt-link to="/tour">Intro</nuxt-link></li>
              <li><nuxt-link to="/tour/speakers">Speakers</nuxt-link></li>
            </ul>
          </li>
          <li><nuxt-link to="/about">About</nuxt-link></li>
          <li><nuxt-link to="/resources">Resources</nuxt-link></li>
        </ul>
        <button id="hamburger-button">㆔</button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      headerHover: false,
      // backgroundImage: require(this.$store.state.backgroundImage)
    };
  },
};
</script>

<style lang="scss">
$nav-height: 3.5em;
#hamburger-button {
  display: inline-block;

  @include breakpoint(phablet) {
    display: none;
  }
}
header {
  z-index: 3;
  // Will be themed in the future, depending on context
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  height: $nav-height;
  min-height: $nav-height;

  &.overlay {
    position: absolute;
    z-index: 3;
    width: 100%;
    transition: opacity 200ms linear;

    &.hide {
      opacity: 0;
    }
  }

  .nav-wrapper {
    padding: 0 2em;
    display: flex;
    align-items: center;
    height: 100%;
  }

  nav {
    margin-left: auto;
    display: flex;
    height: 100%;
    align-items: center;

    > ul {
      display: none;
      list-style: none;
      height: 100%;
      margin: 0;

      @include breakpoint(phablet) {
        display: flex;
      }

      li {
        display: flex;
        align-items: center;
        padding: 0 1em;
        height: 100%;
      }
    }

    a {
      color: white;
      border: none;
    }

    // Nested Nav Dropdown
    .dropdown {
      position: relative;

      &:hover ul {
        display: block;
      }

      a {
        font-size: 16px;
      }

      ul {
        display: none;
        list-style: none;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.685);
        padding: 0.5em;
        top: $nav-height;
        left: -1em;
        z-index: 1;

        li {
            padding: 1em;
        }
      }

      ul a {
        text-decoration: none;
      }

      // li a:hover {
      //   background-color: #ddd;
      // }
    }
  }
}
</style>