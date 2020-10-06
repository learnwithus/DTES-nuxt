<template>
  <div>
    <header>
      <img id="logo" src="~assets/images/logo-small.png" alt="Resisting Stigma">
      <nav>
        <ul>
          <li>Learn</li>
          <li>Tour</li>
          <li>About</li>
          <li>Resources</li>
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
  }
}

#logo {
  width: 200px;
  height: 100%;
}
</style>
