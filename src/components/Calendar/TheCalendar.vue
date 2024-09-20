<script setup lang="ts">
import ProfileBlock from './parts/ProfileBlock.vue'
import DateSelector from './parts/DateSelector.vue'
</script>

<template>
  <div class="wrapper-big grey-darkest-bg alpha-80 round-edges backdrop-blur-sm">
    <div class="side-bar">
      <div class="item">
        <ProfileBlock />
      </div>
      <div class="item">
        <DateSelector />
      </div>
    </div>
  </div>
</template>

<style scoped>
.side-bar {
}

.item {
  padding-bottom: 20px;
}
</style>
