<template>
<div>
  <ul>
    <li v-for="(jar, arrayIndex) in jars" :key="arrayIndex">
      {{jar.title}}
    </li>
  </ul>
</div>
</template>

<script setup lang="ts">
import type {Jar} from "~/types/jar";
import type {Pickle} from "~/types/pickle";

const {jars} = storeToRefs(useJarStore())

const pickle = ref<Pickle[]>([])

const props = defineProps({
  jar: {
    type: Object as PropType<Jar>,
    required: true
  },
})

onBeforeMount(async () => {
  await usePickleService().getPickleForJar(props.jar)
})

</script>
