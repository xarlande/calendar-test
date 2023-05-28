<template>
    <div class="max-w-[1200px] mx-auto border rounded p-2 select-none">
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
                {{ currentYear }}
            </div>
            <div class="flex gap-4">
                <button :class="{'!bg-blue-900': currentTypeShow === 'month'}"
                        class="global_button"
                        @click="setCurrentTypeShow('month')">
                    Місяць
                </button>
                <button :class="{'!bg-blue-900': currentTypeShow === 'week'}"
                        class="global_button"
                        @click="setCurrentTypeShow('week')">
                    Тиждень
                </button>
                <button :class="{'!bg-blue-900': currentTypeShow === 'day'}"
                        class="global_button"
                        @click="setCurrentTypeShow('day')">
                    День
                </button>
            </div>
        </div>
        <BodyCalendarForMount v-if="currentTypeShow === 'month'" />
    <!--        <div>-->
    <!--            index for first day mount: {{ getIndexForFirstDay }}-->
    <!--        </div>-->
    <!--        <div>-->
    <!--            arr days for mount: {{ getDaysForMount }}-->
    <!--        </div>-->
    </div>

</template>
<script lang="ts" setup>
import { useStore } from '@/store/store';
import { computed } from 'vue';
import BodyCalendarForMount from '@/components/bodyCalendarForMount.vue';
import { CalendarTypes } from '@/types/calendar';
import CalendarState = CalendarTypes.CalendarState;

const store = useStore();
// const getDaysForMount = computed(() => store.getDaysForMonth);
// const getIndexForFirstDay = computed(() => store.getIndexForFirstDay);
const currentSelectData = computed(() => store.currentSelectData);
const currentTypeShow = computed(() => store.currentTypeShow);
const currentYear = computed(() => store.currentYear);

const incrementCurrentSelectData = () => store.incrementCurrentSelectData();
const decrementCurrentSelectData = () => store.decrementCurrentSelectData();
const resetCurrentSelectData = () => store.resetCurrentSelectData();
const setCurrentTypeShow = (type: CalendarState['currentTypeShow']) => store.setCurrentTypeShow(type);
</script>
