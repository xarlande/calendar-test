<template>
    <div
        :style="{height: `${heightItem}%`, left: `${leftPosition}%`, width: `${widthItem}%`, zIndex: `${idxCurrentItem+1}`, top: `${topPosition}%`}"
        class="absolute bg-blue-400 text-white flex justify-center items-center shadowBox shadow-black rounded">
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

const widthItem = computed(() => (props.eventsLength === 1 ? 100 : 100 / (props.eventsLength + 1)));
const leftPosition = computed(() => {
    const aditionalSpace = widthItem.value / (props.eventsLength - 1);

    return (widthItem.value + aditionalSpace) * props.idxCurrentItem;
});
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

</script>
<style lang="css" scoped>
.shadowBox {
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.75);
}
</style>
