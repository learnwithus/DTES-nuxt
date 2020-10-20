<template>
  <div id="dtes-layout">
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
        </nav>
      </div>
    </header>

    <Nuxt id="dtes-page" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerHover: false,
    };
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

header {
  z-index: 3;
  &.overlay {
    position: absolute;
    z-index: 3;
    width: 100%;
    transition: opacity 200ms linear;

    &.hide {
      opacity: 0;
    }
  }

  // Will be themed in the future, depending on context
  background-color: rgba(0, 0, 0, 0.5);
  color: white;

  .nav-wrapper {
    padding: 0 2em;
    display: flex;
    align-items: center;
  }

  nav {
    margin-left: auto;
    ul {
      display: flex;
      list-style: none;
      margin: 0;
    }
    li {
      padding: 1em;
      height: 100%;
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
        position: absolute;
        background-color: rgba(0, 0, 0, 0.685);
        padding: 0.5em;
        top: 57px;
        left: -1em;
        z-index: 1;
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
