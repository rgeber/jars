import {RecordId, Uuid} from "surrealdb.js";
import {type Pickle, type PickleCreateForm, pickleSchema, type NewPickle} from "~/types/pickle";
import {z} from "zod";
import {userSchema} from "~/types/user";
import {getValidatedOwner} from "~/utils/owner_utils";
import type {Jar} from "~/types/jar";

export const usePickleService = () => {
    const {$surreal} = useNuxtApp();  // Access SurrealDB instance

    // ---------------------------------------------------------------------------------------------------------------
    // Fetch a pickle by ID
    const getPickleById = async (id: RecordId): Promise<Pickle | null> => {
        const validatedResult = pickleSchema.safeParse(await $surreal.select(id))
        return validatedResult.success ?  <Pickle>validatedResult.data : null
    }

    // ---------------------------------------------------------------------------------------------------------------
    // Create a new pickle with NewPickle
    const createPickle = async (newPickle: NewPickle): Promise<Pickle | null> => {
        const validatedResult = pickleSchema.safeParse((await $surreal.create('pickle', newPickle))[0])
        return validatedResult.success ? <Pickle>validatedResult.data : null
    }

    // ---------------------------------------------------------------------------------------------------------------
    // Create a new pickle with pickle creation form
    // The form does not require ownership information, etc. This method combines the data into a valid NewPickle for
    // DB creation
    const createPickleFromFormData = async (createFormData: PickleCreateForm): Promise<Pickle | null> => {

        const owner = getValidatedOwner()
        if (owner === null) return null;

        const newPickle = {
            ...createFormData,
            owner: owner.id,
            ownerEmail: owner.email
        }

        return createPickle(newPickle)
    }

    // ---------------------------------------------------------------------------------------------------------------
    // Update an existing pickle
    const updatePickle = async (id: RecordId, updatedData: Partial<Pickle>): Promise<Pickle | null> => {
        const validatedResult = pickleSchema.safeParse(await $surreal.merge(id, updatedData))
        return validatedResult.success ?  <Pickle>validatedResult.data : null
    }

    // ---------------------------------------------------------------------------------------------------------------
    // Delete a pickle by ID
    const deletePickle = async (id: RecordId): Promise<Pickle | null> => {
        const validatedResult = pickleSchema.safeParse(await $surreal.delete(id))
        return validatedResult.success ?  <Pickle>validatedResult.data : null
    }

    // ---------------------------------------------------------------------------------------------------------------
    const getAllPickles = async (): Promise<Pickle[]> => {
        const queryResult = await $surreal.query('SELECT * FROM pickle')
        const validatedResult = z.array(pickleSchema).safeParse(queryResult[0])
        return validatedResult.success ?  <Pickle[]>validatedResult.data : []
    }

    // ---------------------------------------------------------------------------------------------------------------
    const getPickleForJar = async(jar: Jar): Promise<Pickle[]> => {
        const queryResult = await $surreal.query('SELECT * FROM pickle WHERE jar=record::id($jar)', {
            jar: jar.id
        })
        const validatedResult = z.array(pickleSchema).safeParse(queryResult[0])
        return validatedResult.success ?  <Pickle[]>validatedResult.data : []
    }

    // ---------------------------------------------------------------------------------------------------------------
    return {
        getPickleById,
        createPickle,
        createPickleFromFormData,
        updatePickle,
        deletePickle,
        getAllPickles,
        getPickleForJar
    }
}