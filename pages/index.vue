<template>
  <div>
    <div v-show="showCreateJarForm">
      <ui-section-header>
        <icon name="fa6-solid:plus" class="text-xl"/>
        Add new jar
      </ui-section-header>
      <jar-create-form @submitted="showCreateJarForm = false" class="p-3 "/>
    </div>

    <jar-list/>

    <jar-button-add v-show="useJarStore().jars.length > 0" class="fixed right-5 bottom-5"
                    @click="showCreateJarForm = true"/>
  </div>
</template>

<script lang="ts" setup>
import {useJarStore} from "~/stores/jar";

const showCreateJarForm = ref<boolean>(false)

watch(() => useNuxtApp().$surrealConnected, async (nv) => {
  await useJarStore().startLiveQuery()
}, {immediate: true})

onBeforeMount(async () => {
  await useJarStore().fetchAllJars()
})
</script>
