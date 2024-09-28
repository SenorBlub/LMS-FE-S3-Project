<script setup lang="ts">
import { computed, ref } from 'vue'
import { dateStore } from '../stores/DateStore'
import { storeToRefs } from 'pinia'

let DateStore = dateStore()
let {
  months,
  currentMonthIndex,
  currentYear,
  currentMonth,
  currentDay,
  getPreviousMonth,
  selectedWeek
} = storeToRefs(DateStore)

const selectedDayIndex = ref<[number, number]>()
let previousMonthLength = getPreviousMonth.value.days
let leading: number[] = []
let trailing: number[] = []

const daysOnCalendar = (selectedMonth: number, previousMonthLength: number) => {
  const leftoverDays = 35 - selectedMonth
  let leadingDays = []
  let trailingDays = []
  let monthDays = []
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

  for (let i = 0; i < selectedMonth; i++) {
    monthDays.push(i + 1)
  }

  console.log([leadingDays, monthDays, trailingDays])
  let result = leadingDays.concat(monthDays)
  result = result.concat(trailingDays)
  leading = leadingDays
  trailing = trailingDays
  return result
}

const chunkArray = (arr: number[], chunkSize: number, leadingEmptyDays: number) => {
  const result = []
  let currentWeek = []
  for (let i = 0; i < leadingEmptyDays; i += chunkSize) {
    currentWeek.push(99)
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
  return chunkArray(daysOnCalendar(currentMonth.value.days, previousMonthLength), 7, 0)
})

const handleDateClick = (weekIndex: number, dayIndex: number) => {
  if (weekIndex != 99 && dayIndex != 99) {
    let startMonth = currentMonth.value
    let endMonth = currentMonth.value
    let selectedMonthIndex = currentMonthIndex.value as number
    let startYear = currentYear.value
    let endYear = currentYear.value
    let endDay = 0
    if (
      selectedDayIndex.value &&
      selectedDayIndex.value[0] === weekIndex &&
      selectedDayIndex.value[1] === dayIndex
    ) {
      selectedDayIndex.value = [99, 99]
    } else {
      selectedDayIndex.value = [weekIndex, dayIndex]
    }
    endDay = weeks.value[weekIndex][dayIndex] + 6
    if (endDay > startMonth.days) {
      endDay -= startMonth.days
    }
    if (weekIndex === 0 && weeks.value[weekIndex][dayIndex] > 10) {
      if (currentMonthIndex.value > 0) {
        startMonth = months.value[selectedMonthIndex - 1]
      } else {
        startMonth = months.value[11]
        startYear--
      }
    } else if (weekIndex >= 3 && endDay < 15) {
      if (currentMonthIndex.value < 11) {
        endMonth = months.value[selectedMonthIndex + 1]
      } else {
        endMonth = months.value[0]
        endYear++
      }
    }
    selectedWeek.value = {
      startYear: startYear,
      endYear: endYear,
      startMonth: startMonth,
      endMonth: endMonth,
      startDay: weeks.value[weekIndex][dayIndex],
      endDay: endDay
    }
    currentDay.value = weeks.value[weekIndex][dayIndex]
    if (selectedDayIndex.value && selectedDayIndex.value[0] !== 99) {
      console.log(
        `Selected: Week ${weekIndex}, Day ${dayIndex}, Date: ${weeks.value[weekIndex][dayIndex]} - ${currentMonth.value.name} - ${currentYear.value}`
      )
      console.log(selectedWeek.value)
    }
  }
}

// HANDLEMONTHCHANGE -> CHANGING MONTH SHOULD ALLOW WEEK HIGHLIGHT TO CONTINUE TO EXIST BUT IN THE RIGHT SPOT PREFERABLY

const handlePreviousMonth = () => {
  DateStore.previousMonth()
  if (selectedDayIndex.value) handleDateClick(99, 99)
  previousMonthLength = getPreviousMonth.value.days
}

const handleNextMonth = () => {
  DateStore.nextMonth()
  if (selectedDayIndex.value) handleDateClick(99, 99)
  previousMonthLength = getPreviousMonth.value.days
}
</script>

<template>
  <div class="wrapper-side-big bg-white/20 round-edges">
    <div class="flex date-selector-container grey-lightest-text">
      <div class="date-display-container grey-lightest-text">
        <div class="date-display text-smaller py-5 text-white text-opacity-100 bold-title">
          {{ currentMonth.name }} - {{ currentYear }}
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
