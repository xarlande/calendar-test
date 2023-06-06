<template>
    <div
        :style="{bottom: `${-hourDifference}%`, left: `calc(${(100-50)/(eventsLength-1)*(idxCurrentItem)}%)`, width: `${heightItems}%`, zIndex: `${idxCurrentItem}`}"
        class="absolute bg-blue-400 text-white inset-0 flex justify-center items-center">
        <p>
            {{ startTimeFormat }} - {{ stopTimeFormat }}
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

const hourDifference = computed((): number | null => {
    if (startTime.value && stopTime.value) {
        const startMoment = moment.unix(startTime.value);
        const stopMoment = moment.unix(stopTime.value);
        const diffHours = stopMoment.diff(startMoment, 'hours');
        return (diffHours * 100) - 100;
    }
    return null;
});

const heightItems = computed((): number | null => {
    if (props.eventsLength === 3) {
        return 33.33;
    }
    if (props.eventsLength === 2) {
        return 50;
    }
    if (props.eventsLength === 1) {
        return 100;
    }
    return null;
});

</script>
