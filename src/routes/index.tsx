import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import { BlinkClientBoundary } from '@/components/BlinkClientBoundary'

const recentItems = [
  { type: 'note', date: 'Aug 18, 2026', title: 'Learning to notice', href: '/notes/learning-to-notice' },
  { type: 'idea', date: 'Aug 11, 2026', title: 'Keep the receipt', href: '/ideas' },
  { type: 'idea', date: 'Jul 19, 2026', title: 'The useful detour', href: '/ideas' },
  { type: 'note', date: 'Jul 04, 2026', title: 'Why I keep a small site', href: '/notes/why-i-keep-a-small-site' },
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
      <button type="button" aria-label="Toggle dark mode" onClick={() => { const dark = !document.documentElement.classList.contains('dark'); document.documentElement.classList.toggle('dark', dark); localStorage.setItem('theme', dark ? 'dark' : 'light') }} className="group flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
        <Sun className="size-4 dark:hidden" /><Moon className="hidden size-4 dark:block" />
      </button>
    </BlinkClientBoundary>
  )
}

function SiteHeader() {
  return (
    <header className="editorial-dark-header flex items-center justify-between border-b py-5">
      <Link to="/" className="font-serif text-lg tracking-tight transition-colors hover:text-primary">Life and Times</Link>
      <nav className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.16em] sm:gap-7">
        <Link to="/notes" className="editorial-nav-link transition-colors hover:text-primary">Notes</Link>
        <Link to="/ideas" className="editorial-nav-link transition-colors hover:text-primary">Ideas</Link>
        <Link to="/places" className="editorial-nav-link transition-colors hover:text-primary">Places</Link>
        <ThemeToggle />
      </nav>
    </header>
  )
}

function Home() {
  return (
    <main className="bg-background">
      <section className="bg-navy text-ivory">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <SiteHeader />
          <section className="grid gap-12 py-24 sm:grid-cols-[1.15fr_.85fr] sm:items-end sm:py-36">
            <div className="editorial-reveal">
              <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.2em] text-orange">A personal archive · 2026</p>
              <h1 className="max-w-3xl font-serif text-6xl leading-[0.94] tracking-[-0.05em] sm:text-8xl">A life, in <span className="editorial-underline">fragments.</span></h1>
            </div>
            <div className="max-w-sm border-l border-orange pl-6 text-lg leading-8 text-ivory/80 sm:mb-1 sm:ml-auto">
              <p>Notes on paying attention, ideas before they are finished, and a record of the places that changed the shape of a day.</p>
              <p className="mt-5 text-sm text-ivory">I am keeping this small on purpose.</p>
            </div>
          </section>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28" aria-labelledby="recent-heading">
        <div className="mb-8 flex items-center justify-between"><h2 id="recent-heading" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Recently, in the archive</h2><span className="font-mono text-[10px] text-muted-foreground">04 / 04</span></div>
        <div className="divide-y divide-border">
          {recentItems.map((item) => (
            <Link key={`${item.type}-${item.title}`} to={item.href} className="editorial-link group grid gap-2 py-6 sm:grid-cols-[110px_76px_1fr_20px] sm:items-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{item.date}</span><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">{item.type}</span><span className="font-serif text-2xl tracking-tight sm:text-3xl">{item.title}</span><ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>
      <footer className="bg-navy text-ivory/70"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-6 py-8 font-mono text-[10px] uppercase tracking-[0.14em] sm:flex-row sm:px-10"><span>lifeandtimes.xyz</span><span>Made slowly · <a href="/rss.xml" className="editorial-link hover:text-orange">RSS</a></span></div></footer>
    </main>
  )
}
