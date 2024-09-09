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
  </div>
</template>

<script lang="ts" setup>
import {type Jar, jarSchema} from "~/types/jar"
import {RecordId} from "surrealdb.js";
import {useJarService} from "~/composables/useJar";
import {useJarStore} from "~/stores/jar";

const {logout, refresh} = useOidcAuth()

const createJar = async () => {
  const jarData: Jar = {
    id: new RecordId('test', 'test'+new Date()),
    title: 'xx',
    creationDate: new Date,
    kind: 'Jar',
    owner: useNuxtApp().$surrealUserAccount.value.id,
    ownerEmail: useNuxtApp().$surrealUserAccount.value.email
  }
  const jar = jarSchema.safeParse(jarData)
  console.log(jar)


  const {createJar, getAllJars} = useJarService()

  console.log(await createJar(jarData))

  const existingJars = await getAllJars()
  console.log(existingJars)

}

const {jars} = storeToRefs(useJarStore())
const {fetchAllJars} = useJarStore()

const stuff = async () => {
  await fetchAllJars();
  console.log(jars.value[0])
}


// watch (() => useNuxtApp().$surrealConnected, (nv) => console.log(nv.value), {immediate: true})

// onBeforeMount(async () => {
//   const ns = await $surreal.query("INFO FOR NS;")
//   console.log(ns)
// })



</script>
