<script setup lang="ts">
import { computed, ref } from 'vue'

const selectedDayIndex = ref<[number, number] | null>(null)
const month = 'september' //reference a store for date here
const year = 2024 //reference a store for date here
const daysInMonth = [
  31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 1, 2, 3, 4
]

const chunkArray = (arr: number[], chunkSize: number, leadingEmptyDays: number) => {
  const result = []
  let currentWeek = []
  for (let i = 0; i < leadingEmptyDays; i += chunkSize) {
    currentWeek.push(null)
  }
  for (let i = 0; i < arr.length; i++) {
    currentWeek.push(arr[i])

    if (currentWeek.length === chunkSize) {
      result.push(currentWeek)
      currentWeek = []
    }
  }

  if (currentWeek.length > 0) {
    result.push(currentWeek)
  }

  return result
}

const weeks = computed(() => {
  return chunkArray(daysInMonth, 7, 0)
})

const handleDateClick = (weekIndex: number, dayIndex: number) => {
  selectedDayIndex.value = [weekIndex, dayIndex]
  console.log(
    `Selected: Week ${weekIndex}, Day ${dayIndex}, Date: ${weeks.value[weekIndex][dayIndex]}`
  )
}
</script>

<template>
  <div class="wrapper-side-big bg-white/20 round-edges">
    <div class="flex date-selector-container grey-lightest-text">
      <div class="date-display-container grey-lightest-text">
        <div class="date-display text-smaller py-5 text-white text-opacity-100 bold-title">
          {{ month }} - {{ year }}
        </div>
        <div class="filler-div"></div>
      </div>
      <div class="month-selector">
        <button class="previous-month bg-black/30 rounded-2xl text-bigger content-center"><</button>
        <button class="next-month bg-black/30 rounded-2xl text-bigger content-center">></button>
      </div>
    </div>
    <div class="flex flex-col date-container text-opacity-100">
      <!-- !TODO functional date selector code -->
      <span
        v-for="(week, weekIndex) in weeks"
        :key="weekIndex"
        class="flex justify-around w-full h-[68px]"
      >
        <span
          v-for="(day, dayIndex) in week"
          :key="dayIndex"
          @click="handleDateClick(weekIndex, dayIndex)"
          :class="{
            'purple-main-bg grey-darkest-text rounded-l-full':
              selectedDayIndex &&
              selectedDayIndex[0] === weekIndex &&
              selectedDayIndex[1] === dayIndex,
            'bg-white bg-opacity-20 text-white':
              selectedDayIndex &&
              ((selectedDayIndex[0] === weekIndex && dayIndex > selectedDayIndex[1]) ||
                (selectedDayIndex[0] === weekIndex - 1 && dayIndex < selectedDayIndex[1])),
            'rounded-r-full':
              (selectedDayIndex &&
                selectedDayIndex[0] === weekIndex - 1 &&
                dayIndex === selectedDayIndex[1] - 1) ||
              dayIndex === 6,
            'rounded-l-full': selectedDayIndex && dayIndex === 0,
            'text-opacity-20':
              weeks[weekIndex][dayIndex] &&
              weeks[weekIndex][dayIndex + 1] &&
              weeks[weekIndex][dayIndex - 1] &&
              (weeks[weekIndex][dayIndex] > weeks[weekIndex][dayIndex + 1] ||
                weeks[weekIndex][dayIndex] < weeks[weekIndex][dayIndex - 1]),
            'cursor-pointer': day !== null,
            'text-center text-white flex items-center justify-center': true
          }"
          class="px-5 h-full w-20"
        >
          {{ day }}
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.date-selector-container {
  height: 80px;
  width: 410px;
}

.date-display-container {
  width: 280px;
  height: 60px;
}

.date-display {
  width: 280px;
  height: 60px;
}

.filler-div {
  width: 280px;
  height: 20px;
}

.month-selector {
  width: 130px;
}

.previous-month {
  width: 60px;
  height: 60px;
  margin-right: 5px;
}

.next-month {
  width: 60px;
  height: 60px;
  margin-left: 5px;
}
</style>
