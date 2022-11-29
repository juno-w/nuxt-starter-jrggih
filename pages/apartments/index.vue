<template>
  <section>
    <div class="overflow-x-auto py-6">
      <table class="table-compact w-full max-w-2xl mx-auto">
        <!-- head -->
        <thead>
          <tr>
            <th class="bg-gray-200">ID</th>
            <th class="bg-gray-200">Address</th>
            <th class="bg-gray-200">Floor</th>
            <th class="bg-gray-200">Door Number</th>
            <th class="bg-gray-200">Inventory Count</th>
            <th class="bg-gray-200"><span class="sr-only">Action</span></th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop -->
          <tr
            v-for="apt in apartment.apartments"
            :key="apt.id"
            class="hover:bg-blue-50"
          >
            <th>{{ apt.id }}</th>
            <td>{{ apt.address }}</td>
            <td>{{ apt.floor }}</td>
            <td>{{ apt.doorNumber }}</td>
            <td>{{ apt.inventories.length }}</td>
            <td>
              <NuxtLink :to="`/apartments/${apt.id}`">View Apartment</NuxtLink>
            </td>
          </tr>
          <!-- End Loop -->
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { useApartmentStore } from '@/stores/apartment';
import { onMounted } from 'vue';

const apartment = useApartmentStore();

const props = defineProps(['user']);

onMounted(() => {
  // Redirect to index if user not logged in
  if (!props.user.loggedIn) navigateTo();
});
</script>
