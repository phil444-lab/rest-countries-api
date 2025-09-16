<script setup>
  import { ref, watch } from "vue"
  import { useRoute } from "vue-router"
  import countriesData from "@/assets/data.json"

  const route = useRoute()
  const countryCode = ref(route.params.code)
  const country = ref(countriesData.find(c => c.alpha3Code === countryCode.value))
  const borderCountries = ref(country.value?.borders?.map(code => countriesData.find(c => c.alpha3Code === code)) || [])

  watch(
    () => route.params.code,
    (newCode) => {
      countryCode.value = newCode
      country.value = countriesData.find(c => c.alpha3Code === newCode)
      borderCountries.value = country.value?.borders?.map(code => countriesData.find(c => c.alpha3Code === code)) || []
    }
  )
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
    <router-link to="/" class="inline-flex items-center gap-2 mb-12 px-4 py-2 rounded shadow-md country-card">
      <ion-icon name="arrow-back-outline"></ion-icon>
      <span>Back</span>
    </router-link>

    <div v-if="country" class="grid gap-26 md:grid-cols-2 items-center">
      <img :src="country.flags.svg" :alt="country.name" class="w-full h-auto rounded-lg shadow-md" />

      <div>
        <h1 class="text-3xl font-bold mb-6">{{ country.name }}</h1>

        <div class="grid gap-6 sm:grid-cols-2">
          <div class="space-y-2">
            <p><strong>Native Name:</strong> {{ country.nativeName }}</p>
            <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
            <p><strong>Region:</strong> {{ country.region }}</p>
            <p><strong>Sub Region:</strong> {{ country.subregion }}</p>
            <p><strong>Capital:</strong> {{ country.capital }}</p>
          </div>
          <div class="space-y-2">
            <p><strong>Top Level Domain:</strong> {{ country.topLevelDomain.join(", ") }}</p>
            <p><strong>Currencies:</strong> {{ country.currencies.map(c => c.name).join(", ") }}</p>
            <p><strong>Languages:</strong> {{ country.languages.map(l => l.name).join(", ") }}</p>
          </div>
        </div>

        <div v-if="country.borders?.length" class="mt-12 flex flex-wrap items-center gap-2">
          <p class="font-semibold mr-2">Border Countries:</p>

          <div class="flex flex-wrap gap-2">
            <router-link v-for="borderCountry in borderCountries"
              :key="borderCountry.alpha3Code" :to="`/country/${borderCountry.alpha3Code}`"
              class="px-4 py-2 rounded shadow-md country-card text-sm"
            >
              {{ borderCountry.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
