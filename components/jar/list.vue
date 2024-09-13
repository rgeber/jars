<template>
<div class="app-jar-list">
  <jar-list-item v-if="jars.length > 0" v-for="jar in jars" :key="jar.id.id" :jar="jar" />
  <jar-list-emtpy v-else/>
</div>
</template>

<script setup>
const {jars} = storeToRefs(useJarStore())
</script>
