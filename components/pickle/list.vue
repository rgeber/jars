<template>
<div class="app-list">
  <pickle-list-item v-for="pickle in usePickleStore().pickle" :key="pickle.id.id" :pickle="pickle" />
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
