import { z } from 'zod'

export const contentSchemas = {
  notes: z.object({ title: z.string(), date: z.coerce.date(), description: z.string(), tags: z.array(z.string()).default([]), draft: z.boolean().default(false) }),
  ideas: z.object({ date: z.coerce.date(), tags: z.array(z.string()).default([]) }),
  places: z.object({ name: z.string(), country: z.string(), lat: z.number(), lng: z.number(), visited: z.union([z.string(), z.coerce.date()]), rating: z.number().min(0).max(5) }),
  projects: z.object({ title: z.string(), tagline: z.string(), status: z.enum(['active', 'shipped', 'paused']).default('active'), date: z.coerce.date(), tags: z.array(z.string()).default([]), url: z.string().optional() }),
}
