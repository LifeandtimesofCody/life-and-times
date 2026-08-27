import { useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { X } from 'lucide-react'
import worldData from '@/data/world.json'

export interface PlaceMapItem {
  id: string
  name: string
  country: string
  lat: number
  lng: number
  visited: string
  rating: number
  html: string
}

const geographyData = worldData

export function WorldMap({ places }: { places: PlaceMapItem[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(places[0]?.id ?? null)
  const selected = useMemo(() => places.find((place) => place.id === selectedId), [places, selectedId])

  return (
    <div className="relative grid min-h-[480px] overflow-hidden border-y border-border bg-[var(--map-water)] lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="relative min-h-[480px] p-3 sm:p-8">
        <ComposableMap projection="geoEqualEarth" projectionConfig={{ scale: 145 }} className="h-full w-full">
          <Geographies geography={geographyData}>
            {({ geographies }) => geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="var(--map-land)"
                stroke="var(--map-stroke)"
                strokeWidth={0.35}
                style={{ default: { outline: 'none' }, hover: { outline: 'none', fill: 'var(--orange)' }, pressed: { outline: 'none' } }}
              />
            ))}
          </Geographies>
          {places.map((place) => (
            <Marker key={place.id} coordinates={[place.lng, place.lat]} onClick={() => setSelectedId(place.id)}>
              <circle r={selectedId === place.id ? 8 : 5} fill="var(--orange)" stroke="var(--navy)" strokeWidth={2} className="cursor-pointer transition-all duration-200" />
              <circle r={selectedId === place.id ? 14 : 9} fill="none" stroke="var(--orange)" strokeOpacity={selectedId === place.id ? 0.45 : 0} strokeWidth={1.5} className="pointer-events-none" />
            </Marker>
          ))}
        </ComposableMap>
        <p className="absolute bottom-5 left-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:left-10">A record in coordinates · {places.length} places</p>
      </div>
      <aside className="border-t border-border bg-ivory p-6 text-ink sm:p-8 lg:border-l lg:border-t-0">
        {selected ? (
          <div className="animate-fade-in">
            <div className="mb-10 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Selected place</p>
                <h2 className="font-serif text-3xl tracking-tight">{selected.name}</h2>
              </div>
              <button type="button" aria-label="Clear selection" onClick={() => setSelectedId(null)} className="rounded-sm p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"><X className="size-4" /></button>
            </div>
            <dl className="mb-8 grid grid-cols-2 gap-4 border-y border-border py-4 font-mono text-[10px] uppercase tracking-[0.12em]">
              <div><dt className="text-muted-foreground">Country</dt><dd className="mt-1 text-foreground">{selected.country}</dd></div>
              <div><dt className="text-muted-foreground">Visited</dt><dd className="mt-1 text-foreground">{selected.visited}</dd></div>
              <div><dt className="text-muted-foreground">Rating</dt><dd className="mt-1 text-foreground">{selected.rating.toFixed(1)} / 5</dd></div>
            </dl>
            <div className="prose-place text-sm leading-7 text-muted-foreground" dangerouslySetInnerHTML={{ __html: selected.html }} />
          </div>
        ) : (
          <div className="flex h-full min-h-40 items-center justify-center text-center"><p className="max-w-[18rem] text-sm leading-6 text-muted-foreground">Select a pin to read the notes from that place.</p></div>
        )}
      </aside>
    </div>
  )
}
