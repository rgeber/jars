import type {Jar} from "~/types/jar";
import type {Uuid} from "surrealdb.js";

export const useJarStore = defineStore('jar', () => {

    const {$surreal} = useNuxtApp();  // Access SurrealDB instance

    const jars = ref<Jar[]>([])

    const liveQueryId = ref<Uuid|null>(null)

    const startLiveQuery = async () => {
        console.debug('Starting Live query for jars.')
        liveQueryId.value = await $surreal.live('jar', (action, result) => {
            console.log('live', action, result)
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