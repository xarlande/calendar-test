<template>
    <div
        class="absolute inset-0 bg-opacity-40 bg-black w-full h-full flex justify-center">
        <div>
            <div class="bg-white rounded mt-52 p-4 min-w-[500px]">
                <div class="flex justify-end">
                    <button @click="closeModalWindow">x</button>
                </div>
                <div class="flex justify-around my-5">
                    <label for="startTime">Start Time: <input id="startTime" type="time"
                                                              @input="setStartTime">
                    </label>
                    <label for="stopTime">Stop Time: <input id="stopTime" type="time"
                                                            @input="setStopTime"></label>
                </div>
                <div class="flex justify-end">
                    <button class="global_button">Готово</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useStore } from '@/store/store';

const store = useStore();

const closeModalWindow = () => store.closeModalWindow();
const setStartTime = (item: {
  target: HTMLInputElement
}) => store.setCalendarItemStartTime(item.target.value);
const setStopTime = (item: {
  target: HTMLInputElement
}) => store.setCalendarItemStopTime(item.target.value);
</script>
