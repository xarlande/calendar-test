<template>
    <div class="flex-auto border flex flex-col">
        <div class="border-b">
      &nbsp;
        </div>
        <div class="border border-y-0 flex-auto relative flex flex-col">
            <BodyCalendarForWeekTimeEvent v-for="(item, idx) in currentEvents"
                                          :key="item.id" :idx-father-arr="idx"
                                          :length-father-arr="currentEvents.length"
                                          :time-event="item"/>
            <div v-for="item in getAllHours" :key="item.id" class="border-b py-2"
                 @click="openModal(item.time)">
        &nbsp;
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { CalendarTypes } from '@/types/calendar';
import { useStore } from '@/store/store';
import BodyCalendarForWeekTimeEvent
    from '@/components/body/bodyCalendarForWeek/bodyCalendarForWeekItemList/bodyCalendarForWeekItem/bodyCalendarForWeekTimeEvent.vue';
import moment from 'moment';

const props = defineProps<{
  getAllHours: Array<{ id: number, time: string }>
  getCurrentDay: CalendarTypes.CalendarTime
}>();

const store = useStore();
const currentEvents = computed(() => store.calendarEvents.filter((item) => item.day === props.getCurrentDay.day));
const openModal = (time: string) => {
    const startTime = moment(time, 'HH:mm')
        .unix();
    const stopTime = moment(time, 'HH:mm')
        .add(1, 'hour')
        .unix();

    store.openModalWindow(props.getCurrentDay.day, startTime, stopTime);
};

</script>
