import {z} from "zod"

export const authSessionUserSchema = z.object({
    "canRefresh": z.boolean(),
    "loggedInAt": z.number().positive(),
    "updatedAt": z.number().positive(),
    "expireAt": z.number().positive(),
    "provider": z.string(),
    "providerInfo": z.object(
        {
            "sub": z.string(),
            "email": z.string().email(),
            "email_verified": z.boolean(),
            "https://surrealdb.com/ns": z.string(),
            "https://surrealdb.com/db": z.string(),
            "https://surrealdb.com/sc": z.string(),
            "https://surrealdb.com/tk": z.string(),
            "https://surrealdb.com/email": z.string().email(),
            "https://surrealdb.com/email_verified": z.boolean(),
            "https://surrealdb.com/name": z.string(),
            "https://surrealdb.com/username": z.string(),
            "name": z.string(),
            "given_name": z.string(),
            "preferred_username": z.string(),
            "nickname": z.string(),
            "groups": z.array(z.string().optional())
        }
    ),
    "accessToken": z.string()
})

export type AuthSessionUser = z.infer<typeof authSessionUserSchema>