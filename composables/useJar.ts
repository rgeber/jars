import {RecordId} from "surrealdb.js";
import type {Jar} from "~/types/jar";
import {jarSchema} from "~/types/jar";

export const useJarService = () => {
    const {$surreal} = useNuxtApp();  // Access SurrealDB instance

    // Fetch a character by username
    const getJarById = async (id: string): Promise<Jar | null> => {
        const result = await $surreal.select(new RecordId('jar', id))

        const resultValidation  = jarSchema.safeParse(result);

        if (resultValidation.success) {
            return {
                ...resultValidation.data,
                kind: 'Jar'
            };
        } else {
            return null
        }

    };

    // Create a new character
    const createJar = async (newJar: Jar): Promise<void> => {
        await $surreal.create('jar', newJar);
    };

    // Update an existing character
    const updateJar = async (id: string, updatedData: Partial<Jar>): Promise<void> => {
        await $surreal.merge(`jar:${id}`, updatedData);
    };

    // Delete a character by ID
    const deleteJar = async (id: string): Promise<void> => {
        await $surreal.delete(`jar:${id}`);
    };

    const getAllJars = async (): Promise<[Jar]> => {
        const result: [Jar] = await $surreal.query<[Jar]>('SELECT * FROM jar')
        console.log(result)
        return result
    };

    return {
        getJarById,
        createJar,
        updateJar,
        deleteJar,
        getAllJars,
    };
};