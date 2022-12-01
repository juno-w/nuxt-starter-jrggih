<template>
  <section class="py-12">
    <div class="space-y-4">
      <h2 class="text-2xl font-medium text-center">Welcome</h2>
      <div class="flex items-center">
        <form @submit.prevent="fakeLogin" class="p-4 mx-auto space-y-4 bg-white rounded shadow">
          <div class="w-full max-w-xs form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input type="text" class="w-full max-w-xs bg-white input input-bordered" v-model="username" />
          </div>
          <div class="w-full max-w-xs form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="password" class="w-full max-w-xs bg-white input input-bordered" v-model="password" />
          </div>
          <div>
            <button type="submit" class="w-full btn">Log In</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useDemoStore } from "@/stores/demo";
import { ref } from "vue";

const username = ref("JOHN");
const password = ref("password");
const demoData = useDemoStore();

// Fake login method
const fakeLogin = async () => {
  const usernameCorrect = username.value?.toLowerCase() === demoData.user.username?.toLowerCase();
  const passwordCorrect = password.value === demoData.user.password;

  // Redirect to apartment listing when authenticated.
  if (usernameCorrect && passwordCorrect) {
    demoData.user.loggedIn = true;

    await navigateTo("/apartments");
  }
};
</script>
