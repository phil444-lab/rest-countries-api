<script setup>
  import { ref, computed, watch } from "vue"
  import Dropdown from "@/components/DropdownMenu.vue"
  import countriesData from "@/assets/data.json"

  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from '@/components/ui/pagination'


  const loading = ref(false)
  const searchQuery = ref("")
  const selectedRegion = ref("")

  const itemsPerPage = 12

  const filteredCountries = computed(() => {
    return countriesData.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesRegion = !selectedRegion.value || country.region === selectedRegion.value

      return matchesSearch && matchesRegion
    })
  })

  watch([searchQuery, selectedRegion], () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 1000)
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

    <div class="mt-12">
      <div v-if="loading" class="flex justify-center py-20">
        <div class="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <Pagination v-else v-slot="{ page }" :items-per-page="itemsPerPage" :total="filteredCountries.length" :default-page="1">
        <div class="flex flex-col min-h-screen">
          <div class="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
            <router-link
              v-for="country in filteredCountries.slice((page - 1) * itemsPerPage, page * itemsPerPage)"
              :key="country.alpha3Code"
              :to="`/country/${country.alpha3Code}`"
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

          <PaginationContent v-slot="{ items }" class="mt-12 flex justify-end">
            <PaginationPrevious class="cursor-pointer" />
            <template v-for="(item, index) in items" :key="index">
              <PaginationItem
                v-if="item.type === 'page'"
                :value="item.value"
                :is-active="item.value === page"
                class="cursor-pointer"
              >
                {{ item.value }}
              </PaginationItem>
              <PaginationEllipsis v-else :index="index" />
            </template>
            <PaginationNext class="cursor-pointer" />
          </PaginationContent>
        </div>
      </Pagination>
    </div>
  </section>
</template>
