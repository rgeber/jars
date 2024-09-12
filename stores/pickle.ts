import type {Uuid} from "surrealdb.js";
import {type Pickle, pickleSchema} from "~/types/pickle";
import type {Jar} from "~/types/jar";

export const usePickleStore = defineStore('pickle', () => {

    const {$surreal} = useNuxtApp();  // Access SurrealDB instance

    const pickle = ref<Pickle[]>([])

    const liveQueryId = ref<Uuid | null>(null)

    const startLiveQuery = async () => {
        console.debug('Starting Live query for pickle.')
        liveQueryId.value = await $surreal.live('pickle', (action, result) => {

            console.log(result)

            const resultValidation = pickleSchema.safeParse(result)

            if (!resultValidation.success) return console.error('Live query result for pickle failed validation.', action, result)
            const resultPickle = resultValidation.data

            if (action === 'CREATE') {
                const localIndex = pickle.value.findIndex(pickle => pickle.id.id === resultPickle.id.id)
                if (localIndex < 0) pickle.value.push(resultPickle)
            }

            else if (action === 'DELETE') {
                const localIndex = pickle.value.findIndex(pickle => pickle.id.id === resultPickle.id.id)
                if (localIndex >= 0) pickle.value.splice(localIndex, 1)
                else console.warn('Unable to find pickle in store.', resultPickle)
            }

            else if (action === 'UPDATE') {
                const localIndex = pickle.value.findIndex(pickle => pickle.id.id === resultPickle.id.id)
                if (localIndex >= 0) pickle.value[localIndex] = resultPickle
                else pickle.value.push(resultPickle)
            }

        })
    }

    const fetchAll = async () => {
        pickle.value = await usePickleService().getAllPickle();
    }

    const fetchForJar = async (jar: Jar) => {
        pickle.value = await usePickleService().getPickleForJar(jar);
    }

    // const getPickleBySlug = (slug: string) => jars.value.find(jar => jar.slug === slug)

    const deleteByIndex = async (index: number): Promise<Pickle | null> => {
        if (typeof pickle.value[index] === 'undefined') {
            console.error(`Attempting to delete Pickle by index. Index ${index} does not exist.`)
            return null;
        }
        const deletedPickle = await usePickleService().deletePickle(pickle.value[index].id)
        pickle.value.splice(index, 1)

        return deletedPickle
    }

    return {pickle, fetchAll, deleteByIndex, fetchForJar, startLiveQuery}
})