<script setup lang="ts">
//imports and variable declarations here
import TheLogin from './TheLogin.vue'
import TheRegister from './TheRegister.vue'
</script>

<template>
  <div class="container grey-darkest-bg alpha-80 round-edges">
    <TheLogin />
    <TheRegister />
  </div>
</template>

<style scoped>
/* style components here, don't forget media tag for mobile or portrait mode users */
.container {
  width: 480px;
  height: 720px; /* TODO MEDIA TAG */
  padding: 10px;
}
</style>
