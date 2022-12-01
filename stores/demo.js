import { defineStore } from "pinia";

export const useDemoStore = defineStore("demo", {
  state: () => ({
    user: {
      username: "John",
      password: "password",
      loggedIn: false,
    }, // User object
    options: [
      { name: "Air-conditioner" },
      { name: "Chair" },
      { name: "Clock" },
      { name: "Fan" },
      { name: "Fork" },
      { name: "Gas Stove" },
      { name: "Hair Dryer" },
      { name: "Hook" },
      { name: "Lamp" },
      { name: "Laundry Bag" },
      { name: "Photo Frame" },
      { name: "Plate" },
      { name: "Pot" },
      { name: "Refrigerator" },
      { name: "Sofa" },
      { name: "Spoon" },
      { name: "Swivel Chair" },
      { name: "TV" },
      { name: "Table" },
      { name: "Vacuum" },
      { name: "Wardrobe" },
      { name: "Washing Machine" },
      { name: "Water Heater" },
    ],
  }), // State
});
