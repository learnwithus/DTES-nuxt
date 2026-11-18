import { defineComponent, h } from 'vue'
import { MarkdownContainer, MarkdownColumn, MarkdownImage, HotspotImage, LearnFeedbackStigmaImpacts, LearnFeedbackOverdoseStats, LearnFeedbackTimeline, LearnFeedbackAddressingStigma, VsButton } from '#components'

const courseComponents = {
  'markdown-container': MarkdownContainer,
  'markdown-column': MarkdownColumn,
  'markdown-image': MarkdownImage,
  'hotspot-image': HotspotImage,
  'learn-feedback-stigma-impacts': LearnFeedbackStigmaImpacts,
  'learn-feedback-overdose-stats': LearnFeedbackOverdoseStats,
  'learn-feedback-timeline': LearnFeedbackTimeline,
  'learn-feedback-addressing-stigma': LearnFeedbackAddressingStigma,
  'vs-button': VsButton,
}

function renderNode(node) {
  if (node.text !== undefined) return node.text
  const props = { ...node.props }
  if (props['data-hotspots']) {
    props.hotspots = JSON.parse(props['data-hotspots'])
    delete props['data-hotspots']
  }
  if (Object.hasOwn(courseComponents, node.tag)) {
    for (const name of ['flat', 'border', 'blank']) {
      if (props[name] === '') props[name] = true
    }
    return h(courseComponents[node.tag], props, { default: () => node.children.map(renderNode) })
  }
  return h(node.tag, props, node.children.map(renderNode))
}

export default defineComponent({
  props: { document: Object },
  setup(props) {
    return () => h('div', { class: 'nuxt-content' }, props.document?.body?.map(renderNode))
  }
})
