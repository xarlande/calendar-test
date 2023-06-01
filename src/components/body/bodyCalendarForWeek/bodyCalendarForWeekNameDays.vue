<template>
    <div class="flex border">
        <p class="border-x w-20"> &nbsp;
        </p>
        <div class="flex flex-auto">
            <p v-for="[key, value] in WeekDays" :key="key" class="flex-1 border-x">{{ value }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { MetaTime } from '@/enums/metaTime';

const WeekDays = Object.entries(MetaTime.WeekDays);

</script>
