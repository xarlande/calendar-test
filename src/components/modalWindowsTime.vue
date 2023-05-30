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
                    <label for="startTime">Start Time: <input id="startTime" type="time"
                                                              @input="setStartTime">
                    </label>
                    <label for="stopTime">Stop Time: <input id="stopTime" type="time"
                                                            @input="setStopTime"></label>
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
const setStartTime = (item: {
  target: HTMLInputElement
}) => store.setCalendarItemStartTime(item.target.value);
const setStopTime = (item: {
  target: HTMLInputElement
}) => store.setCalendarItemStopTime(item.target.value);

const stateStartTime = computed(() => {
    if (store.modalData) {
        return store.modalData.startTime.length;
    }
    return null;
});
const stateStopTime = computed(() => {
    if (store.modalData) {
        return store.modalData.stopTime.length;
    }
    return null;
});
const stateDate = computed({
    get: () => store.getCurrentModalDate,
    set: (value) => store.setCurrentModalDate(value),
});
const validStateTime = computed(() => stateStopTime.value !== 0 && stateStartTime.value !== 0);
</script>
