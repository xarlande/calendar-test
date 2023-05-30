<template>
    <div
        class="border bg-gray-50 pb-10 bg-opacity-40 text-gray-400 pt-2 cursor-pointer hover:bg-gray-100"
        @click="openModalWindow(calendarData)">
        <p class="mb-2">
            {{ calendarData.day }}
        </p>
    </div>

</template>
<script lang="ts" setup>
import { CalendarTypes } from '@/types/calendar';
import { defineProps } from 'vue';
import { useStore } from '@/store/store';

defineProps<{
  calendarData: CalendarTypes.CalendarItem
}>();

const store = useStore();
const openModalWindow = (calendarData: CalendarTypes.CalendarItem) => store.openModalWindow(calendarData);
</script>
