<template>
<div>Hello World</div>
</template>

<script lang="ts" setup>
import {type Jar} from "~/types/jar"
import {RecordId} from "surrealdb.js";
const jar:Jar = {
  id: new RecordId('test', 'myid'),
  title: 'Aha!',
  creation_date: new Date
}

console.log(jar)
</script>
