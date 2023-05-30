import { defineStore } from 'pinia';
import moment from 'moment';
import { CalendarTypes } from '@/types/calendar';
import { TypeShowCalendar } from '@/enums/typeShowCalendar';

interface CalendarState {
  currentSelectData: number;
  currentTypeShow: TypeShowCalendar.TypeCalendar;
  currentYear: number;
  currentMonth: number;
  stateModalWindow: boolean;
  calendarItemsTime: Array<CalendarTypes.CalendarTime>;
  calendarItemTime: CalendarTypes.CalendarTime | null;
}

export const useStore = defineStore('store', {
    state: (): CalendarState => ({
        currentSelectData: 0,
        currentTypeShow: TypeShowCalendar.TypeCalendar.Month,
        currentYear: 0,
        currentMonth: 0,
        stateModalWindow: false,
        calendarItemsTime: [],
        calendarItemTime: null,
    }),
    getters: {
        getMountForSelectData(state): moment.Moment {
            return moment()
                .subtract(-state.currentSelectData, state.currentTypeShow);
        },
        getDaysForMonth(): Array<CalendarTypes.CalendarItem> {
            const daysList: Array<CalendarTypes.CalendarItem> = [];
            let id = 0;
            const daysCount: number = this.getMountForSelectData.daysInMonth();
            const nowYear: number = this.getMountForSelectData.year();
            const nowMount: number = this.getMountForSelectData.month();

            for (let day = 1; day <= daysCount; day += 1) {
                daysList.push({
                    id,
                    day,
                    nowYear,
                    nowMount,
                });
                id += 1;
            }

            this.currentYear = nowYear;
            this.currentMonth = nowMount;

            return daysList;
        },
        getBeforeMonthForSelectData(state) {
            return moment()
                .subtract(-state.currentSelectData + 1, state.currentTypeShow);
        },
        getBeforeDaysForMonth(): Array<CalendarTypes.CalendarItem> {
            const daysList: Array<CalendarTypes.CalendarItem> = [];
            let id = 31;
            const daysCount: number = this.getBeforeMonthForSelectData.daysInMonth();
            const nowYear: number = this.getBeforeMonthForSelectData.year();
            const nowMount: number = this.getBeforeMonthForSelectData.month();

            for (let day = 1; day <= daysCount; day += 1) {
                daysList.push({
                    id,
                    day,
                    nowYear,
                    nowMount,
                });
                id += 1;
            }

            return this.getIndexForFirstDay === 1 || this.getIndexForFirstDay === 0 ? [] : daysList.slice(-this.getIndexForFirstDay + 1);
        },
        getIndexForFirstDay(): number {
            return this.getMountForSelectData.clone()
                .startOf('month')
                .weekday();
        },
        getAfterMonthForSelectData(state): moment.Moment {
            return moment()
                .subtract(-state.currentSelectData - 1, state.currentTypeShow);
        },
        getAfterDaysForMonth(): Array<CalendarTypes.CalendarItem> {
            const daysList = [];
            let id = 61;
            const daysCount: number = this.getAfterMonthForSelectData.daysInMonth();
            const nowYear: number = this.getAfterMonthForSelectData.year();
            const nowMount: number = this.getAfterMonthForSelectData.month();

            for (let day = 1; day <= daysCount; day += 1) {
                daysList.push({
                    id,
                    day,
                    nowYear,
                    nowMount,
                });
                id += 1;
            }

            const monthLength: number = this.getBeforeDaysForMonth.length + this.getDaysForMonth.length;

            if (monthLength > 42) {
                daysList.length = 49 - monthLength;
            } else if (monthLength > 35) {
                daysList.length = 42 - monthLength;
            } else if (monthLength > 28) {
                daysList.length = 35 - monthLength;
            }

            return daysList;
        },
    },
    actions: {
        incrementCurrentSelectData(): void {
            this.currentSelectData += 1;
        },
        decrementCurrentSelectData(): void {
            this.currentSelectData -= 1;
        },
        resetCurrentSelectData(): void {
            this.currentSelectData = 0;
        },
        setCurrentTypeShow(type: CalendarState['currentTypeShow']): void {
            this.currentTypeShow = type;
        },
        openModalWindow(item: CalendarTypes.CalendarItem): void {
            const {
                day,
                nowYear,
                nowMount,
            } = item;

            this.calendarItemTime = {
                day,
                nowYear,
                nowMount,
                startTime: '',
                stopTime: '',
            };

            this.stateModalWindow = true;
        },
        closeModalWindow(): void {
            this.stateModalWindow = false;
            this.calendarItemTime = null;
        },
        setCalendarItemStartTime(item: string): void {
            if (this.calendarItemTime) {
                this.calendarItemTime.startTime = item;
            }
        },
        setCalendarItemStopTime(item: string): void {
            if (this.calendarItemTime) {
                this.calendarItemTime.stopTime = item;
            }
        },
        pushCalendarItems(): void {
            if (this.calendarItemTime) {
                this.calendarItemsTime.push(this.calendarItemTime);
                this.stateModalWindow = false;
            }
        },
    },
});

export default {};
