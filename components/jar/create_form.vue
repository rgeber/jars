<template>
  <div class="flex flex-col gap-2 w-full">
    <input class="w-full" type="text" @keydown.enter.prevent="submitForm" v-model="formData.title" @input="autoUpdateSlug"
           placeholder="Add jar ..."/>
    <input class="w-full" type="text" @keydown.enter.prevent="submitForm" v-model="formData.slug" @input="handleDirectSlugInput"
           placeholder="Jar slug ..."/>
    <button class="w-full" @click="submitForm">Create</button>
  </div>
</template>

<script setup lang="ts">
import {type JarCreateForm, jarCreateFormSchema} from "~/types/jar";

const userSlugOverride = ref<boolean>(false)

const emit = defineEmits(['submitted'])

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
    emit('submitted')
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
      formData.value.slug = slugify(target.value)
      userSlugOverride.value = true
    }
  }
}
</script>
