<template>
    <div class="flex border">
        <p class="border-x w-20"> &nbsp;
        </p>
        <div v-if="getCurrentTypeShow === TypeShowCalendar.TypeCalendar.Week" class="flex flex-auto">
            <p v-for="item in getDaysForWeek" :key="item.id" class="flex-1 border-x">{{ item.day }}</p>
        </div>
        <div v-if="getCurrentTypeShow === TypeShowCalendar.TypeCalendar.Day" class="flex flex-auto">
            <p class="flex-auto border-x">{{ getSelectedDayFormat.day }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store/store';
import { computed } from 'vue';
import { TypeShowCalendar } from '@/enums/typeShowCalendar';

const store = useStore();
const getDaysForWeek = computed(() => store.getDaysForWeek);
const getCurrentTypeShow = computed(() => store.currentTypeShow);
const getSelectedDayFormat = computed(() => store.getSelectedDayFormat);
</script>
