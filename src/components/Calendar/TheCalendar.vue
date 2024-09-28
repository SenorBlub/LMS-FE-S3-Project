<script setup lang="ts">
import ProfileBlock from './parts/ProfileBlock.vue'
import DateSelector from './parts/DateSelector.vue'
import ReminderBlock from './parts/ReminderBlock.vue'
import WeekOverview from './parts/WeekOverview.vue'
</script>

<template>
  <div class="wrapper-big flex grey-darkest-bg alpha-80 round-edges backdrop-blur-sm">
    <div class="side-bar h-full w-1/4 overflow-y-scroll overflow-x-hidden round-edges">
      <div class="item">
        <ProfileBlock />
      </div>
      <div class="item">
        <DateSelector />
      </div>
      <div class="item">
        <ReminderBlock />
      </div>
      <div class="item">
        <ReminderBlock />
      </div>
      <div class="item">
        <ReminderBlock />
      </div>
      <div class="item">
        <ReminderBlock />
      </div>
      <div class="item">
        <ReminderBlock />
      </div>
    </div>
    <div class="main-part w-3/4 h-full">
      <WeekOverview />
    </div>
  </div>
</template>

<style scoped>
.side-bar::-webkit-scrollbar {
  width: 7px;
  background-color: transparent;
}

.side-bar::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 9999px;
  max-height: 1%;
}

.item {
  padding-bottom: 20px;
}
</style>
