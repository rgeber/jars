<template>
  <div v-show="!considerDelete && !deleteProgress" class="flex items-center">
    <icon class="app-list-item-icon-delete" name="fa6-solid:trash-can"
          @click.prevent.stop="considerDelete = true; emit('considerDelete')"/>
  </div>
  <div v-show="considerDelete && !deleteProgress" class="flex items-center">
    <div class="rounded-l-full bg-rose-600 flex items-center py-2 pl-4 pr-3 text-white">
      <icon name="fa6-solid:trash-can" class="animate-pulse"/>
    </div>
    <div class="bg-emerald-600 flex items-center py-2 px-3 text-white"
         @click.prevent.stop="considerDelete = false; deleteProgress=true; emit('execDelete')">
      <icon name="fa6-solid:check" class=""/>
    </div>
    <div class="bg-gray-600 flex items-center py-2 px-3 text-white rounded-r-full pr-4"
         @click.prevent.stop="considerDelete = false; emit('cancelDelete')">
      <icon name="fa6-solid:xmark" class=""/>
    </div>
  </div>
  <div v-if="deleteProgress" class="flex items-center">
    <icon name="fa6-solid:spinner" class="animate-spin"/>
  </div>
</template>

<script setup lang="ts">
const considerDelete = ref<boolean>(false)
const deleteProgress = ref<boolean>(false)

const emit = defineEmits([
  'considerDelete',
  'cancelDelete',
  'execDelete',
])
</script>
