import { createStore } from 'vuex'
import Cookies from 'js-cookie'
import { courseDocuments } from '~/utils/course-content'
import { state, mutations, getters } from '~/store'

// Videos whose slug changed, so progress saved under the old slug still counts
const renamedVideos = { heatley: 'groundspring' }

export default defineNuxtPlugin(app => {
  const store = createStore({ state, mutations, getters })
  const videos = region => courseDocuments(`tour/${region}/videos`).map(video => ({ ...video, region }))
  store.commit('setVideos', { dtes: videos('dtes'), coastal: videos('coastal') })
  app.vueApp.use(store)

  if (import.meta.client) {
    onNuxtReady(() => {
      try {
        const saved = JSON.parse(Cookies.get('dtes') || '{}').userProgress
        if (Array.isArray(saved?.videos)) {
          saved.videos = [...new Set(saved.videos.map(slug => renamedVideos[slug] ?? slug))]
          store.state.userProgress = saved
        }
      } catch {
        // Ignore malformed cookies from earlier visits.
      }
      store.subscribe((_mutation, { userProgress }) => {
        Cookies.set('dtes', JSON.stringify({ userProgress }), { expires: 7 })
      })
    })
  }

  return { provide: { store } }
})
