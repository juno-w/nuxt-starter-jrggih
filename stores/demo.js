import { defineStore } from 'pinia';

export const useDemoStore = defineStore('demo', {
  state: () => ({
    user: {
      username: 'John',
      password: 'password',
      loggedIn: false,
    }, // User object
  }), // State
});
