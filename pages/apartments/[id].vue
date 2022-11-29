<template>
  <section>
    <div>
      <NuxtLink to="/apartments" class="btn"
        >Go Back To Apartment List</NuxtLink
      >
    </div>
    <div>
      <H1>{{ apartment.address }}</H1>
      {{ apartment }}
    </div>
  </section>
</template>

<script setup>
const route = useRoute();

const apartment = await getApartmentById(route.params.id);

console.log(route.params);
</script>
