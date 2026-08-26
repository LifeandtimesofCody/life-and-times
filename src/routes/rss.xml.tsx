import { createFileRoute } from '@tanstack/react-router'
import { getCollection } from '@/data/content'

export const Route = createFileRoute('/rss/xml')({
  loader: () => {
    const notes = getCollection('notes').filter((item) => !item.data.draft).map((item) => ({ title: item.data.title, date: item.data.date, description: item.data.description, link: `https://lifeandtimes.xyz/notes/${item.id}` }))
    const ideas = getCollection('ideas').map((item) => ({ title: `Idea from ${item.data.date.toISOString().slice(0, 10)}`, date: item.data.date, description: item.body, link: 'https://lifeandtimes.xyz/ideas' }))
    return [...notes, ...ideas].sort((a, b) => b.date.valueOf() - a.date.valueOf())
  },
  component: RssFeed,
})

function RssFeed() {
  const items = Route.useLoaderData()
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Life and Times</title><link>https://lifeandtimes.xyz</link><description>Notes and ideas from a life in progress.</description>${items.map((item) => `<item><title><![CDATA[${item.title}]]></title><link>${item.link}</link><guid>${item.link}</guid><pubDate>${item.date.toUTCString()}</pubDate><description><![CDATA[${item.description}]]></description></item>`).join('')}</channel></rss>`
  return <pre className="whitespace-pre-wrap p-8 text-xs">{xml}</pre>
}
