<template>
<icon name="material-symbols:logout-sharp" class="app-auth-button-logout cursor-pointer" @click="logout(currentProvider)" />
</template>

<script setup lang="ts">
const {logout} = useOidcAuth()
const {currentProvider} = storeToRefs(useOidcAuth())
</script>
