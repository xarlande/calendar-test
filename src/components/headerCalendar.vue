<template>
    <div class="flex justify-between pb-2 border-b my-2">
        <div class="flex gap-4">
            <button class="global_button" @click="decrementCurrentSelectData">
                Назад
            </button>
            <button :class="{'!bg-blue-900': currentSelectData === 0}"
                    class="global_button"
                    @click="resetCurrentSelectData">
                Тепер
            </button>
            <button class="global_button" @click="incrementCurrentSelectData">
                Далі
            </button>
        </div>
        <div class="py-2">
            {{ getCurrentMonth[1] }} / {{ getCurrentYear }}
        </div>
        <div class="flex gap-4">
            <button :class="{'!bg-blue-900': currentTypeShow === TypeShowCalendar.TypeCalendar.Month}"
                    class="global_button"
                    @click="setCurrentTypeShow(TypeShowCalendar.TypeCalendar.Month)">
                Місяць
            </button>
            <button :class="{'!bg-blue-900': currentTypeShow === TypeShowCalendar.TypeCalendar.Week}"
                    class="global_button"
                    @click="setCurrentTypeShow(TypeShowCalendar.TypeCalendar.Week)">
                Тиждень
            </button>
            <button :class="{'!bg-blue-900': currentTypeShow === TypeShowCalendar.TypeCalendar.Day}"
                    class="global_button"
                    @click="setCurrentTypeShow(TypeShowCalendar.TypeCalendar.Day)">
                День
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { TypeShowCalendar } from '@/enums/typeShowCalendar';
import { useStore } from '@/store/store';
import { computed } from 'vue';
import { MetaTime } from '@/enums/metaTime';

const store = useStore();
const currentSelectData = computed(() => store.currentDay);
const currentTypeShow = computed(() => store.currentTypeShow);
const getCurrentYear = computed(() => store.getCurrentYear);
const getCurrentMonth = computed(() => Object.entries(MetaTime.YearMonths)
    .find(([key]) => key === store.getCurrentMonth));

const incrementCurrentSelectData = () => store.incrementCurrentSelectData();
const decrementCurrentSelectData = () => store.decrementCurrentSelectData();
const resetCurrentSelectData = () => store.resetCurrentSelectData();
const setCurrentTypeShow = (type: TypeShowCalendar.TypeCalendar) => store.setCurrentTypeShow(type);
</script>
