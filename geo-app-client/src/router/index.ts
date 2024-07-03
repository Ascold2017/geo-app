import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: () => import('@/components/AuthLayout/index.vue'),
      children: [
        {
          path: '',
          name: 'auth',
          component: () => import('@/views/Auth/index.vue')
        }
      ]
    },
    {
      path: '',
      name: '',
      component: () => import('@/components/DefaultLayout/index.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home/index.vue')
        }
      ]
    }
  ]
})

export default router