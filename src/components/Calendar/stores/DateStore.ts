import { defineStore } from 'pinia'

interface Month {
  name: string
  days: number
}

interface SelectedWeek {
  startYear: number
  endYear: number
  startMonth: Month
  endMonth: Month
  startDay: number
  endDay: number
}

interface WeekDay {
  name: string
  date: number
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const dateStore = defineStore('date', {
  state: () => ({
    months: [
      { name: 'January', days: 31 },
      { name: 'February', days: 28 },
      { name: 'March', days: 31 },
      { name: 'April', days: 30 },
      { name: 'May', days: 31 },
      { name: 'June', days: 30 },
      { name: 'July', days: 31 },
      { name: 'August', days: 31 },
      { name: 'September', days: 30 },
      { name: 'October', days: 31 },
      { name: 'November', days: 30 },
      { name: 'December', days: 31 }
    ] as Month[],
    currentMonthIndex: new Date().getMonth() as number,
    currentYear: new Date().getFullYear() as number,
    currentDay: new Date().getDate() as number,
    selectedWeek: {
      startYear: 0,
      endYear: 0,
      startMonth: { name: '', days: 0 },
      endMonth: { name: '', days: 0 },
      startDay: 0,
      endDay: 0
    } as SelectedWeek
  }),
  actions: {
    nextMonth() {
      if (this.currentMonthIndex === 11) {
        this.currentMonthIndex = 0
        this.currentYear++
      } else {
        this.currentMonthIndex++
      }
    },
    previousMonth() {
      if (this.currentMonthIndex === 0) {
        this.currentMonthIndex = 11
        this.currentYear--
      } else {
        this.currentMonthIndex--
      }
    }
  },
  getters: {
    currentMonth: (state) => {
      if (state.currentMonthIndex === null) {
        state.currentMonthIndex = new Date().getMonth()
      }
      if (state.currentYear === null) {
        state.currentYear = new Date().getFullYear()
      }
      if (state.currentDay === null) {
        state.currentDay = new Date().getDate()
      }
      if (
        (state.currentMonthIndex === 1 &&
          state.currentYear % 4 === 0 &&
          state.currentYear % 100 !== 0) ||
        state.currentYear % 400 === 0
      ) {
        state.months[1].days = 29
      } else {
        state.months[1].days = 28
      }
      return state.months[state.currentMonthIndex]
    },

    getPreviousMonth: (state) => {
      if (state.currentMonthIndex === null) {
        state.currentMonthIndex = new Date().getMonth()
      }
      if (state.currentYear === null) {
        state.currentYear = new Date().getFullYear()
      }
      if (state.currentDay === null) {
        state.currentDay = new Date().getDate()
      }
      let previousMonthIndex = 0
      if (state.currentMonthIndex === 0) {
        previousMonthIndex = 11
      } else {
        previousMonthIndex = state.currentMonthIndex - 1
      }
      if (
        (previousMonthIndex === 1 &&
          state.currentYear % 4 === 0 &&
          state.currentYear % 100 !== 0) ||
        state.currentYear % 400 === 0
      ) {
        state.months[1].days = 29
      } else {
        state.months[1].days = 28
      }
      return state.months[previousMonthIndex]
    },
    getWeek: (state) => {
      if (state.selectedWeek.startMonth.days !== 0) {
        const weekDays: WeekDay[] = []

        let currentYear = state.selectedWeek.startYear
        let currentMonth = state.months.findIndex(
          (month) => month.name === state.selectedWeek.startMonth.name
        )
        let currentDate = state.selectedWeek.startDay

        for (let i = 0; i < 7; i++) {
          const date = new Date(currentYear, currentMonth, currentDate)

          weekDays.push({
            name: dayNames[date.getDay()],
            date: date.getDate()
          })

          currentDate++
          if (currentDate > state.months[currentMonth].days) {
            currentDate = 1
            currentMonth = (currentMonth + 1) % 12

            if (currentMonth === 0) {
              currentYear++
            }
          }
        }
        return weekDays
      } else {
        const weekDays: WeekDay[] = []
        weekDays.push({ name: 'please select day', date: 0 })
        weekDays.push({ name: 'please select day', date: 0 })
        weekDays.push({ name: 'please select day', date: 0 })
        weekDays.push({ name: 'please select day', date: 0 })
        weekDays.push({ name: 'please select day', date: 0 })
        weekDays.push({ name: 'please select day', date: 0 })
        weekDays.push({ name: 'please select day', date: 0 })
        return
      }
    }
  }
})
