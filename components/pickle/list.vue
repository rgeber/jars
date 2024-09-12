<template>
<div>
  <ul>
    <li v-for="(pickle, arrayIndex) in usePickleStore().pickle" :key="arrayIndex">
      {{pickle.value}}
    </li>
  </ul>
</div>
</template>

<script setup lang="ts">
import type {Jar} from "~/types/jar";

const {jars} = storeToRefs(useJarStore())

const props = defineProps({
  jar: {
    type: Object as PropType<Jar>,
    required: true
  },
})

</script>
