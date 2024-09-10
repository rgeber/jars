import type {Jar} from "~/types/jar";
import type {Uuid} from "surrealdb.js";
import {jarSchema, newJarSchema} from "~/types/jar";

export const useJarStore = defineStore('jar', () => {

    const {$surreal} = useNuxtApp();  // Access SurrealDB instance

    const jars = ref<Jar[]>([])

    const liveQueryId = ref<Uuid | null>(null)

    const startLiveQuery = async () => {
        console.debug('Starting Live query for jars.')
        liveQueryId.value = await $surreal.live('jar', (action, result) => {

            console.log(result)

            const resultValidation = jarSchema.safeParse(result)

            if (!resultValidation.success) return console.error('Live query result for jar failed validation.', action, result)
            const resultJar = resultValidation.data

            if (action === 'CREATE') {
                const localIndex = jars.value.findIndex(jar => jar.id.id === resultJar.id.id)
                console.log(localIndex)
                if (localIndex < 0) jars.value.push(resultJar)
            }

            else if (action === 'DELETE') {
                const localIndex = jars.value.findIndex(jar => jar.id.id === resultJar.id.id)
                if (localIndex >= 0) jars.value.splice(localIndex, 1)
                else console.warn('Unable to find jar in store.', resultJar)
            }

            else if (action === 'UPDATE') {
                const localIndex = jars.value.findIndex(jar => jar.id.id === resultJar.id.id)
                if (localIndex >= 0) jars.value[localIndex] = resultJar
                else jars.value.push(resultJar)
            }

        })
    }

    const fetchAllJars = async () => {
        jars.value = await useJarService().getAllJars();

    }

    const deleteJarByIndex = async (index: number): Promise<Jar | null> => {
        if (typeof jars.value[index] === 'undefined') {
            console.error(`Attempting to delete Jar by index. Index ${index} does not exist.`)
            return null;
        }
        const deletedJar = await useJarService().deleteJar(jars.value[index].id)
        jars.value.splice(index, 1)

        return deletedJar
    }

    return {jars, fetchAllJars, deleteJarByIndex, startLiveQuery}
})