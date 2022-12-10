<template>
  <section class="max-w-5xl py-6 mx-auto space-y-6">
    <div>
      <NuxtLink to="/apartments" class="btn">Go Back To Apartment List</NuxtLink>
    </div>
    <div class="p-4 space-y-2 bg-gray-100 rounded shadow">
      <div class="flex gap-4">
        <div>
          <img
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="Apartment"
            class="h-auto w-96"
          />
        </div>
        <div>
          <H1
            >{{ apartment.address }} <span class="text-base">(#{{ apartment.floor }}-{{ apartment.door_number }})</span></H1
          >
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora vero asperiores nihil excepturi corrupti, eius porro
            odit! Sit porro qui voluptate incidunt, autem voluptas minima inventore saepe dignissimos id laborum!
          </p>
        </div>
      </div>

      <div v-if="apartment.inventories.length" class="space-y-2">
        <div class="flex flex-wrap items-center justify-between space-x-2">
          <H3>Inventories ({{ apartment.inventories.length }})</H3>
          <div class="flex items-center space-x-2">
            <button v-if="apartment.pending_inventories_count" @click="approveInventories" class="btn btn-success btn-sm">
              Approve All
            </button>
            <label for="my-modal-5" class="btn btn-sm">Add new Inventory</label>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full max-w-5xl mx-auto table-compact">
            <thead>
              <tr>
                <th class="bg-gray-200">ID</th>
                <th class="bg-gray-200">Name</th>
                <th class="bg-gray-200">Quantity</th>
                <th class="bg-gray-200">Status</th>
                <th class="bg-gray-200"><span class="sr-only">Action</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inventory in apartment.inventories" :key="inventory.id" class="bg-white hover:bg-blue-50">
                <th class="text-center">{{ inventory.id }}</th>
                <td class="text-center">{{ inventory.name }}</td>
                <td class="text-center">{{ inventory.quantity }}</td>
                <td class="text-center">{{ inventory.approved ? "" : "Pending approval" }}</td>
                <td class="text-center">
                  <div class="divide-x-2">
                    <label for="my-modal-4" class="btn btn-xs" @click="editInventory(inventory)">Edit</label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <H3>No Inventories</H3>
        <p class="text-gray-500">
          There are no inventories for this apartment. Create a new one
          <button @click="create" class="text-blue-500 hover:underline">here!</button>
        </p>
      </div>
    </div>

    <!-- Edit Inventory Modal -->
    <input type="checkbox" id="my-modal-4" class="modal-toggle" />
    <label for="my-modal-4" class="cursor-pointer modal">
      <label class="space-y-4 modal-box">
        <h3 class="text-lg font-bold">Edit {{ inventory.data?.name }}</h3>
        <div>
          <p>Please select the option from the dropdown.</p>
          <select v-model="inventoryOptionName" id="options" class="w-full max-w-xs select select-bordered">
            <option disabled selected value="">Select inventory</option>
            <option
              v-for="(opt, index) in demoData.options"
              :value="opt.name"
              :key="index"
              :disabled="apartment.inventories.some((a) => a.name === opt.name)"
            >
              {{ opt.name }}
            </option>
          </select>
          <p v-if="updateErrors && updateErrors.name" class="mt-2 text-sm text-red-500" v-text="updateErrors.name[0]"></p>
        </div>
        <div>
          <p>Quantity</p>
          <input type="text" v-model="quantity" class="w-full max-w-xs input input-bordered" />
          <p v-if="updateErrors && updateErrors.quantity" class="mt-2 text-sm text-red-500" v-text="updateErrors.quantity[0]"></p>
        </div>
        <div class="modal-action">
          <button @click.prevent="updateInventory" for="" class="btn" :disabled="busy">{{ saveLabel }}</button>
        </div>
      </label>
    </label>

    <!-- Create Inventory Modal -->
    <input v-model="createModal" type="checkbox" id="my-modal-5" class="modal-toggle" />
    <label for="my-modal-5" class="cursor-pointer modal">
      <label class="space-y-4 modal-box">
        <h3 class="text-lg font-bold">Create New Inventory</h3>
        <div>
          <p>Please select the option from the dropdown.</p>
          <select v-model="newInventory.name" id="options" class="w-full max-w-xs select select-bordered">
            <option disabled selected value="">Select inventory</option>
            <option
              v-for="(opt, index) in demoData.options"
              :value="opt.name"
              :key="index"
              :disabled="apartment.inventories.some((a) => a.name === opt.name)"
            >
              {{ opt.name }}
            </option>
          </select>
          <p v-if="createErrors && createErrors.name" class="mt-2 text-sm text-red-500" v-text="createErrors.name[0]"></p>
        </div>
        <div>
          <p>Quantity</p>
          <input type="text" v-model="newInventory.quantity" class="w-full max-w-xs input input-bordered" />
          <p v-if="createErrors && createErrors.quantity" class="mt-2 text-sm text-red-500" v-text="createErrors.quantity[0]"></p>
        </div>
        <div class="modal-action">
          <button @click.prevent="createInventory" for="" class="btn" :disabled="busy">Create</button>
        </div>
      </label>
    </label>
  </section>
</template>

<script setup>
import { useDemoStore } from "@/stores/demo";
import { ref, reactive } from "vue";

const config = useRuntimeConfig();
const route = useRoute();
const demoData = useDemoStore();
const saveLabel = ref("Save");
const apartment = ref({});
apartment.value = await $fetch(`${config.public.apiBase}/apartments/${route.params.id}`);

const inventoryOptionName = ref(null);
const quantity = ref(null);
const updateErrors = ref(null);
const createErrors = ref(null);
const createModal = ref(false);
const newInventory = reactive({
  name: null,
  quantity: null,
});

const busy = ref(false);

const inventory = reactive({});

const _busyStart = () => {
  // Clear errors before sending request
  updateErrors.value = null;

  // Disable the button during busy
  busy.value = true;
};

const _busyEnd = () => {
  // Enable the button after busy
  busy.value = false;
};

const _saved = () => {
  saveLabel.value = "Saved";
  setTimeout(() => {
    saveLabel.value = "Save";
  }, 1500);
};

const updateInventory = async () => {
  _busyStart();

  // make a request
  await $fetch(`${config.public.apiBase}/apartments/${route.params.id}/inventories/${inventory.data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: inventoryOptionName.value,
      quantity: quantity.value,
    }),
  })
    .then((res) => {
      // Update the exisitng inventory without reload the page or re-fetching the data.
      _saved();
      apartment.value.inventories.find((inv) => inv.id === res.id).name = res.name;
      apartment.value.inventories.find((inv) => inv.id === res.id).quantity = res.quantity;
      apartment.value.inventories.find((inv) => inv.id === res.id).approved = res.approved;
      apartment.value.pending_inventories_count++;
    })
    .catch((error) => {
      // Catch the error responses and display according the field.
      updateErrors.value = error.data.errors;
    })
    .finally(() => _busyEnd());
};

const createInventory = async () => {
  _busyStart();
  // make a request
  await $fetch(`${config.public.apiBase}/apartments/${route.params.id}/inventories`, {
    method: "POST",
    body: JSON.stringify({
      name: newInventory.name,
      quantity: newInventory.quantity,
    }),
  })
    .then((res) => {
      // Push new created inventory to the list
      apartment.value.inventories.push(res);
      createModal.value = false;
      newInventory.name = null;
      newInventory.quantity = null;
      createErrors.value = null;
    })
    .catch((error) => {
      // Catch the error responses and display according the field.
      createErrors.value = error.data.errors;
    })
    .finally(() => _busyEnd());
};

const editInventory = (invt) => {
  inventory.data = invt;
  inventoryOptionName.value = invt.name;
  quantity.value = invt.quantity;
};

const approveInventories = async () => {
  const { data } = await useApproveInventories(apartment.value.id);
  apartment.value = data.value;
};
</script>
