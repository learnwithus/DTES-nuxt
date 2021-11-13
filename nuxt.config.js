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
      { rel: "apple-touch-icon", type: "image/x-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/x-icon", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/x-icon", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "manifest", type: "image/x-icon", href: "/site.webmanifest" },
      { rel: "stylesheet", href: "https://use.typekit.net/mbs4zfv.css" },
    ],
    script: [
      {
        src: "/browser-detect.js",
        body: true
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
  loading: {
    color: '#3B83C2'
  },
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: [
    '~/components/general',
    '~/components/layout',
    '~/components/learn',
    '~/components/learn/questions',
    { path: '~/components/learn/feedback', prefix: 'learn-feedback' },
    { path: '~/components/markdown-helpers/', prefix: 'markdown' },
    '~/components/tour/map',
    '~/components/tour'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    "@nuxtjs/svg",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxt/content",
    "@nuxtjs/style-resources",
    //"@nuxt/image",
  ],
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
  content: {
    markdown: {
      // Don't inlcude the default remark plugin which adds header links to markdown HTML, was casuing a WCAG failure
      remarkPlugins: () => ['remark-squeeze-paragraphs', 'remark-slug', 'remark-external-links', 'remark-footnotes'],
    }
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(vtt|vtt)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    },
  },
  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content('tour/speakers').only(['slug']).fetch()

      return files.map(file => `/tour/${file.slug}/watch`)
    }
  }
};
