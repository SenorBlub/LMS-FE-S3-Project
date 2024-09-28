<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { dateStore } from '../stores/DateStore'
import { storeToRefs } from 'pinia'

const DateStore = dateStore()
const { getWeek } = storeToRefs(DateStore)

const todayString = 'today' //placeholder
const weekString = 'this week' //placeholder

const containerHeight = 742

const calculateTimePosition = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const totalMinutes = hours * 60 + minutes
  const position = (totalMinutes / 1440) * containerHeight
  return `${position}px`
}

const timePosition = ref(calculateTimePosition())

const updateInterval = 60000 // 60 seconds

onMounted(() => {
  const interval = setInterval(() => {
    timePosition.value = calculateTimePosition()
  }, updateInterval)

  onUnmounted(() => clearInterval(interval))
})

const timescaleLines = computed(() => {
  const times = [3, 6, 9, 12, 15, 18, 21, 0] // 3-hour intervals
  return times.map((hour) => {
    const totalMinutes = hour * 60
    if (hour < 10) {
      return {
        label: `0${hour}:00`,
        position: `${(totalMinutes / 1440) * containerHeight}px`
      }
    } else {
      return {
        label: `${hour}:00`,
        position: `${(totalMinutes / 1440) * containerHeight}px`
      }
    }
  })
})
</script>
<template>
  <div class="wrapper-week-overview grey-lightest-bg w-full h-full round-edges">
    <div class="container-top w-full rounded-t-[35px] h-1/4 grey-lightest-bg shadow-2xl">
      <div class="flex upper-half-container-top">
        <div class="title font-semibold text-biggest grey-darkest-text pt-8 pl-12">
          {{ weekString }}
        </div>
        <div class="flex absolute day-selector right-10 top-8">
          <div
            class="previous-day text-white/100 grey-darkest-bg alpha-80 w-[65px] h-[65px] content-center text-center text-biggest rounded-2xl"
          >
            ⮜
          </div>
          <div class="current-day grey-darkest-text text-biggest mx-5 content-center">
            {{ todayString }}
          </div>
          <div
            class="next-day text-white/100 grey-darkest-bg alpha-80 w-[65px] h-[65px] content-center text-center text-biggest rounded-2xl"
          >
            ⮞
          </div>
        </div>
      </div>
      <div class="lower-half-container-top flex">
        <div
          v-for="(day, index) in getWeek"
          :key="index"
          :class="{
            'week-day w-[160px] h-[140px] m-[15px] mx-[20px] p-2 text-center grey-darkest-bg shadow-lg round-edges': true,
            'bg-black text-white': index === 0,
            'grey-light-bg grey-darkest-text': index !== 0
          }"
        >
          <div class="text-big">{{ day.name }}</div>
          <div class="text-biggerest font-bold">{{ day.date }}</div>
        </div>
      </div>
    </div>
    <!-- !VIA API USE DATA OBJECT THAT STORES PLANS FOR THE DAY TO GENERATE THE DIV WITH PROPER CONTENT -->
    <!-- !VERY IMPORTANT WE DO THIS *AFTER* MAKING API AND DATABASES SINCE DATA STRUCTURE DESIGN SHOULDN'T BE HANDLED THROUGH FRONT-END IDEALLY -->
    <div class="container-bottom h-[70%] my-5 relative">
      <div
        class="day-column relative z-0 grey-light-bg h-[100%] w-[160px] m-[15px] p-[5px] round-edges"
      >
        <div class="plan-content relative w-[100%] my-[5px] h-[10%] green-main-bg round-edges">
          content
        </div>
        <div class="plan-content relative w-[100%] my-[5px] h-[10%] orange-main-bg round-edges">
          content
        </div>
        <div class="plan-content relative w-[100%] my-[5px] h-[10%] red-main-bg round-edges">
          content
        </div>
        <div class="plan-content relative w-[100%] my-[5px] h-[10%] purple-main-bg round-edges">
          content
        </div>
      </div>
      <!-- Grey lines for time scale -->
      <div
        v-for="(line, index) in timescaleLines"
        :key="index"
        :style="{ top: line.position }"
        class="timescale-line flex absolute z-10 w-full"
      >
        <div
          class="relative bottom-[0px] w-[2%] ml-2 mr-3 text-smaller text-center content-center grey-dark-text"
        >
          {{ line.label }}
        </div>
        <div
          class="relative top-[10px] w-[98%] h-[1px] mx-[2%] border border-dashed grey-medium-border"
        ></div>
      </div>
      <!-- Purple moving "now" line -->
      <div :style="{ top: timePosition }" class="line-container z-20 w-full absolute flex">
        <div
          class="now-text relative bottom-[7px] w-[4%] h-[1px] purple-main-text text-small text-center content-center"
        >
          now
        </div>
        <div
          class="now-line relative top-[10px] w-[98%] h-[1px] mx-[1%] border border-dashed purple-main-border"
        ></div>
      </div>
    </div>
  </div>
</template>
<script scoped></script>
