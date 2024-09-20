<script setup lang="ts">
import { computed, ref } from 'vue'

const selectedDayIndex = ref<[number, number] | null>(null)
const month = 'september' //reference a store for date here
const year = 2024 //reference a store for date here
const daysInMonth = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30
]
const previousMonthLength = 31
let leading: number[] = []
let trailing: number[] = []

const daysOnCalendar = (selectedMonth: number[], previousMonthLength: number) => {
  const leftoverDays = 35 - selectedMonth.length
  let leadingDays = []
  let trailingDays = []
  if (leftoverDays % 2 !== 1) {
    for (let i = 0; i < leftoverDays / 2; i++) {
      leadingDays.push(previousMonthLength - i)
      trailingDays.push(i + 1)
    }
  } else {
    for (let i = 0; i < (leftoverDays - 1) / 2; i++) {
      leadingDays.push(previousMonthLength - i)
    }
    for (let i = 0; i < (leftoverDays + 1) / 2; i++) {
      trailingDays.push(i + 1)
    }
  }
  leadingDays.reverse()

  console.log([leadingDays, selectedMonth, trailingDays])
  let result = leadingDays.concat(selectedMonth)
  result = result.concat(trailingDays)
  leading = leadingDays
  trailing = trailingDays
  return result
}

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
  return chunkArray(daysOnCalendar(daysInMonth, previousMonthLength), 7, 0)
})

const handleDateClick = (weekIndex: number, dayIndex: number) => {
  if (
    selectedDayIndex.value &&
    selectedDayIndex.value[0] === weekIndex &&
    selectedDayIndex.value[1] === dayIndex
  ) {
    selectedDayIndex.value = null
  } else {
    selectedDayIndex.value = [weekIndex, dayIndex]
  }
  console.log(
    `Selected: Week ${weekIndex}, Day ${dayIndex}, Date: ${weeks.value[weekIndex][dayIndex]}`
  )
}

const handlePreviousMonth = () => {}

const handleNextMonth = () => {}
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
        <button
          @click="handlePreviousMonth()"
          class="previous-month bg-black/30 rounded-2xl text-bigger content-center"
        >
          ⮜
        </button>
        <button
          @click="handleNextMonth()"
          class="next-month bg-black/30 rounded-2xl text-bigger content-center"
        >
          ⮞
        </button>
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
              ((weekIndex < 1 && weeks[weekIndex][dayIndex] > 10) ||
                (weekIndex > 3 && weeks[weekIndex][dayIndex] <= trailing[trailing.length - 1])) &&
              (leading.includes(weeks[weekIndex][dayIndex]) ||
                trailing.includes(weeks[weekIndex][dayIndex])),
            'cursor-pointer': day !== null,
            'text-center text-white flex items-center justify-center': true
          }"
          class="px-5 h-full select-none w-20"
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
