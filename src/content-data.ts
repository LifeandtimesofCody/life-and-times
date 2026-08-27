import noteOne from './content/notes/learning-to-notice.md?raw'
import noteTwo from './content/notes/why-i-keep-a-small-site.md?raw'
import ideaOne from './content/ideas/a-window-seat.md?raw'
import ideaTwo from './content/ideas/keep-the-receipt.md?raw'
import ideaThree from './content/ideas/the-useful-detour.md?raw'
import lisbon from './content/places/lisbon.md?raw'
import kyoto from './content/places/kyoto.md?raw'
import mexicoCity from './content/places/mexico-city.md?raw'
import { contentSchemas } from './content.config'

export interface NoteEntry { id: string; data: { title: string; date: Date; description: string; tags: string[]; draft: boolean }; body: string }
export interface IdeaEntry { id: string; data: { date: Date; tags: string[] }; body: string }
export interface PlaceEntry { id: string; data: { name: string; country: string; lat: number; lng: number; visited: string | Date; rating: number }; body: string }
type RawEntry = { id: string; raw: string }
type CollectionName = 'notes' | 'ideas' | 'places'
type Frontmatter = Record<string, string | number | boolean | string[] | Date>

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const lines = raw.replace(/^\uFEFF/, '').split(/\r?\n/)
  const end = lines.findIndex((line, index) => index > 0 && line.trim() === '---')
  const data: Frontmatter = {}
  for (const line of end > 0 ? lines.slice(1, end) : []) {
    const separator = line.indexOf(':')
    if (separator < 0) continue
    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1).trim()
    if (value.startsWith('[') && value.endsWith(']')) data[key] = value.slice(1, -1).split(',').map((item) => item.trim()).filter(Boolean)
    else if (value === 'true' || value === 'false') data[key] = value === 'true'
    else if (value !== '' && !Number.isNaN(Number(value))) data[key] = Number(value)
    else data[key] = value.replace(/^['"]|['"]$/g, '')
  }
  return { data, body: lines.slice(end > 0 ? end + 1 : 0).join('\n').trim() }
}

function parse<T extends object>(entry: RawEntry, collection: CollectionName, dates: string[] = []) {
  const parsed = parseFrontmatter(entry.raw)
  for (const key of dates) if (typeof parsed.data[key] === 'string') parsed.data[key] = new Date(parsed.data[key] as string)
  const data = contentSchemas[collection].parse(parsed.data)
  return { id: entry.id, data: data as T, body: parsed.body }
}

const notes: NoteEntry[] = [parse<NoteEntry['data']>({ id: 'learning-to-notice', raw: noteOne }, 'notes', ['date']), parse<NoteEntry['data']>({ id: 'why-i-keep-a-small-site', raw: noteTwo }, 'notes', ['date'])]
const ideas: IdeaEntry[] = [parse<IdeaEntry['data']>({ id: 'a-window-seat', raw: ideaOne }, 'ideas', ['date']), parse<IdeaEntry['data']>({ id: 'keep-the-receipt', raw: ideaTwo }, 'ideas', ['date']), parse<IdeaEntry['data']>({ id: 'the-useful-detour', raw: ideaThree }, 'ideas', ['date'])]
const places: PlaceEntry[] = [parse<PlaceEntry['data']>({ id: 'lisbon', raw: lisbon }, 'places'), parse<PlaceEntry['data']>({ id: 'kyoto', raw: kyoto }, 'places'), parse<PlaceEntry['data']>({ id: 'mexico-city', raw: mexicoCity }, 'places')]

export function getCollection(name: 'notes'): NoteEntry[]
export function getCollection(name: 'ideas'): IdeaEntry[]
export function getCollection(name: 'places'): PlaceEntry[]
export function getCollection(name: 'notes' | 'ideas' | 'places') { return name === 'notes' ? notes : name === 'ideas' ? ideas : places }
