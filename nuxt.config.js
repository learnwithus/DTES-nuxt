import { addTemplate, updateTemplates } from '@nuxt/kit'
import { compileContent } from './utils/compile-content.mjs'
import { readdirSync } from 'node:fs'

const tourRoutes = ['dtes', 'coastal'].flatMap(region =>
  readdirSync(new URL(`./content/tour/${region}/videos/`, import.meta.url))
    .filter(file => file.endsWith('.md'))
    .flatMap(file => {
      const route = `/tour/${region}/${file.slice(0, -3)}`
      return [route, route + '/watch']
    })
)

export default defineNuxtConfig({
  srcDir: '.',
  modules: [function courseContentModule(_options, nuxt) {
    const template = addTemplate({
      filename: 'course-data.mjs',
      getContents: () => 'export default ' + JSON.stringify(compileContent(new URL('./content/', import.meta.url)))
    })
    nuxt.hook('builder:watch', (_event, path) => {
      if (/(^|\/)content\/.*\.md$/.test(path)) {
        return updateTemplates({ filter: entry => entry.filename === template.filename })
      }
    })
  }],
  compatibilityDate: '2026-11-17',
  css: ['~/assets/scss/_base.scss', 'floating-vue/dist/style.css'],
  app: {
    head: {
      title: 'Resisting Stigma',
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'description', content: "Learn about communities across BC, including Vancouver's Downtown Eastside, and how stigma affects their residence" }],
      link: [
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'stylesheet', href: 'https://use.typekit.net/mbs4zfv.css' }
      ],
      script: [{ src: '/browser-detect.js', tagPosition: 'bodyClose' }]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  dir: { public: 'static' },
  components: [
    { path: '~/components/tour/map/TourMap', prefix: 'TourMap', pathPrefix: false },
    ...['general', 'layout', 'learn', 'learn/questions', 'tour/map', 'tour'].map(name => ({ path: '~/components/' + name, pathPrefix: false })),
    { path: '~/components/learn/feedback', prefix: 'LearnFeedback' },
    { path: '~/components/markdown-helpers', prefix: 'Markdown' }
  ],
  vite: {
    // Plyr 3.6 uses a selector the default Lightning CSS minifier rejects.
    build: { cssMinify: false },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: (source, filename) => filename.endsWith('.vue') ? '@import "~/assets/scss/variables"; @import "~/assets/scss/breakpoints";\n' + source : source
        }
      }
    }
  },
  nitro: { prerender: { crawlLinks: true, routes: [...tourRoutes, '/tour/intro/watch', '/tour/conclusion'] } }
})
