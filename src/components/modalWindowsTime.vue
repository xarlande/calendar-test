<template>
    <div
        class="absolute inset-0 bg-opacity-40 bg-black w-full h-full flex justify-center">
        <div>
            <div class="bg-white rounded mt-52 p-4 min-w-[500px]">
                <div class="flex justify-end">
                    <button @click="closeModalWindow">x</button>
                </div>
                <div class="my-10 flex justify-center">
                    <label for="changeDate">
                        Date:
                        <input id="changeDate" v-model="stateDate" type="date">
                    </label>
                </div>
                <div class="flex justify-around my-5">
                    <label for="startTime">Start Time: <input id="startTime" v-model="stateStartTime"
                                                              type="time"
                    >
                    </label>
                    <label for="stopTime">Stop Time: <input id="stopTime" v-model="stateStopTime" type="time"
                    ></label>
                </div>
                <div class="flex justify-end">
                    <button :class="{'!bg-blue-300': !validStateTime}"
                            :disabled="!validStateTime" class="global_button"
                            @click="store.pushCalendarItems()">Готово
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useStore } from '@/store/store';
import { computed } from 'vue';

const store = useStore();

const closeModalWindow = () => store.closeModalWindow();
// const setStartTime = (item: {
//   target: HTMLInputElement
// }) => store.setCalendarItemStartTime(item.target.value);
// const setStopTime = (item: {
//   target: HTMLInputElement
// }) => store.setCalendarItemStopTime(item.target.value);
//
const stateStartTime = computed({
    get: () => store.getModalDateStartTime,
    set: (value) => store.setModalDateStartTime(value),
});
const stateStopTime = computed({
    get: () => store.getModalDateStopTime,
    set: (value) => store.setModalDateStopTime(value),
});
const stateDate = computed({
    get: () => store.getModalDateDay,
    set: (value) => store.setModalDateDay(value),
});
const validStateTime = computed(() => !!stateStopTime.value && !!stateStartTime.value && stateStartTime.value < stateStopTime.value);
</script>
