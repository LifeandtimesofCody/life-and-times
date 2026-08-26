import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getCollection } from '@/content-data'
import { formatDate, renderMarkdown } from '@/lib/content'

export const Route = createFileRoute('/notes/$slug')({
  loader: ({ params }) => {
    const note = getCollection('notes').find((entry) => entry.id === params.slug && !entry.data.draft)
    if (!note) throw notFound()
    return note
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.data.title ?? 'Note'} — Life and Times` }, { name: 'description', content: loaderData?.data.description ?? 'A note from Life and Times.' }, { property: 'og:title', content: loaderData?.data.title ?? 'Life and Times' }, { property: 'og:description', content: loaderData?.data.description ?? '' }, { property: 'og:type', content: 'article' }] }),
  component: Note,
})

function Note() {
  const note = Route.useLoaderData()
  return <main className="mx-auto max-w-4xl px-6 pb-24 sm:px-10"><header className="editorial-dark-header flex items-center justify-between border-b py-5"><Link to="/notes" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"><ArrowLeft className="size-3" /> All notes</Link><Link to="/places" className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-primary">Places</Link></header><article className="mx-auto max-w-2xl py-24 sm:py-32"><div className="mb-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"><time>{formatDate(note.data.date)}</time><span className="text-primary">Note</span></div><h1 className="font-serif text-5xl leading-[1.04] tracking-[-0.04em] sm:text-7xl">{note.data.title}</h1><p className="mt-8 text-xl leading-8 text-muted-foreground">{note.data.description}</p><div className="mt-12 flex gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-primary">{note.data.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div><div className="prose-note mt-16 border-t border-border pt-10 text-lg leading-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(note.body) }} /><Link to="/notes" className="group mt-16 inline-flex items-center gap-2 border-b border-border pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-primary hover:text-primary">More notes <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></article></main>
}
