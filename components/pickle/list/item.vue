<template>
<div class="app-list-item app-pickle-list-item flex flex-row justify-between items-center cursor-pointer" @click="handleClick">
  <div class="flex-row flex items-center gap-2">
    <icon class="app-list-item-icon-type app-pickle-list-item-icon-jar" name="file-icons:pickle" />
    {{pickle.value}}
  </div>
  <div class="flex items-center">
    <common-button-delete @exec-delete="usePickleService().deletePickle(pickle.id)"/>
  </div>
</div>
</template>

<script setup lang="ts">
import type {Pickle} from "~/types/pickle";


const props = defineProps({
  pickle: {
    type: Object as PropType<Pickle>,
    required: true
  }
})

const handleClick = (event: Event) => {
  // useRouter().push({
  //   name: 'jar-slug',
  //   params: {
  //     slug: props.jar.slug
  //   }
  // })
}


</script>
