import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/components/AuthLayout/index.vue'),
      children: []
    },
    {
      path: '',
      name: 'home',
      component: () => import('@/components/DefaultLayout/index.vue'),
      children: []
    }
  ]
})

export default router
