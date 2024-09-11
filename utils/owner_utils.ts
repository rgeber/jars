import type {User} from "~/types/user";
import {userSchema} from "~/types/user";

export const getValidatedOwner = (): User|null => {
    const ownerValidation = userSchema.safeParse(useNuxtApp().$surrealUserAccount.value)
        if (!ownerValidation.success) {
            console.error('Unable to validate SurrealDB user object.', useNuxtApp().$surrealUserAccount.value)
            return null
        }

        return ownerValidation.data
}