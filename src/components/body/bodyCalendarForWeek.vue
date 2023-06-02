<template>
    <div class="text-center border-collapse">
        <BodyCalendarForWeekNameDays/>
        <div class="flex">
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

const store = useStore();
const getAllHours = computed(() => store.getAllHours);
const getDaysForWeek = computed(() => store.getDaysForWeek);
</script>
