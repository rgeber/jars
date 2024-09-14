<template>
  <div>
    <ui-section-header>Add pickle to {{ jar.title }}</ui-section-header>
    <pickle-create-form v-if="jar" :jar="jar" class="p-2"/>
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
