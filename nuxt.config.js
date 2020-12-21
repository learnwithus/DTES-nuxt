export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Resisting Stigma",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Learn about Vancouver's Downtown Eastside and how stigma affects its residence",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "https://use.typekit.net/wgf8sbs.css" },
    ],
    script: [
      {
        src:
          "https://polyfill.io/v3/polyfill.js",
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/scss/_base.scss"],
  styleResources: {
    scss: ["./assets/scss/variables.scss", "./assets/scss/breakpoints.scss"],
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "~/plugins/vuesax" },
    { src: "~/plugins/tooltip" },
    { src: "~/plugins/lazyload" },
    { src: "~/plugins/resetBackgroundImage", mode: "client" },
    { src: "~/plugins/updateBackgroundMixin" },
    { src: "~/plugins/persistedState.client.js", mode: "client" },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt/content
    "@nuxt/content",
    "@nuxtjs/style-resources",
    "@nuxt/image",
    // '@nuxtjs/markdownit',
  ],
  // markdownit: {
  //   injected: true
  // },
  env: {
    // fullscreenLicenseKey: process.env.FULLSCREEN_KEY || 'OPEN-SOURCE-GPLV3-LICENSE'
  },
  router: {
    // middleware: 'pageBackgroundImage'
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content('tour/speakers').only(['slug']).fetch()

      return files.map(file => `/tour/${file.slug}/watch`)
    }
  }
};
