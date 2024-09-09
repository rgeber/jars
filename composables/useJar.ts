import {RecordId} from "surrealdb.js";
import type {Jar} from "~/types/jar";

export const useJarService = () => {
    const {$surreal} = useNuxtApp();  // Access SurrealDB instance

    // Fetch a character by username
    const getJarById = async (id: string): Promise<Jar | null> => {
        const result = await $surreal.select<Jar>(new RecordId('jar', id))
        return result.length > 0 ? result[0] : null;
    };

    // Create a new character
    const createJar = async (newJar: Jar): Promise<Jar | null> => {
        const result = await $surreal.create<Jar>('jar', newJar)
        return result.length > 0 ? result[0] : null;
    };

    // Update an existing character
    const updateJar = async (id: string, updatedData: Partial<Jar>): Promise<void> => {
        await $surreal.merge(`jar:${id}`, updatedData);
    };

    // Delete a character by ID
    const deleteJar = async (id: string): Promise<void> => {
        await $surreal.delete(`jar:${id}`);
    };

    const getAllJars = async (): Promise<Jar[]> => {
        const result = await $surreal.query<[Jar[]]>('SELECT * FROM jar')
        return result[0];
    };

    return {
        getJarById,
        createJar,
        updateJar,
        deleteJar,
        getAllJars,
    };
};