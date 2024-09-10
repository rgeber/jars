import Surreal from "surrealdb.js";
import {watch, ref} from 'vue';
import {useUserService} from "~/composables/useUser";
import {type NewUser, newUserSchema, type User, userSchema} from "~/types/user";
import {authSessionUserSchema} from "~/types/auth_session_user";


const getOrCreateUserInDatabase = async (existingUser: User | null, surrealUserAccount: Ref<User | null>): Promise<void> => {
    if (existingUser !== null) {
        console.debug('Found existing user in database matching authenticated user.', existingUser)
        surrealUserAccount.value = existingUser;
    } else {
        console.debug('No existing database entry for found for authenticated user. Creating entry.')

        const {user} = useOidcAuth()
        const newUserEntry: NewUser = {
            username: user.value.providerInfo.nickname,
            email: user.value.providerInfo.email,
            creationDate: new Date(),
            name: user.value.providerInfo.name,
        }

        const newUserValidation = newUserSchema.safeParse(newUserEntry);

        if (newUserValidation.success) {
            const newUserValidation = userSchema.safeParse(await useUserService().createUser(newUserEntry))

            if (newUserValidation.success) {
                console.debug('Database entry for authenticated user created.', newUserValidation.data)
                surrealUserAccount.value = newUserValidation.data;
            }
        } else {
            console.error('Database entry creation for authenticated user failed due to validation failure.')
        }
    }
}

export default defineNuxtPlugin((nuxtApp) => {

    console.debug('Initializing SurrealDB plugin.');

    const config = useRuntimeConfig().public.surrealdb
    const {loggedIn, user} = useOidcAuth()

    const surreal: Surreal = new Surreal()
    const surrealConnected = ref<boolean>(false)
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

            const authUserValidation = authSessionUserSchema.safeParse(user.value)
            if (authUserValidation.success) {

                const username = authUserValidation.data.providerInfo.email
                const existingUser = await useUserService().getUserByUsername(username)

                await getOrCreateUserInDatabase(existingUser, surrealUserAccount)
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
                } else {
                    await surreal.invalidate()
                }
            }, {immediate: true}
        )

        // Re authenticate when the token changes
        watch(useOidcAuth().user, async (nv) => {
            console.debug('Authentication user data changed. Re-authenticating SurrealDB ...')
            await surreal.authenticate(user.value.accessToken!)
            console.debug('SurrealDB re-authenticating complete.')
        }, {
            deep: true,
        })
    }

    return {
        provide: {
            surreal,
            surrealConnected,
            surrealUserAccount,
        }
    }
});
