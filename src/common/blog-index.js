import { CONTENT_BASE_PATH } from '@/common/markdown'

const INDEX_URL = `${CONTENT_BASE_PATH}/index.json`

export async function fetchBlogIndex() {
  const response = await fetch(INDEX_URL)

  if (!response.ok) {
    throw new Error('No se pudo cargar el índice del blog')
  }

  return response.json()
}

export function blogPostPath(slug) {
  return `/blog/${slug}`
}

export function editorPath(slug) {
  return {
    path: '/editor',
    query: { file: slug }
  }
}

export function folderLabel(name) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
