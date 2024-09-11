import {z} from "zod";
import {RecordId} from "surrealdb.js";


export const pickleCreateFormSchema = z.object({
    type: z.enum(['text/text', 'text/markdown', 'image/jpg', 'image/png', 'image/webp', 'application/epub+zip']),
    value: z.string().nullable(),
    jar: z.instanceof(RecordId)
})

export type PickleCreateForm = z.infer<typeof pickleCreateFormSchema>

export const newPickleSchema = pickleCreateFormSchema.extend({
    owner: z.instanceof(RecordId),
    ownerEmail: z.string().email()
})

export type NewPickle = z.infer<typeof newPickleSchema>

export const pickleSchema = newPickleSchema.extend({
    id: z.instanceof(RecordId),
    creationDate: z.date(),
})

export type Pickle = z.infer<typeof pickleSchema>