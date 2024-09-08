<template>
<div>
  <h1>LOGIN</h1>
  <p>
    <button @click="login('oidc')">Click to login</button>
  </p>
</div>
</template>

<script setup>
const {login} = useOidcAuth()
</script>
