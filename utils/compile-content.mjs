import { readdirSync, readFileSync } from 'node:fs'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import { parseFragment } from 'parse5'

const markdown = new MarkdownIt({ html: true, linkify: true })
const openLink = markdown.renderer.rules.link_open
markdown.renderer.rules.link_open = (tokens, index, options, env, renderer) => {
  if (/^https?:/.test(tokens[index].attrGet('href'))) {
    tokens[index].attrSet('target', '_blank')
    tokens[index].attrSet('rel', 'noopener noreferrer')
  }
  return openLink ? openLink(tokens, index, options, env, renderer) : renderer.renderToken(tokens, index, options)
}

function toNode(node) {
  if (node.nodeName === '#text') return { text: node.value }
  if (!node.tagName) return null
  return {
    tag: node.tagName,
    props: Object.fromEntries(node.attrs.map(({ name, value }) => [name, value])),
    children: node.childNodes.map(toNode).filter(Boolean)
  }
}

export function compileContent(root) {
  return Object.fromEntries(readdirSync(root, { recursive: true })
    .filter(file => file.endsWith('.md')).sort().map(file => {
      const path = file.slice(0, -3)
      const slug = path.split('/').at(-1)
      const { data, content } = matter(readFileSync(new URL(file, root), 'utf8'))
      return [path, {
        ...data,
        id: path,
        slug,
        dir: '/' + path.slice(0, -(slug.length + 1)),
        body: parseFragment(markdown.render(content)).childNodes.map(toNode).filter(Boolean)
      }]
    }))
}
