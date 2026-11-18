const files = import.meta.glob('/assets/**/*.{svg,png,jpg,jpeg,webp,vtt,mp4}', {
  eager: true, query: '?url', import: 'default'
})
const icons = import.meta.glob('/assets/images/icons/*.svg', {
  eager: true, query: '?raw', import: 'default'
})

export function assetUrl(path) {
  const url = files['/assets/' + path]
  // Vite can resolve the same generated asset to an absolute URL in the browser.
  return import.meta.client && url?.startsWith(location.origin + '/')
    ? url.slice(location.origin.length)
    : url
}

export function rawIcon(name) {
  return icons['/assets/images/icons/' + name]
}
