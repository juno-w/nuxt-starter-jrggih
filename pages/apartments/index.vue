<template>
  <section>
    <div class="py-6 space-y-6 overflow-x-auto">
      <div class="max-w-5xl mx-auto">
        <input
          @input="doSearch"
          type="search"
          placeholder="Search address"
          class="w-full max-w-xs input input-bordered"
          v-model="searchInput"
        />
      </div>
      <table class="w-full max-w-5xl mx-auto table-compact">
        <!-- head -->
        <thead>
          <tr>
            <th class="bg-gray-200">ID</th>
            <th class="bg-gray-200">Address</th>
            <th class="bg-gray-200">Floor</th>
            <th class="bg-gray-200">Door Number</th>
            <th class="bg-gray-200">Inventory Count</th>
            <th class="bg-gray-200">Pending Approval</th>
            <th class="bg-gray-200"><span class="sr-only">Action</span></th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <!-- Loop -->
          <tr v-for="apt in apartments" :key="apt.id" class="hover:bg-blue-50">
            <th>{{ apt.id }}</th>
            <td>{{ apt.address }}</td>
            <td>{{ apt.floor }}</td>
            <td>{{ apt.door_number }}</td>
            <td>
              <label
                v-if="apt.inventories.length"
                for="my-modal-4"
                class="btn btn-xs btn-primary"
                @click="previewInventories(apt.id)"
                >{{ apt.inventories.length }}</label
              >
              <span v-else class="btn btn-xs" disabled>{{ apt.inventories.length }}</span>
            </td>
            <td>
              {{ apt.pending_inventories_count }}
            </td>
            <td>
              <NuxtLink :to="`/apartments/${apt.id}`" class="btn btn-xs">View</NuxtLink>
            </td>
          </tr>
          <!-- End Loop -->
        </tbody>
      </table>
    </div>

    <!-- Preview inventories modal -->
    <input v-model="previewModal" type="checkbox" id="my-modal-4" class="modal-toggle" />
    <label for="my-modal-4" class="cursor-pointer modal">
      <label class="relative modal-box" for="">
        <h3 class="mb-2 text-lg font-bold">{{ apartment.data?.address }}</h3>
        <div v-if="apartment.data?.inventories.length" class="space-y-2">
          <div class="overflow-x-auto">
            <table class="w-full max-w-5xl mx-auto table-compact">
              <thead>
                <tr>
                  <th class="bg-gray-200">ID</th>
                  <th class="bg-gray-200">Name</th>
                  <th class="bg-gray-200">Quantity</th>
                  <th class="bg-gray-200">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="inventory in apartment.data.inventories" :key="inventory.id" class="bg-white hover:bg-blue-50">
                  <th class="text-center">{{ inventory.id }}</th>
                  <td class="text-center">{{ inventory.name }}</td>
                  <td class="text-center">{{ inventory.quantity }}</td>
                  <td class="text-center">{{ inventory.approved ? "" : "Pending approval" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="apartment.data.pending_inventories_count">
            <button @click="approveInventories" class="w-full btn btn-success btn-sm">Approve All</button>
          </div>
        </div>
      </label>
    </label>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouteQuery } from "@vueuse/router";
import { useDebounceFn } from "@vueuse/core";

const config = useRuntimeConfig();
const props = defineProps(["user"]);
const search = useRouteQuery("search", "");
const searchInput = ref(search.value);
const previewModal = ref(false);
const apartment = reactive({});

const doSearch = (e) => {
  const debouncedFn = useDebounceFn(() => {
    search.value = e.target.value;
  }, 500);

  debouncedFn();
};

const { data: apartments } = await useFetch(`${config.public.apiBase}/apartments`, {
  method: "GET",
  query: { search },
});

const previewInventories = (aptId) => {
  apartment.data = apartments.value.find((apt) => apt.id === aptId);
};

const approveInventories = async () => {
  const { data } = await useApproveInventories(apartment.data.id);

  apartment.data = data.value;
  apartments.value.find((apt) => apt.id === apartment.data.id).inventories = data.value.inventories;
  apartments.value.find((apt) => apt.id === apartment.data.id).pending_inventories_count = data.value.pending_inventories_count;
};

onMounted(() => {
  // Redirect to index if user not logged in
  if (!props.user.loggedIn) navigateTo();
});
</script>
