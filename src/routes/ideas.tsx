import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { getCollection } from '@/content-data'
import { formatDate, renderMarkdown } from '@/lib/content'

export const Route = createFileRoute('/ideas')({
  head: () => ({ meta: [{ title: 'Ideas — Life and Times' }, { name: 'description', content: 'Short, unpolished thoughts from Life and Times.' }, { property: 'og:title', content: 'Ideas — Life and Times' }, { property: 'og:description', content: 'Short, unpolished thoughts.' }] }),
  component: Ideas,
})

function Ideas() {
  const ideas = getCollection('ideas').sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 sm:px-10"><header className="editorial-dark-header flex items-center justify-between border-b py-5"><Link to="/" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"><ArrowLeft className="size-3" /> Life and Times</Link><Link to="/places" className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-primary">Places</Link></header><section className="py-24 sm:py-32"><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Loose threads</p><h1 className="font-serif text-6xl tracking-[-0.05em] sm:text-8xl">Ideas</h1><p className="mt-8 max-w-md text-lg leading-8 text-muted-foreground">Short thoughts, before they become anything else.</p></section><section className="max-w-2xl border-t border-border" aria-label="Idea stream"><div className="divide-y divide-border">{ideas.map((idea) => <article key={idea.id} className="py-9"><time className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary">{formatDate(idea.data.date)}</time><div className="prose-idea mt-4 text-lg leading-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(idea.body) }} /><div className="mt-4 flex gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{idea.data.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div></article>)}</div></section></main>
  )
}
