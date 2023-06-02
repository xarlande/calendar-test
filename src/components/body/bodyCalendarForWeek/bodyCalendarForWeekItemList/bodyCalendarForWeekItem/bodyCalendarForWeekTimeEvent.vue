<template>
    <div
        :style="{top: positionTopTime+ '%', bottom: positionBottomTime+ '%', left: `calc(${(100-50)/(lengthFatherArr-1)*(idxFatherArr)}%)`}"
        class="absolute bg-blue-500 border text-white flex items-center justify-center inset-x-0">
        <p>{{ startTimeFormat }} - {{ stopTimeFormat }}</p>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import moment from 'moment/moment';
import { CalendarTypes } from '@/types/calendar';
import { convertTime } from '@/methods/convertTime';

const props = defineProps<{
  timeEvent: CalendarTypes.CalendarTime,
  lengthFatherArr: number,
  idxFatherArr: number
}>();

const startTime = computed(() => {
    if (props.timeEvent?.startTime) {
        return props.timeEvent.startTime;
    }
    return null;
});
const stopTime = computed(() => {
    if (props.timeEvent?.stopTime) {
        return props.timeEvent.stopTime;
    }
    return null;
});
const startTimeFormat = computed(() => {
    if (startTime.value) {
        return convertTime(startTime.value);
    }
    return null;
});
const stopTimeFormat = computed(() => {
    if (stopTime.value) {
        return convertTime(stopTime.value);
    }
    return null;
});
const startTimeStamp = computed(() => moment('00:00', 'HH:mm')
    .unix());
const stopTimeStamp = computed(() => moment('23:59', 'HH:mm')
    .unix());
const differenceTimeStamp = computed(() => stopTimeStamp.value - startTimeStamp.value);
const positionTopTime = computed(() => {
    if (startTime.value) {
        const difference = startTime.value - startTimeStamp.value;
        const totalDifference = differenceTimeStamp.value;
        const request = (difference / totalDifference) * 100;
        return request.toFixed(4);
    }
    return null;
});
const positionBottomTime = computed(() => {
    if (stopTime.value) {
        const difference = stopTimeStamp.value - stopTime.value;
        const totalDifference = differenceTimeStamp.value;
        const request = (difference / totalDifference) * 100;
        return request.toFixed(4);
    }
    return null;
});
</script>

<style scoped>

</style>
