<template>
  <div>
    <h1>Hello World</h1>
    <p>
      <button @click="logout('oidc')">Logout</button>
    </p>
  </div>
</template>

<script lang="ts" setup>
import {type Jar, jarSchema} from "~/types/jar"
import {RecordId} from "surrealdb.js";
import {type User, userSchema} from "~/types/user";

const { $surreal } = useNuxtApp();

const {logout} = useOidcAuth()

const userData: User = {
  id: new RecordId('users', 'hans'),
  email: 'email@me.tld',
  username: 'Hans',
  creationDate: new Date,
  kind: "User"
}

const user = userSchema.safeParse(userData);

if (user.success) {
  const jarData: Jar = {
    id: new RecordId('test', 'nix'),
    title: 'xx',
    creationDate: new Date,
    kind: 'Jar',
    owner: user.data.id
  }
  const jar = jarSchema.safeParse(jarData)
  console.log(jar)
}

watch (() => useNuxtApp().$surrealConnected, (nv) => console.log(nv.value), {immediate: true})

// onBeforeMount(async () => {
//   const ns = await $surreal.query("INFO FOR NS;")
//   console.log(ns)
// })



</script>
