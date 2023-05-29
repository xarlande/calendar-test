<template>
    <div class="min-w-full text-center">
        <div class="grid grid-cols-7 gap-0.5">
            <p v-for="item in weekDaysArr" :key="item" class="border mb-2 rounded">{{ item }}</p>
            <BodyCalendarMonthItem v-for="item in getDaysForMount" :key="item.id" :calendar-data="item"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { MetaTime } from '@/enums/metaTime';
import { useStore } from '@/store/store';
import BodyCalendarMonthItem from '@/components/bodyCalendarForMounth/bodyCalendarMonthItem.vue';

const store = useStore();
const getDaysForMount = computed(() => store.getDaysForMonth);

const weekDaysArr = Object.values(MetaTime.WeekDays);
</script>
