import {RecordId} from "surrealdb.js";
import {type NewUser, type User, userSchema} from "~/types/user";


export const useUserService = () => {
    const {$surreal} = useNuxtApp();  // Access SurrealDB instance

    // ---------------------------------------------------------------------------------------------------------------
    // Fetch a user by id
    const getUserById = async (id: RecordId): Promise<User | null> => {
        const validatedResult = userSchema.safeParse(await $surreal.select(id))
        return validatedResult.success ?  <User>validatedResult.data : null
    }

    // ---------------------------------------------------------------------------------------------------------------
    // Fetch a user by username
    const getUserByUsername = async (username: string): Promise<User | null> => {
        return getUserById(new RecordId('user', username))
    }

    // ---------------------------------------------------------------------------------------------------------------
    // Create a new user
    const createUser = async (newUser: NewUser): Promise<User | null> => {
        const userId = new RecordId('user', newUser.email)
        const validatedResult = userSchema.safeParse((await $surreal.create(userId, newUser))[0])
        return validatedResult.success ?  <User>validatedResult.data : null
    }

    // ---------------------------------------------------------------------------------------------------------------
    // Update an existing user
    const updateUser = async (id: RecordId, updatedData: Partial<User>): Promise<User | null> => {
        const validatedResult = userSchema.safeParse(await $surreal.merge(id, updatedData))
        return validatedResult.success ?  <User>validatedResult.data : null
    }

    // ---------------------------------------------------------------------------------------------------------------
    // Delete a user by ID
    const deleteUser = async (id: RecordId): Promise<User | null> => {
        const validatedResult = userSchema.safeParse(await $surreal.delete(id))
        return validatedResult.success ?  <User>validatedResult.data : null
    }

    // ---------------------------------------------------------------------------------------------------------------
    return {
        getUserById,
        getUserByUsername,
        createUser,
        updateUser,
        deleteUser,
    }
}