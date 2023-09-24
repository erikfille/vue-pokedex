import { createRouter, createWebHistory } from 'vue-router'

import Loader from '@/components/Loader/Loader.vue'
import WelcomeLanding from '@/views/Landings/Welcome/WelcomeLanding.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: '/',
  routes: [
    {
      path: '/',
      name: 'welcomeLanding',
      component: WelcomeLanding
    },
    {
      path: '/app',
      name: 'app',
      component: () => import('@/views/Layouts/BaseLayout.vue'),
    }
  ],
  loading: Loader
})

export default router
