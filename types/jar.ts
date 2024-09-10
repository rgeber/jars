import {z} from "zod";
import {RecordId} from "surrealdb.js";

// Used when creating a new Jar. `id` is not defined here as SurrealDB is supposed
// to take core of creating one.

export const newJarSchema = z.object({
  title: z.string().min(1).max(127),
  creationDate: z.date(),
  owner: z.instanceof(RecordId),
  ownerEmail: z.string().email()
})

export type NewJar = z.infer<typeof newJarSchema>

// Use for jar instances that are retrieved from SurrealDB
export const jarSchema = newJarSchema.extend({
  id: z.instanceof(RecordId)
})

export type Jar = z.infer<typeof jarSchema>