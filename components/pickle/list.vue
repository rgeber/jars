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

const {jars} = storeToRefs(useJarStore())

defineProps({
  jar: {
    type: Object as PropType<Jar>,
    required: true
  },
})

</script>
