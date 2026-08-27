import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/about')({
  head: () => ({ meta: [{ title: 'About — Life and Times' }, { name: 'description', content: 'A short bio and what I am up to right now.' }, { property: 'og:title', content: 'About — Life and Times' }, { property: 'og:description', content: 'A short bio and what I am up to right now.' }] }),
  component: About,
})

const links = [
  { label: 'Email', href: 'mailto:hello@lifeandtimes.xyz' },
  { label: 'GitHub', href: 'https://github.com' },
]

function About() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 sm:px-10"><header className="editorial-dark-header flex items-center justify-between border-b py-5"><Link to="/" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"><ArrowLeft className="size-3" /> Life and Times</Link><Link to="/notes" className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-primary">Notes</Link></header><section className="py-24 sm:py-32"><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Who's writing this</p><h1 className="font-serif text-6xl tracking-[-0.05em] sm:text-8xl">About</h1></section><section className="max-w-2xl border-t border-border pt-12"><p className="text-lg leading-8 text-muted-foreground"><em>(Placeholder — replace with your real bio.)</em> A couple of paragraphs on who you are, what you do, and how you ended up keeping a site like this one. Write it the way you'd explain yourself to someone at a dinner party, not the way you'd write a resume.</p><div className="mt-12 border-t border-border pt-8"><h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Right now</h2><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground"><em>(Placeholder.)</em> A sentence or two on what you're focused on this season — a project, a place, a question you're chewing on. Update this every so often so it stays true.</p></div><div className="mt-12 border-t border-border pt-8"><h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Elsewhere</h2><div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">{links.map((link) => <a key={link.label} href={link.href} className="editorial-link font-mono text-[10px] uppercase tracking-[0.14em] text-foreground">{link.label}</a>)}</div></div></section></main>
  )
}
