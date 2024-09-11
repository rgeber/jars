<template>
<div>
  <input type="text" @keydown.enter.prevent="submitForm" v-model="formData.title">
  <button @click="submitForm">Create</button>
</div>
</template>

<script setup lang="ts">
import {type JarCreateForm, jarCreateFormSchema} from "~/types/jar";

const formData = ref<JarCreateForm>(jarCreateFormSchema.parse({
  title: ''
}))

const submitForm = async () => {
  await useJarService().createJarFromFormData(formData.value)
  formData.value = jarCreateFormSchema.parse({title: ''})
}

</script>
