<template>
  <header>
    <Navigation :user="props.user" class="bg-blue-800 text-gray-100" />
  </header>
</template>

<script setup>
const props = defineProps(['user']);
</script>
