import Surreal from "surrealdb.js";

export default defineNuxtPlugin((nuxtApp) => {

    console.debug('Initializing SurrealDB plugin.');

    const config = useRuntimeConfig().public.surrealdb

    const surreal = new Surreal()

    const connDB = async() => {
            try {
                await surreal.connect(config.url)
                await surreal.use({
                    namespace: config.ns,
                    database: config.db
                })
                await surreal.signin({
                    username: 'root',
                    password: 'root'
                })
            } catch (e) {
                console.error("Failed to connect to SurrealDB", e)
            }
        }

    if (import.meta.client) {
        connDB()
            .then((x) => console.log(x))
            .catch((x) => console.error(x))
            .finally(() => console.log('finally'))
    }

    return {
        provide: {
            surreal,
        }
    }
});
