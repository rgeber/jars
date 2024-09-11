import {z} from "zod";
import {RecordId} from "surrealdb.js";


export const jarCreateFormSchema = z.object({
  title: z.string().min(0).max(127)
})

export type JarCreateForm = z.infer<typeof jarCreateFormSchema>

export const newJarSchema = jarCreateFormSchema.extend({
  title: z.string().min(3).max(127),
  owner: z.instanceof(RecordId),
  ownerEmail: z.string().email()
})

export type NewJar = z.infer<typeof newJarSchema>

export const jarSchema = newJarSchema.extend({
  id: z.instanceof(RecordId),
  creationDate: z.date(),
})

export type Jar = z.infer<typeof jarSchema>