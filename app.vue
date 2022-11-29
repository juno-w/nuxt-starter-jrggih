<template>
  <div>
    <TheHeader :user="demoData.user" />
    <NuxtPage :user="demoData.user" />
  </div>
</template>

<script setup>
import { useDemoStore } from '@/stores/demo';
import { onMounted } from 'vue';

const demoData = useDemoStore();
</script>
