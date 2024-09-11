<template>
<div>
  <input type="text" @keydown.enter.prevent="submitForm" v-model="formData.value" placeholder="Add pickle ...">
  <button @click="submitForm">Create</button>
</div>
</template>

<script setup lang="ts">
import {type PickleCreateForm, pickleCreateFormSchema} from "~/types/pickle";
import {type Jar} from "~/types/jar";

const props = defineProps({
  jar: {
    type: Object as PropType<Jar>,
    required: true
  }
})

const formData = ref<PickleCreateForm>(pickleCreateFormSchema.parse({
  value: '',
  jar: props.jar.id,
  type: 'text/text'
}))

const submitForm = async () => {
  await usePickleService().createPickleFromFormData(formData.value)
  formData.value = pickleCreateFormSchema.parse({title: ''})
}

</script>
