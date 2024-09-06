<template>
<div>Hello World</div>
</template>

<script lang="ts" setup>
import {type Jar} from "~/types/jar"
const jar:Jar = {
  id: 'xx',
  title: 'Aha!',
  creation_date: new Date
}

console.log(jar)
</script>
