import {RecordId, Uuid} from "surrealdb.js";
import {type Jar, jarSchema, type NewJar} from "~/types/jar";
import {z} from "zod";

export const useJarService = () => {
    const {$surreal} = useNuxtApp();  // Access SurrealDB instance

    // Fetch a character by username
    const getJarById = async (id: RecordId): Promise<Jar | null> => {
        const validatedResult = jarSchema.safeParse(await $surreal.select(id))
        return validatedResult.success ?  <Jar>validatedResult.data : null
    }

    // Create a new character
    const createJar = async (newJar: NewJar): Promise<Jar | null> => {
        const validatedResult = jarSchema.safeParse((await $surreal.create('jar', newJar))[0])
        return validatedResult.success ?  <Jar>validatedResult.data : null
    }

    // Update an existing character
    const updateJar = async (id: RecordId, updatedData: Partial<Jar>): Promise<Jar | null> => {
        const validatedResult = jarSchema.safeParse(await $surreal.merge(id, updatedData))
        return validatedResult.success ?  <Jar>validatedResult.data : null
    }

    // Delete a character by ID
    const deleteJar = async (id: RecordId): Promise<Jar | null> => {
        const validatedResult = jarSchema.safeParse(await $surreal.delete(id))
        return validatedResult.success ?  <Jar>validatedResult.data : null
    }

    const getAllJars = async (): Promise<Jar[]> => {
        const queryResult = await $surreal.query('SELECT * FROM jar')
        const validatedResult = z.array(jarSchema).safeParse(queryResult[0])
        return validatedResult.success ?  <Jar[]>validatedResult.data : []
    }

    const subscribeJars = async ():Promise<Uuid> => {
        return await $surreal.live('jars')
    }

    return {
        getJarById,
        createJar,
        updateJar,
        deleteJar,
        getAllJars,
        subscribeJars,
    }
}