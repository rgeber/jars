import {z} from "zod";
import {RecordId} from "surrealdb.js";

export const newUserSchema = z.object({
    username: z.string().min(3).max(63),
    email: z.string().email(),
    creationDate: z.date(),
    name: z.string().min(1).max(63)
})

export type NewUser = z.infer<typeof newUserSchema>

export const userSchema = newUserSchema.extend({
    id: z.instanceof(RecordId),
})

export type User = z.infer<typeof userSchema>
