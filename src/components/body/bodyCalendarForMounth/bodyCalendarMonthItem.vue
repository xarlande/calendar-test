<template>
    <div
        v-if="calendarData.currentMonth"
        class="border pb-10 pt-2 hover:bg-gray-100 cursor-pointer"
        @click="openModalWindow()">
        <p class="mb-2">
            {{ calendarDataDay }}
        </p>
        <div v-for="item in timeList" :key="item.day"
             class="bg-blue-500 my-0.5 mx-2 text-white">
            {{ convertTime(item.startTime) }} - {{ convertTime(item.stopTime) }}
        </div>
    </div>

    <div
        v-else
        class="border bg-gray-50 pb-10 bg-opacity-40 text-gray-400 pt-2 cursor-pointer hover:bg-gray-100"
        @click="openModalWindow()">
        <p class="mb-2">
            {{ calendarDataDay }}
        </p>
    </div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { CalendarTypes } from '@/types/calendar';
import { useStore } from '@/store/store';
import { convertTime } from '@/methods/convertTime';

const props = defineProps<{
  calendarData: CalendarTypes.CalendarTime
}>();

const store = useStore();
const openModalWindow = () => store.openModalWindow(props.calendarData.day);
const timeList = computed(() => store.calendarEvents.filter((item) => item.day === props.calendarData.day));
const calendarDataDay = computed(() => {
    const [year, month, day] = props.calendarData.day.split('-');
    return day;
});
</script>
