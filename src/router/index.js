import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CountryDetail from "@/views/CountryDetail.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: "/country/:code",
      name: "CountryDetail",
      component: CountryDetail
    },
  ],
})

export default router
