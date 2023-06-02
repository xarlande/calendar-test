<template>
    <div class="text-center border-collapse">
        <BodyCalendarForWeekNameDays/>
        <div v-if="currentTypeShow === TypeShowCalendar.TypeCalendar.Week" class="flex relative">
            <div :style="{top: `${getPositionArrowTime}%`}" class="w-full absolute bg-blue-400 h-0.5">
            </div>
            <BodyCalendarForWeekDaysColumn :get-all-hours="getAllHours"/>
            <BodyCalendarForWeekItem v-for="item in getDaysForWeek" :key="item.id"
                                     :get-all-hours="getAllHours"
                                     :get-current-day="item"/>
        </div>
        <div v-if="currentTypeShow === TypeShowCalendar.TypeCalendar.Day" class="flex relative">
            <div :style="{top: `${getPositionArrowTime}%`}" class="w-full absolute bg-blue-400 h-0.5">
            </div>
            <BodyCalendarForWeekDaysColumn :get-all-hours="getAllHours"/>
            <BodyCalendarForWeekItem v-for="item in getDaysForWeek" :key="item.id"
                                     :get-all-hours="getAllHours"
                                     :get-current-day="item"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/store/store';
import BodyCalendarForWeekDaysColumn
    from '@/components/body/bodyCalendarForWeek/bodyCalendarForWeekDaysColumn.vue';
import BodyCalendarForWeekNameDays
    from '@/components/body/bodyCalendarForWeek/bodyCalendarForWeekNameDays.vue';
import BodyCalendarForWeekItem
    from '@/components/body/bodyCalendarForWeek/bodyCalendarForWeekItemList.vue';
import moment from 'moment';
import { TypeShowCalendar } from '@/enums/typeShowCalendar';

const getAllSeconds = (hours: number, minutes: number, seconds: number): number => (hours * 3600) + (minutes * 60) + seconds;

const getPositionArrowTime = computed(() => {
    const currentTimeForDay = moment();
    const maxTimeForDay = moment('23:59', 'HH:mm');

    const allSecondCurrentDay = getAllSeconds(currentTimeForDay.hours(), currentTimeForDay.minutes(), currentTimeForDay.seconds());
    const allMaxSecondCurrentDay = getAllSeconds(maxTimeForDay.hours(), maxTimeForDay.minutes(), maxTimeForDay.seconds());

    return allSecondCurrentDay / allMaxSecondCurrentDay * 100;
});

const store = useStore();
const getAllHours = computed(() => store.getAllHours);
const getDaysForWeek = computed(() => store.getDaysForWeek);
const currentTypeShow = computed(() => store.currentTypeShow);
</script>
