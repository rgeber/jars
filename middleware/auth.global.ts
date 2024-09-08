export default defineNuxtRouteMiddleware((to, from) => {
    const {loggedIn, user} = useOidcAuth()
    if (loggedIn.value === false || typeof  user.value === "undefined" || typeof user.value.accessToken === "undefined") {
        if (to.path.startsWith('/login')) return;

        console.debug('No Authentication found. Redirecting to Login page.')
        return navigateTo('/login')
    }
})
