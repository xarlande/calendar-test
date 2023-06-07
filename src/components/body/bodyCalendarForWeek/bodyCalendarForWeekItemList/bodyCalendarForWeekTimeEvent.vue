<template>
    <div class="border-b py-2 cursor-pointer relative" @click="openModal">
        <div v-if="isCurrentEvents">
            <BodyCalendarForWeekItem v-for="(item, idx) in currentEvents" :key="item.id"
                                     :events-length="currentEventsLength" :idx-current-item="idx"
                                     :time-event="item"/>
        </div>
        <p>&nbsp;</p>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import moment from 'moment/moment';
import { CalendarTypes } from '@/types/calendar';
import { useStore } from '@/store/store';
import BodyCalendarForWeekItem
    from '@/components/body/bodyCalendarForWeek/bodyCalendarForWeekItemList/bodyCalendarForWeekTimeEvent/bodyCalendarForWeekItem.vue';
import { TypeShowCalendar } from '@/enums/typeShowCalendar';

const props = defineProps<{
  timeItem: CalendarTypes.TimeItem,
  getCurrentDay: CalendarTypes.CalendarTime,
}>();

const startTimeMoment = moment(props.timeItem.time, 'HH:mm')
    .unix();
const stopTimeMoment = moment(props.timeItem.time, 'HH:mm')
    .add(1, 'hour')
    .unix();

const store = useStore();
const openModal = (): void => {
    store.openModalWindow(props.getCurrentDay.day, startTimeMoment, stopTimeMoment);
};
const currentTypeShow = computed(() => store.currentTypeShow);
const isCurrentTime = (item: number): boolean => startTimeMoment <= item && item < stopTimeMoment;

const currentEvents = computed((): Array<CalendarTypes.CalendarTime> | null => {
    if (props.getCurrentDay?.day) {
        const storeFilteredEvents = store.calendarEvents.filter((item) => {
            if (item.startTime) {
                return item.day === props.getCurrentDay.day && isCurrentTime(item.startTime);
            }
            return false;
        });

        if (currentTypeShow.value === TypeShowCalendar.TypeCalendar.Week) {
            return storeFilteredEvents.length > 3 ? storeFilteredEvents.slice(0, 3) : storeFilteredEvents;
        }
        return storeFilteredEvents;
    }
    return null;
});
const currentEventsLength = computed((): number => {
    if (currentEvents.value && currentEvents.value.length) {
        return currentEvents.value.length;
    }
    return 0;
});
const isCurrentEvents = computed((): boolean => !!currentEvents.value?.length);

</script>
