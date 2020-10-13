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
            <li><nuxt-link to="/tour">Tour</nuxt-link></li>
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
  &.overlay {
    position: absolute;
    z-index: 2;
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
    }
    li {
      margin: 0 1em;
    }
    a {
      color: white;
      border: none;
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
