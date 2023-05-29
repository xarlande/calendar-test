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
        <BodyCalendarForMount v-if="currentTypeShow === 'month'" />
    </div>

</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/store/store';
import BodyCalendarForMount from '@/components/bodyCalendarForMount.vue';
import { TypeShowCalendar } from '@/enums/typeShowCalendar';

const store = useStore();
const currentSelectData = computed(() => store.currentSelectData);
const currentTypeShow = computed(() => store.currentTypeShow);
const currentYear = computed(() => store.currentYear);

const incrementCurrentSelectData = () => store.incrementCurrentSelectData();
const decrementCurrentSelectData = () => store.decrementCurrentSelectData();
const resetCurrentSelectData = () => store.resetCurrentSelectData();
const setCurrentTypeShow = (type: TypeShowCalendar.TypeCalendar) => store.setCurrentTypeShow(type);
</script>
