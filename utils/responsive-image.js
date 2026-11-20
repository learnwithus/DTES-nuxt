import imageDimensions from '#build/image-dimensions.mjs'

// Full-resolution originals live in ~/assets. @nuxt/image resizes them and converts them to WebP.
// Each preset lists the widths offered to the browser in srcset; `sizes` tells it how wide the image renders.
const imagePresets = {
  // Backgrounds cover the viewport, so on tall screens they render wider than 100vw
  background: { widths: [640, 960, 1280, 1920, 2560], sizes: 'max(100vw, 150vh)' },
  poster: { widths: [1920], sizes: '100vw' },
  profile: { widths: [96, 160, 240, 320, 480], sizes: '10em' },
  // Map tooltips are 5em circles; one 2x-density file keeps them sharp on retina screens.
  tooltip: { widths: [160], sizes: '5em' },
  content: { widths: [480, 800, 1200, 1600, 2000], sizes: '(min-width: 1024px) 960px, 100vw' },
  logo: { widths: [350, 700, 1100, 1600, 2200], sizes: '(min-width: 1216px) 1152px, 100vw' },
}

const QUALITY = 75

// Offer only widths smaller than the original, plus the original width itself, so nothing is upscaled.
function presetWidths(path, preset) {
  const original = imageDimensions[path]?.width
  const { widths } = imagePresets[preset]
  if (!original) return widths
  const smaller = widths.filter(width => width < original)
  return smaller.length === widths.length ? widths : [...smaller, original]
}

function imageUrl($img, path, width) {
  return $img('/' + path, { width, format: 'webp', quality: QUALITY })
}

// Returns { src, srcset, sizes } for an <img>. `path` is relative to ~/assets, e.g. "tour/trey/background.jpg".
export function responsiveImage($img, path, preset, sizes) {
  if (!path) return {}
  const widths = presetWidths(path, preset)
  const fallback = widths.find(width => width >= 640) ?? widths[widths.length - 1]
  return {
    src: imageUrl($img, path, fallback),
    srcset: widths.map(width => `${imageUrl($img, path, width)} ${width}w`).join(', '),
    sizes: sizes ?? imagePresets[preset].sizes,
  }
}

// A single URL, for places that cannot take a srcset such as a video poster.
export function singleImage($img, path, preset) {
  if (!path) return undefined
  const widths = presetWidths(path, preset)
  return imageUrl($img, path, widths[widths.length - 1])
}

// <link rel="preload"> that picks the same candidate as the matching <img>.
export function preloadImage($img, path, preset) {
  const { src, srcset, sizes } = responsiveImage($img, path, preset)
  return { rel: 'preload', as: 'image', href: src, imagesrcset: srcset, imagesizes: sizes }
}
