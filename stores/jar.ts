import type {Jar} from "~/types/jar";

export const useJarStore = defineStore('jar', () => {

    const {getAllJars} = useJarService()

    const jars = ref<Jar[]>([])

    const fetchAllJars = async () => {
        jars.value = await getAllJars();
    }

    return {jars, fetchAllJars}
})