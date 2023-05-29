import { defineStore } from 'pinia';
import moment from 'moment';
import { CalendarTypes } from '@/types/calendar';
import { TypeShowCalendar } from '@/enums/typeShowCalendar';

interface CalendarState {
  currentSelectData: number;
  currentTypeShow: TypeShowCalendar.TypeCalendar;
  currentYear: number;
}

export const useStore = defineStore('store', {
    state: (): CalendarState => ({
        currentSelectData: 0,
        currentTypeShow: TypeShowCalendar.TypeCalendar.Month,
        currentYear: 0,
    }),
    getters: {
        getMountForSelectData(state): moment.Moment {
            return moment()
                .subtract(-state.currentSelectData, state.currentTypeShow);
        },
        getDaysForMonth(): Array<CalendarTypes.CalendarItems> {
            const daysList: Array<CalendarTypes.CalendarItems> = [];
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
            this.currentYear = daysList[0].nowYear;
            for (let indexDay = 1; indexDay < this.getIndexForFirstDay; indexDay += 1) {
                daysList.unshift({
                    id,
                    day: 0,
                    nowYear,
                    nowMount,
                });
                id += 1;
            }

            return daysList;
        },
        getIndexForFirstDay(): number {
            return this.getMountForSelectData.clone()
                .startOf('month')
                .weekday();
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
    },
});

export default {};
