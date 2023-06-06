<template>
    <div class="flex-auto border flex flex-col">
        <div class="border-b">
      &nbsp;
        </div>
        <div class="flex-auto relative flex flex-col">
            <BodyCalendarForWeekTimeEvent v-for="(item) in getAllHours"
                                          :key="item.id"
                                          :get-current-day="getCurrentDay"
                                          :time-item="item"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { CalendarTypes } from '@/types/calendar';
import BodyCalendarForWeekTimeEvent
    from '@/components/body/bodyCalendarForWeek/bodyCalendarForWeekItemList/bodyCalendarForWeekTimeEvent.vue';

defineProps<{
  getAllHours: Array<CalendarTypes.TimeItem>
  getCurrentDay: CalendarTypes.CalendarTime
}>();
</script>
