import { defineStore } from 'pinia';
import moment from 'moment';
import { CalendarTypes } from '@/types/calendar';
import { TypeShowCalendar } from '@/enums/typeShowCalendar';

interface State {
  currentDay: number;
  currentTypeShow: TypeShowCalendar.TypeCalendar;
  isModalWindowOpened: boolean;
  calendarEvents: Array<CalendarTypes.CalendarItem>;
  modalData: CalendarTypes.CalendarItem | null;
}

export const useStore = defineStore('store', {
    state: (): State => ({
        currentDay: 0,
        currentTypeShow: TypeShowCalendar.TypeCalendar.Month,
        isModalWindowOpened: false,
        calendarEvents: [],
        modalData: null,
    }),
    getters: {
        getCurrentTime(state): moment.Moment {
            return moment()
                .subtract(-state.currentDay, 'day');
        },
        getCurrentTimeFormat(): string {
            return this.getCurrentTime.clone()
                .format('YYYY-MM-DD');
        },
        getDaysInCurrentMonth(): number {
            return this.getCurrentTime.clone()
                .daysInMonth();
        },
        getIndexForFirstDay(): number {
            return this.getCurrentTime.clone()
                .startOf('month')
                .weekday();
        },
        getCurrentYear(): string | undefined {
            if (this.getCurrentTime) {
                return this.getCurrentTime.format('YYYY');
            }
            return undefined;
        },
        getCurrentMonth(): string | undefined {
            if (this.getCurrentTime) {
                return this.getCurrentTime.format('MMMM');
            }
            return undefined;
        },
        getDaysForMonth(): Array<CalendarTypes.CalendarItem> {
            const daysList: Array<CalendarTypes.CalendarItem> = [];
            let id = 0;
            const daysInMonth: number = this.getCurrentTime.daysInMonth();

            for (let day = 1; day <= daysInMonth; day += 1) {
                const currentDay = this.getCurrentTime.date(day);
                daysList.push({
                    id,
                    day: currentDay.format('YYYY-MM-DD'),
                    currentMonth: true,
                });
                id += 1;
            }
            return daysList;
        },
        getBeforeDaysForMonth(): Array<CalendarTypes.CalendarItem> {
            const daysList: Array<CalendarTypes.CalendarItem> = [];
            let id = 31;
            const beforeMonthDate: moment.Moment = this.getCurrentTime.clone()
                .subtract(1, 'month');
            const beforeDaysInMonth: number = beforeMonthDate.daysInMonth();

            for (let day = 1; day <= beforeDaysInMonth; day += 1) {
                const currentDay = beforeMonthDate.date(day);
                daysList.push({
                    id,
                    day: currentDay.format('YYYY-MM-DD'),
                    currentMonth: false,
                });
                id += 1;
            }

            if (this.getIndexForFirstDay === 0) {
                return daysList.slice(-6);
            }
            return this.getIndexForFirstDay === 1 ? [] : daysList.slice(-this.getIndexForFirstDay + 1);
        },
        getAfterDaysForMonth(): Array<CalendarTypes.CalendarItem> {
            const daysList: Array<CalendarTypes.CalendarItem> = [];
            let id = 62;
            const afterMonthDate: moment.Moment = this.getCurrentTime.clone()
                .subtract(-1, 'month');
            const afterDaysInMonth: number = afterMonthDate.daysInMonth();

            for (let day = 1; day <= afterDaysInMonth; day += 1) {
                const currentDay = afterMonthDate.date(day);
                daysList.push({
                    id,
                    day: currentDay.format('YYYY-MM-DD'),
                    currentMonth: false,
                });
                id += 1;
            }

            const monthLength: number = this.getBeforeDaysForMonth.length + this.getDaysForMonth.length;

            if (monthLength > 35) {
                daysList.length = 42 - monthLength;
            } else if (monthLength > 28) {
                daysList.length = 35 - monthLength;
            } else if (monthLength === 28) {
                daysList.length = 28 - monthLength;
            }

            return daysList;
        },
        getModalDateDay(state): CalendarTypes.CalendarItem['day'] | undefined {
            if (state.modalData) {
                return state.modalData.day;
            }
            return undefined;
        },
        getModalDateStartTime(state): string | undefined {
            if (state.modalData && state.modalData.startTime) {
                return moment.unix(state.modalData.startTime)
                    .format('HH:mm');
            }
            return undefined;
        },
        getModalDateStopTime(state): string | undefined {
            if (state.modalData && state.modalData.stopTime) {
                return moment.unix(state.modalData.stopTime)
                    .format('HH:mm');
            }
            return undefined;
        },
    },
    actions: {
        incrementCurrentSelectData(): void {
            let days: number;
            if (this.currentTypeShow === 'month') {
                days = this.getCurrentTime.clone()
                    .subtract(-1, 'month')
                    .daysInMonth();
            } else if (this.currentTypeShow === 'week') {
                days = 7;
            } else {
                days = 1;
            }
            this.currentDay += days;
        },
        decrementCurrentSelectData(): void {
            let days: number;
            if (this.currentTypeShow === 'month') {
                days = this.getDaysInCurrentMonth;
            } else if (this.currentTypeShow === 'week') {
                days = 7;
            } else {
                days = 1;
            }
            this.currentDay -= days;
        },
        resetCurrentSelectData(): void {
            this.currentDay = 0;
        },
        setCurrentTypeShow(type: State['currentTypeShow']): void {
            this.currentTypeShow = type;
        },
        openModalWindow(day: CalendarTypes.CalendarItem['day']): void {
            this.modalData = {
                day,
                startTime: null,
                stopTime: null,
            };

            this.isModalWindowOpened = true;
        },
        closeModalWindow(): void {
            this.isModalWindowOpened = false;
            this.modalData = null;
        },
        setModalDateStartTime(item: string | undefined): void {
            if (this.modalData && item) {
                this.modalData.startTime = moment(item, 'HH:mm')
                    .unix();
            }
        },
        setModalDateStopTime(item: string | undefined): void {
            if (this.modalData && item) {
                this.modalData.stopTime = moment(item, 'HH:mm')
                    .unix();
            }
        },
        pushCalendarItems(): void {
            if (this.modalData) {
                this.calendarEvents.push(this.modalData);

                this.calendarEvents.sort((a, b) => (a.startTime && b.startTime ? a.startTime - b.startTime : 1 - 1));

                this.isModalWindowOpened = false;
            }
        },
        setModalDateDay(value: CalendarTypes.CalendarItem['day'] | undefined): void {
            if (this.modalData && value) {
                this.modalData.day = value;
            }
        },
    },
});

export default {};
