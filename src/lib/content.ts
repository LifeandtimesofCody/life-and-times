import { marked } from 'marked'

export function formatDate(value: Date | string) {
  if (typeof value === 'string' && Number.isNaN(Date.parse(value))) return value
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value))
}

export function renderMarkdown(body: string) {
  return marked.parse(body) as string
}

export function slugFromId(id: string) {
  return id.replace(/\.(md|mdx)$/, '')
}
