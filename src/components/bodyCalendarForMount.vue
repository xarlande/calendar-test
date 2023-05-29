<template>
    <div class="min-w-full text-center">
        <div class="grid grid-cols-7 gap-0.5">
            <p v-for="item in weekDaysArr" :key="item" class="border mb-2 rounded">{{ item }}</p>
            <p v-for="item in getDaysForMount"
               :key="item.id"
               :class="{'opacity-0' : item.day === 0}"
               class="border pb-10 pt-2 rounded hover:bg-gray-50">{{
                   item.day
               }}</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { MetaDays } from '@/enums/metaDays';
import { useStore } from '@/store/store';

const store = useStore();
const getDaysForMount = computed(() => store.getDaysForMonth);

const weekDaysArr = Object.values(MetaDays.WeekDays);
</script>
