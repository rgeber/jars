<template>
<div class="flex-col flex gap-2 justify-center items-center mt-12 px-4 select-none">
  <icon name="game-icons:mason-jar" class="text-8xl"/>
  <h1 class="text-3xl">Login to Jars</h1>

  <p class="w-full my-8">
    <button class="w-full" @click="login('oidc')">OpenID Connect Login</button>
  </p>

  <common-button-github/>
</div>
</template>

<script setup>
const {login} = useOidcAuth()
</script>
