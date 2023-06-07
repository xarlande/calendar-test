<template>
    <div class="border flex flex-col w-20">
        <div class="border-b">
            Всі дні
        </div>
        <div v-for="item in getAllHours" :key="item.id"
             :class="{'text-gray-400': item.time === isCurrentHour.time}"
             class="border-b py-2">
            {{ item.time }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { CalendarTypes } from '@/types/calendar';
import moment from 'moment';
import { useStore } from '@/store/store';

const props = defineProps<{
  getAllHours: Array<CalendarTypes.TimeItem>
}>();

const store = useStore();
const currentTime = computed(() => store.currentTimeForDay);

const isCurrentHour = computed(() => props.getAllHours.find((item) => {
    const isCurrent = moment(item.time, 'HH:mm')
        .isSame(currentTime.value, 'hour');
    return !!(item.time && isCurrent);
}));

</script>
