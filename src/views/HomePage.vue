<script setup>
  import { ref, computed } from "vue"
  import Dropdown from "@/components/DropdownMenu.vue"
  import countriesData from "@/assets/data.json"

  const searchQuery = ref("")
  const selectedRegion = ref("")

  const filteredCountries = computed(() => {
    return countriesData.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesRegion = !selectedRegion.value || country.region === selectedRegion.value

      return matchesSearch && matchesRegion
    })
  })
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

    <div class="mt-12 grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
      <router-link v-for="country in filteredCountries"
        :key="country.alpha3Code" :to="`/country/${country.alpha3Code}`"
        class="country-card block rounded-lg overflow-hidden shadow-md"
      >
        <img :src="country.flags.png" :alt="country.name" class="w-full h-40 object-cover" />

        <div class="px-6 py-8">
          <h2 class="text-lg font-bold mb-2">{{ country.name }}</h2>
          <p class="text-xs mb-1"><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
          <p class="text-xs mb-1"><strong>Region:</strong> {{ country.region }}</p>
          <p class="text-xs mb-3"><strong>Capital:</strong> {{ country.capital }}</p>
        </div>
      </router-link>
    </div>
  </section>
</template>
