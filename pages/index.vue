<template>
  <div>
    <h1>Hello World</h1>
    <p>
      <button @click="logout('oidc')">Logout</button>
    </p>
    <p>
      <button @click="refresh()">Token Refresh</button>
    </p>
    <p>
      <button @click="createJar()">Make jar</button>
    </p>
    <p>
      <button @click="stuff()">Fetch Jars</button>
    </p>
    <p>
      <button @click="deleteJarByIndex(0)">Delete Jar [0]</button>
    </p>
  </div>
</template>

<script lang="ts" setup>
import {type NewJar, newJarSchema} from "~/types/jar"

import {useJarService} from "~/composables/useJar";
import {useJarStore} from "~/stores/jar";
import {authSessionUserSchema} from "~/types/auth_session_user";
import {userSchema} from "~/types/user";

const {logout, refresh} = useOidcAuth()

const createJar = async () => {
  const {createJar, getAllJars} = useJarService()

  const surrealUserValidation = userSchema.safeParse(useNuxtApp().$surrealUserAccount.value)

  if (!surrealUserValidation.success) {
    return console.error('Surreal user object failed validation.')
  }

  const jarData: NewJar = {
    title: 'New shit',
    creationDate: new Date,
    owner: surrealUserValidation.data.id,
    ownerEmail: surrealUserValidation.data.email
  }
  const newJarValidation = newJarSchema.safeParse(jarData)

  if (newJarValidation.success) {
      console.log(await createJar(newJarValidation.data))
  }

  const existingJars = await getAllJars()
  console.log(existingJars)
}

const {jars} = storeToRefs(useJarStore())
const {fetchAllJars, deleteJarByIndex} = useJarStore()

const stuff = async () => {
  await fetchAllJars();
  console.log(jars.value)
}


// watch (() => useNuxtApp().$surrealConnected, (nv) => console.log(nv.value), {immediate: true})

// onBeforeMount(async () => {
//   const ns = await $surreal.query("INFO FOR NS;")
//   console.log(ns)
// })

watch (useOidcAuth().user, (nv) => {
  console.log('User object changed.')
}, {
  deep: true,
})



</script>
