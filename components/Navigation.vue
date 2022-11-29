<template>
  <div class="navbar">
    <div class="flex-1">
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl"
        >daisyUI</NuxtLink
      >
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal p-0">
        <li>
          <button @click="logout" v-if="isLoggedIn">Logout</button>
          <NuxtLink to="/login" v-else>Login</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useDemoStore } from '@/stores/demo';

const demoData = useDemoStore();

const props = defineProps(['user']);

const logout = () => {
  demoData.user.loggedIn = false;
  navigateTo();
};

const isLoggedIn = computed(() => {
  return props.user.loggedIn;
});
</script>
