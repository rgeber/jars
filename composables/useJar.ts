import {RecordId, Uuid} from "surrealdb.js";
import {type Jar, type JarCreateForm, jarSchema, type NewJar} from "~/types/jar";
import {z} from "zod";
import {userSchema} from "~/types/user";

export const useJarService = () => {
    const {$surreal} = useNuxtApp();  // Access SurrealDB instance

    // ---------------------------------------------------------------------------------------------------------------
    // Fetch a jar by ID
    const getJarById = async (id: RecordId): Promise<Jar | null> => {
        const validatedResult = jarSchema.safeParse(await $surreal.select(id))
        return validatedResult.success ?  <Jar>validatedResult.data : null
    }

    // ---------------------------------------------------------------------------------------------------------------
    // Create a new jar with NewJar
    const createJar = async (newJar: NewJar): Promise<Jar | null> => {
        const validatedResult = jarSchema.safeParse((await $surreal.create('jar', newJar))[0])
        return validatedResult.success ?  <Jar>validatedResult.data : null
    }

    // ---------------------------------------------------------------------------------------------------------------
    // Create a new jar with jar creation form
    // The form does not require ownership information, etc. This method combines the data into a valid NewJar for
    // DB creation
    const createJarFromFormData = async (createFormData: JarCreateForm): Promise<Jar | null> => {

        const ownerValidation = userSchema.safeParse(useNuxtApp().$surrealUserAccount.value)
        if (!ownerValidation.success) {
            console.error('Unable to validate SurrealDB user object.', useNuxtApp().$surrealUserAccount.value)
            return null
        }

        const owner = ownerValidation.data

        const newJar = {
            ...createFormData,
            owner: owner.id,
            ownerEmail: owner.email
        }

        return createJar(newJar)
    }

    // ---------------------------------------------------------------------------------------------------------------
    // Update an existing jar
    const updateJar = async (id: RecordId, updatedData: Partial<Jar>): Promise<Jar | null> => {
        const validatedResult = jarSchema.safeParse(await $surreal.merge(id, updatedData))
        return validatedResult.success ?  <Jar>validatedResult.data : null
    }

    // ---------------------------------------------------------------------------------------------------------------
    // Delete a jar by ID
    const deleteJar = async (id: RecordId): Promise<Jar | null> => {
        const validatedResult = jarSchema.safeParse(await $surreal.delete(id))
        return validatedResult.success ?  <Jar>validatedResult.data : null
    }

    // ---------------------------------------------------------------------------------------------------------------
    const getAllJars = async (): Promise<Jar[]> => {
        const queryResult = await $surreal.query('SELECT * FROM jar')
        const validatedResult = z.array(jarSchema).safeParse(queryResult[0])
        return validatedResult.success ?  <Jar[]>validatedResult.data : []
    }

    // ---------------------------------------------------------------------------------------------------------------
    // TODO: Is this even needed?
    const subscribeJars = async ():Promise<Uuid> => {
        return await $surreal.live('jars')
    }

    // ---------------------------------------------------------------------------------------------------------------
    return {
        getJarById,
        createJar,
        createJarFromFormData,
        updateJar,
        deleteJar,
        getAllJars,
        subscribeJars,
    }
}