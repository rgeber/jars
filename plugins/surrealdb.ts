import Surreal from "surrealdb.js";
import {watch, ref} from 'vue';
import {useUserService} from "~/composables/useUser";
import {type NewUser, newUserSchema, type User, userSchema} from "~/types/user";

export default defineNuxtPlugin((nuxtApp) => {

    console.debug('Initializing SurrealDB plugin.');

    const config = useRuntimeConfig().public.surrealdb
    const {loggedIn, user} = useOidcAuth()

    const surreal = new Surreal()
    const surrealConnected = ref(false)
    const surrealUserAccount = ref<User | null>(null)

    const connectSurreal = async () => {
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
            surrealConnected.value = true

            const {getUserByUsername, createUser} = useUserService()
            const existingUser: User | null = await getUserByUsername('email@romangeber.com')

            if (existingUser !== null) {
                console.debug('Found existing user in database matching authenticated user.', existingUser)
                surrealUserAccount.value = existingUser;
            } else {
                console.debug('No existing database entry for found for authenticated user. Creating entry.')

                const newUserEntry: NewUser = {
                    username: user.value.providerInfo.nickname,
                    email: user.value.providerInfo.email,
                    creationDate: new Date(),
                    name: user.value.providerInfo.name,
                }

                const newUserValidation = newUserSchema.safeParse(newUserEntry);

                if (newUserValidation.success) {
                    const newUserValidation = userSchema.safeParse(await createUser(newUserEntry))

                    if (newUserValidation.success) {
                        console.debug('Database entry for authenticated user created.', newUserValidation.data)
                        surrealUserAccount.value = newUserValidation.data;
                    }                } else {
                    console.error('Database entry creation for authenticated user failed due to validation failure.')
                }
            }

        } catch (e) {
            console.error("Failed to connect to SurrealDB", e)
        }
    }

    if (import.meta.client) {
        watch(
            () => loggedIn,
            async () => {
                if (loggedIn.value === true) {
                    await connectSurreal()
                }
            }, {immediate: true}
        )
    }

    return {
        provide: {
            surreal,
            surrealConnected,
            surrealUserAccount,
        }
    }
});
