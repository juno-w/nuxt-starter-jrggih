<template>
  <section>
    <div class="min-h-screen hero bg-base-200">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <H1>Hello there</H1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque
            aut repudiandae et a id nisi.
          </p>
          <div v-if="!props.user.loggedIn" class="text-center">
            <NuxtLink to="/login" class="btn btn-wide">Login</NuxtLink>
          </div>
          <NuxtLink to="/apartments" v-else class="btn">View Apartments</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps(["user"]);
</script>
