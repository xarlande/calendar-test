<template>
    <div class="max-w-[1400px] mx-auto border rounded p-2 select-none">
        <HeaderCalendar/>
        <BodyCalendarForMonth v-if="currentTypeShow === TypeShowCalendar.TypeCalendar.Month"/>
        <BodyCalendarForWeek v-else/>
        <ModalWindowsTime v-if="stateModalWindow"/>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store/store';
import { computed, watch } from 'vue';
import { TypeShowCalendar } from '@/enums/typeShowCalendar';
import BodyCalendarForMonth from '@/components/body/bodyCalendarForMonth.vue';
import HeaderCalendar from '@/components/header/headerCalendar.vue';
import BodyCalendarForWeek from '@/components/body/bodyCalendarForWeek.vue';
import ModalWindowsTime from '@/components/modal/modalWindowsTime.vue';

const store = useStore();
const currentTypeShow = computed(() => store.currentTypeShow);
const stateModalWindow = computed(() => store.isModalWindowOpened);

watch(stateModalWindow, () => {
    if (stateModalWindow.value) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }
});

document.documentElement.setAttribute('lang', 'uk');
</script>
