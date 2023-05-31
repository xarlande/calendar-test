<template>
    <div class="max-w-[1200px] mx-auto border rounded p-2 select-none">
        <HeaderCalendar/>
        <BodyCalendarForMonth v-if="currentTypeShow === TypeShowCalendar.TypeCalendar.Month"/>
        <BodyCalendarForWeek v-if="currentTypeShow === TypeShowCalendar.TypeCalendar.Week"/>
        <BodyCalendarForDay v-if="currentTypeShow === TypeShowCalendar.TypeCalendar.Day"/>
        <ModalWindowsTime v-if="stateModalWindow"/>
    </div>

</template>

<script lang="ts" setup>
import { useStore } from '@/store/store';
import { computed } from 'vue';
import { TypeShowCalendar } from '@/enums/typeShowCalendar';
import BodyCalendarForMonth from '@/components/bodyCalendarForMonth.vue';
import HeaderCalendar from '@/components/headerCalendar.vue';
import BodyCalendarForDay from '@/components/bodyCalendarForDay.vue';
import BodyCalendarForWeek from '@/components/bodyCalendarForWeek.vue';
import ModalWindowsTime from '@/components/modalWindowsTime.vue';

const store = useStore();
const currentTypeShow = computed(() => store.currentTypeShow);
const stateModalWindow = computed(() => store.isModalWindowOpened);
</script>
