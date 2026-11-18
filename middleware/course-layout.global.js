export default defineNuxtRouteMiddleware(to => {
  const store = useNuxtApp().$store
  const path = to.path.replace(/\/$/, '') || '/'
  const landing = path === '/'
  const intro = path === '/tour/intro'
  const dark = landing || intro || ['/tour', '/tour/dtes', '/tour/coastal', '/tour/videos'].includes(path)
  const video = to.params.video && !path.endsWith('/watch')
    ? store.getters.getVideoBySlug(to.params.video)
    : null
  const background = landing || intro ? 'images/tourintrobg.jpg' : video ? 'tour/' + video.background : null

  store.commit('setBackgroundImage', background)
  store.commit('setDarkBackground', dark)
  store.commit('defaultHeader')
  store.commit('showHeader')
  if (landing) {
    store.commit('hideHeaderLogo')
    store.commit('transparentHeader')
  }
})
