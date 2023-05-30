<template>
    <div
        class="border pb-10 pt-2 hover:bg-gray-100 cursor-pointer"
        @click="openModalWindow(calendarData)">
        <p class="mb-2">
            {{ calendarData.day }}
        </p>
        <div v-for="item in timeList" :key="item.day"
             class="bg-blue-500 my-0.5 mx-2 text-white">
            {{ item.startTime }} - {{ item.stopTime }}
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { CalendarTypes } from '@/types/calendar';
import { useStore } from '@/store/store';

const props = defineProps<{
  calendarData: CalendarTypes.CalendarItem
}>();

const store = useStore();
const openModalWindow = (calendarData: CalendarTypes.CalendarItem) => store.openModalWindow(calendarData);
const timeList = computed(() => store.calendarItemsTime.filter((item) => item.day === props.calendarData.day && item.nowMount === props.calendarData.nowMount && item.nowYear === props.calendarData.nowYear));
</script>
