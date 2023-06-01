<template>
    <div class="flex-auto border flex flex-col">
        <div class="border-b">
      &nbsp;
        </div>
        <div class="border flex-auto relative">
            <div :style="{top: positionTopTime+ '%', bottom: positionBottomTime+ '%'}"
                 class="absolute bg-blue-500 text-white flex items-center justify-center inset-x-0">
                <p>123</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { computed } from 'vue';
import moment from 'moment';

// const calendarItem: Ref<HTMLDivElement | null> = ref(null);
//
// const height: ComputedRef<number | null> = computed(() => {
//     if (calendarItem.value) {
//         return calendarItem.value.clientHeight;
//     }
//     return null;
// });

const startTime = computed(() => moment('00:30', 'HH:mm')
    .unix());
const stopTime = computed(() => moment('05:30', 'HH:mm')
    .unix());
const startTimeStamp = computed(() => moment('00:00', 'HH:mm')
    .unix());
const stopTimeStamp = computed(() => moment('23:59', 'HH:mm')
    .unix());
const differenceTimeStamp = computed(() => stopTimeStamp.value - startTimeStamp.value);
const positionTopTime = computed(() => {
    const difference = startTime.value - startTimeStamp.value;
    const totalDifference = differenceTimeStamp.value;
    const request = (difference / totalDifference) * 100;
    return Math.round(request);
});
const positionBottomTime = computed(() => {
    const difference = stopTimeStamp.value - stopTime.value;
    const totalDifference = differenceTimeStamp.value;
    const request = (difference / totalDifference) * 100;
    return Math.round(request);
});

</script>
