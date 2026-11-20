import { defineComponent, reactive, toRefs } from 'vue'

export function defineCoursePage({ loadPage, head, ...options }) {
  return defineComponent({
    ...options,
    setup() {
      const store = useNuxtApp().$store
      const route = useRoute()
      const data = reactive(loadPage?.({ store, params: route.params }) ?? {})
      if (head) {
        const $img = useImage()
        useHead(() => head.call(Object.assign(Object.create(store.getters), data, { $img })))
      }
      return toRefs(data)
    }
  })
}
