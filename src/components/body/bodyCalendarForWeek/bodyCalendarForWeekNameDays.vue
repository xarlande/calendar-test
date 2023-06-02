<template>
    <div class="flex border">
        <p class="border-x w-20"> &nbsp;
        </p>
        <div class="flex flex-auto">
            <p v-for="item in getDaysForWeek" :key="item.id" class="flex-1 border-x">{{ item.day }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store/store';
import { computed } from 'vue';

const store = useStore();
const getDaysForWeek = computed(() => store.getDaysForWeek);
</script>
