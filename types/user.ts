import {z} from "zod";
import {recordIdSchema} from "~/types/common";

export const userSchema = z.object({
    id: recordIdSchema,
    username: z.string().min(3).max(63),
    email: z.string().email(),
    creationDate: z.date(),
    name: z.string().min(1).max(63)
})

export type User = z.infer<typeof userSchema> & {kind: 'User'}
