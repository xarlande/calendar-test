<template>
    <button
        :class="{'opacity-0' : calendarData.day === 0}"
        class="border pb-10 pt-2 rounded hover:bg-gray-50 cursor-pointer"
        @click="openModalWindow(calendarData)">{{
            calendarData.day
        }}
    </button>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import { CalendarTypes } from '@/types/calendar';
import { useStore } from '@/store/store';

defineProps<{
  calendarData: CalendarTypes.CalendarItem
}>();

const store = useStore();
const openModalWindow = (calendarData: CalendarTypes.CalendarItem) => store.openModalWindow(calendarData);
</script>
