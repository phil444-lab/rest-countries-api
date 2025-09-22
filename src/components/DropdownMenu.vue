<script setup>
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { ChevronDownIcon } from '@heroicons/vue/24/solid'

  defineProps({
    modelValue: String,
    regions: {
      type: Array,
      default: () => ["All", "Africa", "America", "Asia", "Europe", "Oceania"]
    }
  })
  const emit = defineEmits(["update:modelValue"])

  const selectRegion = (region) => {
    emit("update:modelValue", region === "All" ? "" : region)
  }
</script>

<template>
  <Menu as="div" class="relative w-full">
    <MenuButton class="dropdown-button">
      {{ modelValue || "Filter by Region" }}
      <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
    </MenuButton>

    <MenuItems class="dropdown-menu dropdown-transition">
      <MenuItem v-for="region in regions" :key="region" v-slot="{ active }">
        <button
          @click="selectRegion(region)"
          :class="['dropdown-item', { active: active }]"
        >
          {{ region }}
        </button>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>
