<template>
  <div>
    <h1>This is your Jar: {{route.params.slug}}</h1>

    <hr>

    <pickle-create-form :jar="jar"/>
  </div>
</template>

<script setup>
const route = useRoute()
const jar = useJarStore().getJarBySlug(route.params.slug)

console.log(route.params.slug)
console.log(useJarStore().getJarBySlug(route.params.slug))

onBeforeMount(async () => {
  await useJarStore().fetchAllJars()
})

</script>
