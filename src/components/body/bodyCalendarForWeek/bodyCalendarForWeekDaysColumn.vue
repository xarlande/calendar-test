<template>
    <div class="border flex flex-col w-20">
        <div class="border-b">
            Всі дні
        </div>
        <div v-for="item in getAllHours" :key="item.id" class="border-b py-2">
            {{ item.time }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps<{
  getAllHours: Array<{ id: number, time: string }>
}>();
</script>
