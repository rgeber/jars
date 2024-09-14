<template>
  <div class="flex flex-col gap-2 w-full">


    <textarea class="w-full h-[12.2rem]" @keydown.enter.prevent="submitForm" v-model="formData.value"
              placeholder="Add pickle ..."></textarea>
    <button @click="submitForm">
      Create
    </button>
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
  try {
    await usePickleService().createPickleFromFormData(formData.value)
    formData.value = pickleCreateFormSchema.parse({
      value: '',
      jar: props.jar.id,
      type: 'text/text'
    })
  } catch (e) {
    console.error(e)
  }
}

</script>
