import { DateTime } from "luxon"

export default defineNuxtPlugin((nuxtApp) => {

  const rt_config = useRuntimeConfig()
  const {loggedIn, user} = useOidcAuth()
  let refreshInProgress = false;

  setInterval(async () => {

    if (refreshInProgress) return;

    // Only relevant if a user session is active
    if (!loggedIn) return;

    // If the refresh token cannot be refreshed just warn. Might be a faulty config.
    if (!user.value.canRefresh) return console.warn('Access token may not be refreshed.')

    const now = Math.floor(DateTime.utc().toSeconds())

    if (user.value.expireAt <= now + rt_config.public.auth.tokenRefreshThreshold) {
      console.debug('Auth token expired or about to expire. Refreshing ...')
      refreshInProgress = true
      await useOidcAuth().refresh()
      refreshInProgress = false
      console.debug('Auth token refreshed.')
    }

  }, rt_config.public.auth.tokenRefreshInterval * 1000);
});
