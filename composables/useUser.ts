import type {User} from "~/types/user";
import {RecordId} from "surrealdb.js";
import {userSchema} from "~/types/user";

export const useUserService = () => {
    const {$surreal} = useNuxtApp();  // Access SurrealDB instance

    // Fetch a character by username
    const getUserByUsername = async (username: string): Promise<User | null> => {
        const result = await $surreal.select(new RecordId('user', username))

        const resultValidation  = userSchema.safeParse(result);

        if (resultValidation.success) {
            return {
                ...resultValidation.data,
                kind: 'User'
            };
        } else {
            return null
        }

    };

    // Create a new character
    const createUser = async (newUser: User): Promise<void> => {
        console.log(newUser);
        await $surreal.create('user', newUser);
    };

    // Update an existing character
    const updateUser = async (id: string, updatedData: Partial<User>): Promise<void> => {
        await $surreal.merge(`user:${id}`, updatedData);
    };

    // Delete a character by ID
    const deleteUser = async (id: string): Promise<void> => {
        await $surreal.delete(`user:${id}`);
    };

    return {
        getUserByUsername,
        createUser,
        updateUser,
        deleteUser,
    };
};