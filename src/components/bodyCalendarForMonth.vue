<template>
    <div class="min-w-full text-center">
        <div class="grid grid-cols-7 border">
            <p v-for="item in weekDaysArr" :key="item" class="border">{{ item }}</p>
            <BodyCalendarOtherMonthItem v-for="item in getBeforeDaysForMonth" :key="item.id"
                                        :calendar-data="item"/>
            <BodyCalendarMonthItem v-for="item in getDaysForMount" :key="item.id" :calendar-data="item"/>
            <BodyCalendarOtherMonthItem v-for="item in getAfterDaysForMonth" :key="item.id"
                                        :calendar-data="item"/>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { MetaTime } from '@/enums/metaTime';
import { useStore } from '@/store/store';
import BodyCalendarMonthItem from '@/components/bodyCalendarForMounth/bodyCalendarMonthItem.vue';
import BodyCalendarOtherMonthItem
    from '@/components/bodyCalendarForMounth/bodyCalendarOtherMonthItem.vue';

const store = useStore();
const getDaysForMount = computed(() => store.getDaysForMonth);
const getBeforeDaysForMonth = computed(() => store.getBeforeDaysForMonth);
const getAfterDaysForMonth = computed(() => store.getAfterDaysForMonth);

const weekDaysArr = Object.values(MetaTime.WeekDays);
</script>
