<template>
  <div>
    <header>
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
    </header>
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<style lang="scss">
header {
  padding: 0 1em;
  display: flex;
  align-items: center;

  // Will be themed in the future, depending on context
  background-color: rgba(0, 0, 0, 0.5);
  color: white;

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
