<script setup>
  import { ref } from "vue"
  import Dropdown from "@/components/DropdownMenu.vue"

  const searchQuery = ref("")
  const selectedRegion = ref("")
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <div class="w-full sm:w-1/3 relative">
        <ion-icon name="search-outline" class="input-icon"></ion-icon>
        <input v-model="searchQuery" type="text" placeholder="Search for a country..." class="input-theme" />
      </div>

      <div class="w-48">
        <Dropdown v-model="selectedRegion" />
      </div>

    </div>
  </section>
</template>
