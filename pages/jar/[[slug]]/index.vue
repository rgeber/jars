<template>
  <div>
    <h1>This is your Jar: {{route.params.slug}}</h1>
    <hr>
    <pickle-create-form v-if="jar" :jar="jar"/>
    <hr>
    <pickle-list v-if="jar" :jar="jar"/>
  </div>
</template>

<script setup lang="ts">
import type {Jar} from "~/types/jar";

const route = useRoute()
const jar = ref<Jar|null>(null)

onBeforeMount(async () => {
  await useJarStore().fetchAllJars()

  if (route.params.slug && typeof route.params.slug === 'string') {
    jar.value = useJarStore().getJarBySlug(route.params.slug)
    await usePickleStore().fetchForJar(jar.value!)
    await usePickleStore().startLiveQuery()
  }
})

</script>
