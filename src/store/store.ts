import { defineStore } from 'pinia';
import moment from 'moment';
import { CalendarTypes } from '@/types/calendar';
import CalendarItems = CalendarTypes.CalendarItems;
import CalendarState = CalendarTypes.CalendarState;

export const useStore = defineStore('store', {
    state: (): CalendarState => ({
        currentSelectData: 0,
        currentTypeShow: 'month',
        currentYear: 0,
    }),
    getters: {
        getMountForSelectData(state) {
            return moment()
                .subtract(-state.currentSelectData, state.currentTypeShow);
        },
        getDaysForMonth(): Array<CalendarItems> {
            const daysList: Array<CalendarItems> = [];
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
