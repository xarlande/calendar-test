import { defineStore } from 'pinia';
import moment from 'moment';
import { CalendarTypes } from '@/types/calendar';
import { TypeShowCalendar } from '@/enums/typeShowCalendar';

interface CalendarState {
  currentSelectData: number;
  currentTypeShow: TypeShowCalendar.TypeCalendar;
  stateModalWindow: boolean;
  calendarItemsTime: Array<CalendarTypes.CalendarTime>;
  modalData: CalendarTypes.CalendarTime | null;
  currentModalDate: string | null;
}

export const useStore = defineStore('store', {
    state: (): CalendarState => ({
        currentSelectData: 0,
        currentTypeShow: TypeShowCalendar.TypeCalendar.Month,
        stateModalWindow: false,
        calendarItemsTime: [],
        modalData: null,
        currentModalDate: null,
    }),
    getters: {
        getMountForSelectData(state): moment.Moment {
            return moment()
                .subtract(-state.currentSelectData, state.currentTypeShow);
        },
        getCurrentYear(): string | undefined {
            if (this.getMountForSelectData) {
                const [month, year] = this.getMountForSelectData.format('MMMM YYYY')
                    .split(' ');
                return year;
            }
            return undefined;
        },
        getCurrentMonth(): string | undefined {
            if (this.getMountForSelectData) {
                const [month] = this.getMountForSelectData.format('MMMM YYYY')
                    .split(' ');
                return month;
            }
            return undefined;
        },
        getDaysForMonth(): Array<CalendarTypes.CalendarItem> {
            const daysList: Array<CalendarTypes.CalendarItem> = [];
            let id = 0;
            const daysCount: number = this.getMountForSelectData.daysInMonth();
            const nowYear: number = this.getMountForSelectData.year();
            const nowMount: string = this.getMountForSelectData.format('MM');

            for (let day = 1; day <= daysCount; day += 1) {
                const copyDay = day < 10 ? `0${day}` : `${day}`;
                daysList.push({
                    id,
                    day: copyDay,
                    nowYear,
                    nowMount,
                });
                id += 1;
            }

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
            const nowMount: string = this.getBeforeMonthForSelectData.format('MM');

            for (let day = 1; day <= daysCount; day += 1) {
                const copyDay = day < 10 ? `0${day}` : `${day}`;
                daysList.push({
                    id,
                    day: copyDay,
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
        getAfterMonthForSelectData(state: CalendarState): moment.Moment {
            return moment()
                .subtract(-state.currentSelectData - 1, state.currentTypeShow);
        },
        getAfterDaysForMonth(): Array<CalendarTypes.CalendarItem> {
            const daysList: Array<CalendarTypes.CalendarItem> = [];
            let id = 61;
            const daysCount: number = this.getAfterMonthForSelectData.daysInMonth();
            const nowYear: number = this.getAfterMonthForSelectData.year();
            const nowMount: CalendarTypes.CalendarItem['nowMount'] = this.getAfterMonthForSelectData.format('MM');

            for (let day = 1; day <= daysCount; day += 1) {
                const copyDay: string = day < 10 ? `0${day}` : `${day}`;
                daysList.push({
                    id,
                    day: copyDay,
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
        getCurrentModalDate(state): CalendarState['currentModalDate'] {
            return state.currentModalDate;
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

            this.modalData = {
                day,
                nowYear,
                nowMount,
                startTime: '',
                stopTime: '',
            };

            this.currentModalDate = `${nowYear}-${nowMount}-${day}`;

            this.stateModalWindow = true;
        },
        closeModalWindow(): void {
            this.stateModalWindow = false;
            this.modalData = null;
        },
        setCalendarItemStartTime(item: CalendarTypes.CalendarTime['startTime']): void {
            if (this.modalData) {
                this.modalData.startTime = item;
            }
        },
        setCalendarItemStopTime(item: CalendarTypes.CalendarTime['stopTime']): void {
            if (this.modalData) {
                this.modalData.stopTime = item;
            }
        },
        pushCalendarItems(): void {
            if (this.modalData) {
                if (this.currentModalDate) {
                    const [year, month, day] = this.currentModalDate.split('-');
                    this.modalData.day = day;
                    this.modalData.nowMount = month;
                    this.modalData.nowYear = Number(year);
                }
                this.calendarItemsTime.push(this.modalData);
                const getNumber = (time: string) => +time.replace(/:/g, '');
                this.calendarItemsTime.sort((a, b) => getNumber(a.startTime) - getNumber(b.startTime));

                this.stateModalWindow = false;
            }
        },
        setCurrentModalDate(value: CalendarState['currentModalDate']): void {
            this.currentModalDate = value;
        },
    },
});

export default {};
