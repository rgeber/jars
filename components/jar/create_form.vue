<template>
<div>
  <input type="text" v-model="formData.title">
  <button @click="useJarService().createJarFromFormData(formData)">Create</button>
</div>
</template>

<script setup lang="ts">
import {type JarCreateForm, jarCreateFormSchema} from "~/types/jar";

const formData = ref<JarCreateForm>(jarCreateFormSchema.parse({
  title: ''
}))

</script>
