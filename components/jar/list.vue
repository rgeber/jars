<template>
<div>
  <ul>
    <li v-for="(jar, arrayIndex) in jars" :key="arrayIndex">
      {{jar.title}}
    </li>
  </ul>
</div>
</template>

<script setup>
const {jars} = storeToRefs(useJarStore())
</script>
