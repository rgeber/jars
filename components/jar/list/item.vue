<template>
<div class="app-list-item  app-jar-list-item flex flex-row justify-between items-center cursor-pointer" @click="handleClick">
  <div class="flex-row flex items-center gap-2">
    <icon class="app-list-item-icon-type app-jar-list-item-icon-jar" name="game-icons:mason-jar" />
    {{jar.title}}
  </div>
  <div class="flex items-center">
    <common-button-delete @exec-delete="useJarService().deleteJar(jar.id)"/>
  </div>
</div>
</template>

<script setup lang="ts">
import type {Jar} from "~/types/jar";


const props = defineProps({
  jar: {
    type: Object as PropType<Jar>,
    required: true
  }
})

const handleClick = (event: Event) => {
  useRouter().push({
    name: 'jar-slug',
    params: {
      slug: props.jar.slug
    }
  })
}


</script>
