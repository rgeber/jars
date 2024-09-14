<template>

  <div class="app-jar-list-empty">

    <div class="flex flex-col gap-2 justify-center items-center mt-12">
      <icon name="game-icons:mason-jar" class="text-8xl"/>
      <h3 class="text-2xl">You have no jars, yet.</h3>

      <p>Don't be jarless.</p>
      <p>Create your first jar right now :)</p>

      <div class="my-6">
        <jar-create-form/>
      </div>

      <common-button-github/>

    </div>


  </div>


</template>

<script setup>

</script>
