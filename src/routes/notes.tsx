import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { createElement } from 'react'
import { getCollection } from '@/data/content'
import { formatDate } from '@/lib/content'

export const Route = createFileRoute('/notes')({
  head: () => ({ meta: [{ title: 'Notes — Life and Times' }, { name: 'description', content: 'Longer notes on attention, the internet, and the texture of ordinary days.' }, { property: 'og:title', content: 'Notes — Life and Times' }, { property: 'og:description', content: 'Longer notes on attention and ordinary days.' }] }),
  component: Notes,
})

function Notes() {
  const notes = getCollection('notes').filter((note) => !note.data.draft).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 sm:px-10">
      <header className="flex items-center justify-between border-b border-border py-5"><Link to="/" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"><ArrowLeft className="size-3" /> Life and Times</Link><Link to="/ideas" className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-primary">Ideas</Link></header>
      <section className="py-24 sm:py-32"><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Long-form writing</p><h1 className="font-serif text-6xl tracking-[-0.05em] sm:text-8xl">Notes</h1><p className="mt-8 max-w-md text-lg leading-8 text-muted-foreground">Longer pieces, written to be returned to.</p></section>
      <section className="border-t border-border" aria-label="All notes"><div className="divide-y divide-border">{notes.map((note) => <Link key={note.id} to="/notes/$slug" params={{ slug: note.id }} className="group grid gap-5 py-8 transition-colors hover:text-primary sm:grid-cols-[120px_1fr_20px] sm:items-start"><time className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{formatDate(note.data.date)}</time><div><h2 className="font-serif text-3xl tracking-tight">{note.data.title}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{note.data.description}</p><div className="mt-4 flex gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{note.data.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div></div><ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" /></Link>)}</div></section>
      {createElement('footer', { className: 'mt-24 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground' }, 'Two notes, for now.')}
    </main>
  )
}
