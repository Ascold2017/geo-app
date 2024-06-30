import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'topics',
      component: () => import('../views/Topics/index.vue')
    },
    {
      path: '/topics/:id',
      name: 'topicEdit',
      component: () => import('../views/TopicEdit/index.vue')
    },
    {
      path: '/topics/new',
      name: 'topicEditNew',
      component: () => import('../views/TopicEdit/index.vue')
    }
  ]
})

export default router
