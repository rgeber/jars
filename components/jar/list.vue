<template>
<div>
  <ul>
    <li v-for="(jar, arrayIndex) in jars" :key="arrayIndex">
      <nuxt-link class="" :to="{name: 'jar-slug', params: { slug: jar.slug }}">{{jar.title}}</nuxt-link>
    </li>
  </ul>
</div>
</template>

<script setup>

const {jars} = storeToRefs(useJarStore())

</script>
