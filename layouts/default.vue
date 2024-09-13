<template>
  <div>
    <header class="flex flex-row justify-between items-center">
      <div>
        <h1>Jars o'Pickle</h1>
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
