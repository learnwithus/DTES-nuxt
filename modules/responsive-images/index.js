import { addTemplate, createResolver, defineNuxtModule, extendPages, updateTemplates } from '@nuxt/kit'
import { readdirSync, readFileSync, rmSync } from 'node:fs'
import { join, sep } from 'node:path'
import { imageMeta } from 'image-meta'

// Unlinked, build-only page that renders every image variant so `nuxt generate` builds them all,
// including images only shown client-side (learn slides, map tooltips, background crossfades).
const VARIANTS_ROUTE = '/image-variants'

// Width and height of every raster image in ~/assets, so srcsets never offer upscaled widths.
function readImageDimensions(assetsDir) {
  const dimensions = {}
  for (const file of readdirSync(assetsDir, { recursive: true })) {
    if (!/\.(jpe?g|png|webp)$/i.test(file)) continue
    const { width, height } = imageMeta(readFileSync(join(assetsDir, file)))
    dimensions[file.split(sep).join('/')] = { width, height }
  }
  return dimensions
}

// Supports utils/responsive-image.js, which builds srcsets with @nuxt/image.
export default defineNuxtModule({
  meta: { name: 'responsive-images' },
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const assetsDir = join(nuxt.options.srcDir, 'assets')

    const template = addTemplate({
      filename: 'image-dimensions.mjs',
      getContents: () => 'export default ' + JSON.stringify(readImageDimensions(assetsDir)),
    })
    nuxt.hook('builder:watch', (_event, path) => {
      if (/(^|\/)assets\/.*\.(jpe?g|png|webp)$/i.test(path)) {
        return updateTemplates({ filter: entry => entry.filename === template.filename })
      }
    })

    extendPages(pages => {
      pages.push({ name: 'image-variants', path: VARIANTS_ROUTE, file: resolve('./variants.vue') })
    })

    nuxt.hook('nitro:config', config => {
      config.prerender ||= {}
      config.prerender.routes = [...(config.prerender.routes || []), VARIANTS_ROUTE]
    })

    // The page has done its job once its images are generated, so it isn't published.
    nuxt.hook('nitro:init', nitro => {
      nitro.hooks.hook('prerender:done', () => {
        rmSync(join(nitro.options.output.publicDir, VARIANTS_ROUTE), { recursive: true, force: true })
      })
    })
  },
})
