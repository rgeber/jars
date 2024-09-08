import Surreal from "surrealdb.js";
import {watch} from 'vue';

export default defineNuxtPlugin((nuxtApp) => {

    console.debug('Initializing SurrealDB plugin.');

    const config = useRuntimeConfig().public.surrealdb
    const {loggedIn, user} = useOidcAuth()

    const surreal = new Surreal()

    const connDB = async () => {
        try {
            if (typeof user.value.accessToken !== 'string') {
                console.error('SurrealDB connection failed. User access token is undefined.')
                return;
            }
            console.debug('Establishing SurrealDB connection', config.url)
            await surreal.connect(config.url)

            console.debug(`Using SurrealDB namespace '${config.ns}' with database '${config.db}'`)
            await surreal.use({
                namespace: config.ns,
                database: config.db
            })

            await surreal.authenticate(user.value.accessToken!)
            console.debug("SurrealDB connected successfully")

        } catch (e) {
            console.error("Failed to connect to SurrealDB", e)
        }
    }

    if (import.meta.client) {
        watch(
            () => loggedIn,
            async () => {
                if (loggedIn.value === true) {
                    await connDB()
                }
            }, {immediate: true}
        )
    }

    return {
        provide: {
            surreal,
        }
    }
});
