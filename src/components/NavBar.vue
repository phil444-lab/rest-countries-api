<script setup>
  import { ref, onMounted } from "vue"

  const isDark = ref(false)

  onMounted(() => {
    isDark.value = document.documentElement.classList.contains("dark")
  })

  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add("dark")
      document.body.classList.add("dark")
      document.body.classList.remove("light")
    } else {
      document.documentElement.classList.remove("dark")
      document.body.classList.add("light")
      document.body.classList.remove("dark")
    }
  }
</script>

<template>
  <header :class="[isDark ? 'header-dark' : 'header-light', 'shadow-sm mb-5']">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <h1 class="text-lg font-bold">Where in the world?</h1>

        <button  class="flex items-center gap-2 cursor-pointer" @click="toggleTheme" >
          <span v-if="isDark" class="flex items-center gap-2">
            <ion-icon name="sunny"></ion-icon>
            Light Mode
          </span>

          <span v-else  class="flex items-center gap-2">
            <ion-icon name="moon-outline"></ion-icon>
            Dark Mode
          </span>
        </button>
      </div>
    </div>
  </header>
</template>
