<template>
    <div
        :style="{height: `${heightItem}%`, left: `calc(${isLastItem&&eventsLength>1 ? `auto` : (100)/(eventsLength)*(idxCurrentItem)+4.5}%)`, width: `${widthItem}%`, zIndex: `${idxCurrentItem+1}`, right: `calc(${isLastItem ? 4.5 : 'auto'}%)`, top: `${topPosition}%`}"
        class="absolute bg-blue-400 text-white top-0 flex justify-center items-center shadow-lg rounded">
        <p v-if="currentTypeShow === TypeShowCalendar.TypeCalendar.Day || eventsLength <= 1">
            {{ startTimeFormat }} - {{ stopTimeFormat }}
        </p>
        <p v-else>
            {{ startTimeFormat }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import { CalendarTypes } from '@/types/calendar';
import { computed, defineProps } from 'vue';
import { convertTime } from '@/methods/convertTime';
import moment from 'moment';
import { TypeShowCalendar } from '@/enums/typeShowCalendar';
import { useStore } from '@/store/store';

const props = defineProps<{
  timeEvent: CalendarTypes.CalendarTime,
  eventsLength: number,
  idxCurrentItem: number
}>();

const store = useStore();
const currentTypeShow = computed(() => store.currentTypeShow);

const startTime = computed((): CalendarTypes.CalendarTime['startTime'] | null => {
    if (props.timeEvent?.startTime) {
        return props.timeEvent.startTime;
    }
    return null;
});
const stopTime = computed((): CalendarTypes.CalendarTime['stopTime'] | null => {
    if (props.timeEvent?.stopTime) {
        return props.timeEvent.stopTime;
    }
    return null;
});
const startTimeFormat = computed((): string | null => {
    if (startTime.value) {
        return convertTime(startTime.value);
    }
    return null;
});
const stopTimeFormat = computed((): string | null => {
    if (stopTime.value) {
        return convertTime(stopTime.value);
    }
    return null;
});
const minCurrentHour = computed((): number | null => {
    if (startTime.value) {
        return moment.unix(startTime.value)
            .startOf('hour')
            .unix();
    }
    return null;
});
const maxCurrentHour = computed((): number | null => {
    if (startTime.value) {
        return moment.unix(startTime.value)
            .endOf('hour')
            .unix();
    }
    return null;
});

const isLastItem = computed(() => props.eventsLength - 1 === props.idxCurrentItem);
const widthItem = computed(() => (props.eventsLength === 1 ? 91 : 91 / (props.eventsLength + 1)));

const topPosition = computed(() => {
    if (minCurrentHour.value && maxCurrentHour.value && startTime.value) {
        const startTimeLoc = moment.unix(startTime.value)
            .minutes();
        const minCurrentHourLoc = moment.unix(minCurrentHour.value)
            .minutes();
        const diffMinutes = startTimeLoc - minCurrentHourLoc;

        return `${(diffMinutes / 60) * 100}`;
    }
    return null;
});
const heightItem = computed((): number | null => {
    if (startTime.value && stopTime.value) {
        const startMoment = moment.unix(startTime.value);
        const stopMoment = moment.unix(stopTime.value);
        const diffHours = stopMoment.diff(startMoment, 'minutes');

        return ((diffHours / 60) * 102.25);
    }
    return null;
});
// const leftPosition = computed(() => {
//     if (props.eventsLength === 2) {
//         return '0%';
//     }
//     if (isLastItem.value) {
//         return 'auto';
//     }
//
//     return null;
// });
// const rigthPosition = computed(() => {
//     if (!isLastItem.value) {
//         return 'auto';
//     }
//
//     return null;
// });

</script>
