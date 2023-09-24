import { createRouter, createWebHistory } from 'vue-router'
import Loader from '@/components/Loader/Loader.vue'

import WelcomeLanding from '@/views/Landings/Welcome/WelcomeLanding.vue'
import List from '@/views/List/List.vue'

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
      component: () => import('@/components/Layouts/BaseLayout.vue'),
      children: [
        {
          path: '/app/list',
          name: 'list',
          component: List
        }
      ]
    }
  ],
  loading: Loader
})

export default router
