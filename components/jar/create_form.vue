<template>
  <div>
    <input type="text" @keydown.enter.prevent="submitForm" v-model="formData.title" @input="autoUpdateSlug"
           placeholder="Add jar ..."/>
    <input type="text" @keydown.enter.prevent="submitForm" v-model="formData.slug" @input="handleDirectSlugInput"
           placeholder="Jar slug ..."/>
    <button @click="submitForm">Create</button>
  </div>
</template>

<script setup lang="ts">
import {type JarCreateForm, jarCreateFormSchema} from "~/types/jar";

const userSlugOverride = ref<boolean>(false)

const formData = ref<JarCreateForm>(jarCreateFormSchema.parse({
  title: '',
  slug: '',
}))

const autoUpdateSlug = () => {
  if (userSlugOverride.value === true) return;
  formData.value.slug = slugify(formData.value.title)
}

const submitForm = async () => {
  try {
    await useJarService().createJarFromFormData(formData.value)
    formData.value = jarCreateFormSchema.parse({title: '', slug: ''})
  } catch (e) {
    console.error(e)
  }
}

const handleDirectSlugInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target) {
    if (target.value === '') {
      userSlugOverride.value = false
      autoUpdateSlug()
    } else {
      userSlugOverride.value = true
    }
  }
}
</script>
