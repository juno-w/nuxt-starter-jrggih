<template>
  <section>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <H1>Hello there</H1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div v-if="!props.user.loggedIn" class="text-center">
            <NuxtLink to="/login" class="btn btn-wide">Login</NuxtLink>
          </div>
          <NuxtLink to="/apartments" v-else class="btn"
            >View Apartments</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps(['user']);

// onMounted(() => {
//   if (props.user.loggedIn) navigateTo('/apartments');
// });
</script>
