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
        getSelectedTime(state): moment.Moment {
            return moment()
                .subtract(-state.currentDay, 'day');
        },
        getDaysInSelectedMonth(): number {
            return this.getSelectedTime.clone()
                .daysInMonth();
        },
        getIndexForFirstDay(): number {
            return this.getSelectedTime.clone()
                .startOf('month')
                .weekday();
        },
        getCurrentYear(): string | null {
            if (this.getSelectedTime) {
                return this.getSelectedTime.format('YYYY');
            }
            return null;
        },
        getCurrentMonth(): string | null {
            if (this.getSelectedTime) {
                return this.getSelectedTime.format('MMMM');
            }
            return null;
        },
        getDaysForMonth(): Array<CalendarTypes.CalendarTime> {
            const daysList: Array<CalendarTypes.CalendarTime> = [];
            let id = 0;
            const daysInMonth: number = this.getSelectedTime.daysInMonth();

            for (let day = 1; day <= daysInMonth; day += 1) {
                const currentDay = this.getSelectedTime.date(day);
                daysList.push({
                    id,
                    day: currentDay.format('YYYY-MM-DD'),
                    currentMonth: true,
                });
                id += 1;
            }
            return daysList;
        },
        getBeforeDaysForMonth(): Array<CalendarTypes.CalendarTime> {
            const daysList: Array<CalendarTypes.CalendarTime> = [];
            let id = 31;
            const beforeMonthDate: moment.Moment = this.getSelectedTime.clone()
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
        getAfterDaysForMonth(): Array<CalendarTypes.CalendarTime> {
            const daysList: Array<CalendarTypes.CalendarTime> = [];
            let id = 62;
            const afterMonthDate: moment.Moment = this.getSelectedTime.clone()
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
        getModalDateDay(state): CalendarTypes.CalendarItem['day'] | null {
            if (state.modalData) {
                return state.modalData.day;
            }
            return null;
        },
        getModalDateStartTime(state): string | null {
            if (state.modalData && state.modalData.startTime) {
                return moment.unix(state.modalData.startTime)
                    .format('HH:mm');
            }
            return null;
        },
        getModalDateStopTime(state): string | null {
            if (state.modalData && state.modalData.stopTime) {
                return moment.unix(state.modalData.stopTime)
                    .format('HH:mm');
            }
            return null;
        },
    },
    actions: {
        incrementCurrentSelectData(): void {
            let days: number;
            if (this.currentTypeShow === 'month') {
                days = this.getSelectedTime.clone()
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
                days = this.getDaysInSelectedMonth;
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
            };

            this.isModalWindowOpened = true;
        },
        closeModalWindow(): void {
            this.isModalWindowOpened = false;
            this.modalData = null;
        },
        setModalDateStartTime(item: string | null): void {
            if (this.modalData && item) {
                this.modalData.startTime = moment(item, 'HH:mm')
                    .unix();
            }
        },
        setModalDateStopTime(item: string | null): void {
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
        setModalDateDay(value: CalendarTypes.CalendarItem['day'] | null): void {
            if (this.modalData && !!value) {
                this.modalData.day = value;
            }
        },
    },
});

export default {};
