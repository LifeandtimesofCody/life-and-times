import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import { BlinkClientBoundary } from '@/components/BlinkClientBoundary'

const recentItems = [
  { type: 'note', date: 'Aug 18, 2026', title: 'Learning to notice', href: '/notes/learning-to-notice' },
  { type: 'idea', date: 'Aug 11, 2026', title: 'Keep the receipt', href: '/ideas' },
  { type: 'note', date: 'Jul 04, 2026', title: 'Why I keep a small site', href: '/notes/why-i-keep-a-small-site' },
  { type: 'idea', date: 'Jul 19, 2026', title: 'The useful detour', href: '/ideas' },
]

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Life and Times — notes from a life in progress' },
      { name: 'description', content: 'Life and Times is a small personal archive of notes, ideas, and places.' },
      { property: 'og:title', content: 'Life and Times' },
      { property: 'og:description', content: 'Notes, ideas, and places from a life in progress.' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: Home,
})

function ThemeToggle() {
  return (
    <BlinkClientBoundary fallback={<span className="size-9" />}>
      <button type="button" aria-label="Toggle dark mode" onClick={() => document.documentElement.classList.toggle('dark')} className="group flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
        <Sun className="size-4 dark:hidden" /><Moon className="hidden size-4 dark:block" />
      </button>
    </BlinkClientBoundary>
  )
}

function SiteHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border py-5">
      <Link to="/" className="font-serif text-lg tracking-tight transition-colors hover:text-primary">Life and Times</Link>
      <nav className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:gap-7">
        <Link to="/notes" className="transition-colors hover:text-primary">Notes</Link>
        <Link to="/ideas" className="transition-colors hover:text-primary">Ideas</Link>
        <Link to="/places" className="transition-colors hover:text-primary">Places</Link>
        <ThemeToggle />
      </nav>
    </header>
  )
}

function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-20 sm:px-10">
      <SiteHeader />
      <section className="grid gap-12 py-24 sm:grid-cols-[1fr_1.2fr] sm:items-end sm:py-36">
        <div>
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">A personal archive · 2026</p>
          <h1 className="max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.045em] sm:text-7xl">A life, in fragments.</h1>
        </div>
        <div className="max-w-md border-l border-primary pl-6 text-lg leading-8 text-muted-foreground sm:mb-1 sm:ml-auto">
          <p>Notes on paying attention, ideas before they are finished, and a record of the places that changed the shape of a day.</p>
          <p className="mt-5 text-sm text-foreground">I am keeping this small on purpose.</p>
        </div>
      </section>
      <section className="border-t border-border pt-6" aria-labelledby="recent-heading">
        <div className="mb-8 flex items-center justify-between"><h2 id="recent-heading" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Recently, in the archive</h2><span className="font-mono text-[10px] text-muted-foreground">04 / 04</span></div>
        <div className="divide-y divide-border">
          {recentItems.map((item, index) => (
            <Link key={`${item.type}-${item.title}`} to={item.href} className="group grid gap-2 py-5 transition-colors hover:text-primary sm:grid-cols-[90px_72px_1fr_20px] sm:items-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{item.date}</span><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">{item.type}</span><span className="font-serif text-2xl tracking-tight">{item.title}</span><ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>
      <footer className="mt-24 flex flex-col justify-between gap-3 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row"><span>lifeandtimes.xyz</span><span>Made slowly · <a href="/rss.xml" className="hover:text-primary">RSS</a></span></footer>
    </main>
  )
}
