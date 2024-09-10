import type {Jar} from "~/types/jar";

export const useJarStore = defineStore('jar', () => {

    const jars = ref<Jar[]>([])

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

    return {jars, fetchAllJars, deleteJarByIndex}
})