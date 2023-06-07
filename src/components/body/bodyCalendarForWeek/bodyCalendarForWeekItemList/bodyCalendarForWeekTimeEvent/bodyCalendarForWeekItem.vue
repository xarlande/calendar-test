<template>
    <div
        :style="{bottom: `${-bottomPosition}%`, left: `calc(${isLastItem ? `auto` : (100)/(eventsLength)*(idxCurrentItem)}%)`, width: `${widthItem}%`, zIndex: `${idxCurrentItem+1}`, right: `calc(${isLastItem? 0 : 'auto'}%)`, top: `${topPosition}%`}"
        class="absolute bg-blue-400 text-white top-0 flex justify-center items-center shadow-lg rounded">
        <p v-if="eventsLength <= 1">
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

const props = defineProps<{
  timeEvent: CalendarTypes.CalendarTime,
  eventsLength: number,
  idxCurrentItem: number
}>();

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

const topPosition = computed(() => {
    if (minCurrentHour.value && maxCurrentHour.value && startTime.value) {
        const res = maxCurrentHour.value - minCurrentHour.value;
        const resStartTime = startTime.value - minCurrentHour.value;

        if (resStartTime) {
            return `${(res / resStartTime) * 10}`;
        }
        return 0;
    }
    return null;
});

const bottomPosition = computed((): number | null => {
    if (startTime.value && stopTime.value) {
        if (topPosition.value) {
            return 0;
        }
        const startMoment = moment.unix(startTime.value);
        const stopMoment = moment.unix(stopTime.value);
        const diffHours = stopMoment.diff(startMoment, 'minutes');
        return (diffHours / 60 * 100) - 100;
    }
    return null;
});

const isLastItem = computed(() => props.eventsLength - 1 === props.idxCurrentItem);
const widthItem = computed(() => (props.eventsLength === 1 ? 100 : 100 / (props.eventsLength + 1)));

</script>
