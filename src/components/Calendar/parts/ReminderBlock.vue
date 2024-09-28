<script setup lang="ts">
const overdue = 'placeholder' //USE STORES LATER
const title = 'placeholder'
</script>

<template>
  <div class="wrapper-side bg-white/20 round-edges">
    <div class="flex top-container w-full h-1/2">
      <div class="title-overdue w-11/12">
        <div class="overdue text-smallest">{{ overdue }}</div>
        <div class="title text-medium">{{ title }}</div>
      </div>
      <div
        class="Reminder relative red-main-bg rounded-full h-12 w-12 content-center justify-center text-center p-2 text-small -top-8 -right-8"
      >
        !
      </div>
    </div>
    <div class="flex bottom-container text-center h-1/2 pt-[10px]">
      <button
        class="remind-me-later-button h-full w-1/4 purple-main-border border-4 purple-main-text round-edges mx-1"
      >
        Remind me later
      </button>
      <button
        class="details-button h-full w-1/4 purple-main-bg grey-darkest-text round-edges mx-10"
      >
        Details
      </button>
      <button class="delete-button h-full w-1/4 red-main-bg text-white/100 round-edges mx-1">
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
.wrapper-side {
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
}
</style>
