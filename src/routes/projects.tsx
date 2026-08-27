import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getCollection } from '@/content-data'
import { formatDate, renderMarkdown } from '@/lib/content'

export const Route = createFileRoute('/projects')({
  head: () => ({ meta: [{ title: 'Projects — Life and Times' }, { name: 'description', content: 'Things I have built, am building, or set down for later.' }, { property: 'og:title', content: 'Projects — Life and Times' }, { property: 'og:description', content: 'Things I have built, am building, or set down for later.' }] }),
  component: Projects,
})

function Projects() {
  const projects = getCollection('projects').sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 sm:px-10"><header className="editorial-dark-header flex items-center justify-between border-b py-5"><Link to="/" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"><ArrowLeft className="size-3" /> Life and Times</Link><Link to="/about" className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-primary">About</Link></header><section className="py-24 sm:py-32"><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Things made</p><h1 className="font-serif text-6xl tracking-[-0.05em] sm:text-8xl">Projects</h1><p className="mt-8 max-w-md text-lg leading-8 text-muted-foreground">What I have built, am building, or set down for later.</p></section><section className="max-w-2xl border-t border-border" aria-label="Project list"><div className="divide-y divide-border">{projects.map((project) => <article key={project.id} className="py-9"><div className="flex flex-wrap items-center gap-3"><time className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary">{formatDate(project.data.date)}</time><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{project.data.status}</span></div><h2 className="mt-3 font-serif text-3xl tracking-tight">{project.data.title}</h2><p className="mt-2 text-base text-muted-foreground">{project.data.tagline}</p><div className="prose-idea mt-4 text-lg leading-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(project.body) }} /><div className="mt-4 flex flex-wrap items-center gap-4"><div className="flex gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{project.data.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>{project.data.url && <a href={project.data.url} target="_blank" rel="noreferrer" className="editorial-link group ml-auto flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">Visit <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>}</div></article>)}</div></section></main>
  )
}
