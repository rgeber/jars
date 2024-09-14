<template>
  <div>
    <header class="flex flex-row justify-between items-center p-3">
      <div>

      </div>
      <div>
        <nuxt-link :to="{name:'index'}">
          <h1>Jars o'Pickle</h1>
        </nuxt-link>
      </div>
      <div>
        <div class="flex flex-row">
          <auth-button-logout />
        </div>
      </div>
    </header>
    <main>
      <slot/>
    </main>
    <footer class="fixed bottom-0 text-center"></footer>
  </div>
</template>

<script setup>

</script>
