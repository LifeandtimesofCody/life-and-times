import matter from 'gray-matter'
import noteOne from '../content/notes/learning-to-notice.md?raw'
import noteTwo from '../content/notes/why-i-keep-a-small-site.md?raw'
import ideaOne from '../content/ideas/a-window-seat.md?raw'
import ideaTwo from '../content/ideas/keep-the-receipt.md?raw'
import ideaThree from '../content/ideas/the-useful-detour.md?raw'
import lisbon from '../content/places/lisbon.md?raw'
import kyoto from '../content/places/kyoto.md?raw'
import mexicoCity from '../content/places/mexico-city.md?raw'

export interface NoteEntry { id: string; data: { title: string; date: Date; description: string; tags: string[]; draft: boolean }; body: string }
export interface IdeaEntry { id: string; data: { date: Date; tags: string[] }; body: string }
export interface PlaceEntry { id: string; data: { name: string; country: string; lat: number; lng: number; visited: string | Date; rating: number }; body: string }
type RawEntry = { id: string; raw: string }
function parse<T extends object>(entry: RawEntry) { const parsed = matter(entry.raw); return { id: entry.id, data: parsed.data as T, body: parsed.content.trim() } }
const notes: NoteEntry[] = [parse<NoteEntry['data']>({ id: 'learning-to-notice', raw: noteOne }), parse<NoteEntry['data']>({ id: 'why-i-keep-a-small-site', raw: noteTwo })]
const ideas: IdeaEntry[] = [parse<IdeaEntry['data']>({ id: 'a-window-seat', raw: ideaOne }), parse<IdeaEntry['data']>({ id: 'keep-the-receipt', raw: ideaTwo }), parse<IdeaEntry['data']>({ id: 'the-useful-detour', raw: ideaThree })]
const places: PlaceEntry[] = [parse<PlaceEntry['data']>({ id: 'lisbon', raw: lisbon }), parse<PlaceEntry['data']>({ id: 'kyoto', raw: kyoto }), parse<PlaceEntry['data']>({ id: 'mexico-city', raw: mexicoCity })]
export function getCollection(name: 'notes'): NoteEntry[]
export function getCollection(name: 'ideas'): IdeaEntry[]
export function getCollection(name: 'places'): PlaceEntry[]
export function getCollection(name: 'notes' | 'ideas' | 'places') { return name === 'notes' ? notes : name === 'ideas' ? ideas : places }
