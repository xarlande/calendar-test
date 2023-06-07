<template>
    <div class="text-center border-collapse">
        <BodyCalendarForWeekNameDays/>
        <div v-if="currentTypeShow === TypeShowCalendar.TypeCalendar.Week" class="flex relative">
            <div :style="{top: `${getPositionArrowTime}%`}"
                 class="w-full absolute bg-red-400 h-0.5 z-40 mt-[6px]">
            </div>
            <BodyCalendarForWeekDaysColumn :get-all-hours="getAllHours"/>
            <BodyCalendarForWeekItem v-for="item in getDaysForWeek" :key="item.id"
                                     :get-all-hours="getAllHours"
                                     :get-current-day="item"/>
        </div>
        <div v-if="currentTypeShow === TypeShowCalendar.TypeCalendar.Day" class="flex relative">
            <div :style="{top: `${getPositionArrowTime}%`}"
                 class="w-full absolute bg-red-400 h-0.5 z-40 mt-[6px]">
            </div>
            <BodyCalendarForWeekDaysColumn :get-all-hours="getAllHours"/>
            <BodyCalendarForWeekItem
                :get-all-hours="getAllHours"
                :get-current-day="getSelectedDay"/>
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

const store = useStore();
const getAllHours = computed(() => store.getAllHours);
const getDaysForWeek = computed(() => store.getDaysForWeek);
const getSelectedDay = computed(() => store.getSelectedDayFormat);
const currentTypeShow = computed(() => store.currentTypeShow);
const currentTimeForDay = computed(() => store.currentTimeForDay);

const getPositionArrowTime = computed((): number => {
    const maxTimeForDay = moment('23:59', 'HH:mm');

    const allSecondCurrentDay = getAllSeconds(currentTimeForDay.value.hours(), currentTimeForDay.value.minutes(), currentTimeForDay.value.seconds());
    const allMaxSecondCurrentDay = getAllSeconds(maxTimeForDay.hours(), maxTimeForDay.minutes(), maxTimeForDay.seconds());
    return allSecondCurrentDay / allMaxSecondCurrentDay * 100;
});

</script>
