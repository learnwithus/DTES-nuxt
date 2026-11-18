import documents from '#build/course-data.mjs'

export function courseDocument(path) {
  return structuredClone(documents[path])
}

export function courseDocuments(dir) {
  return Object.keys(documents).filter(path => path.startsWith(dir + '/')).map(courseDocument)
}
