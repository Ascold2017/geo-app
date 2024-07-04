import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: '',
      component: () => import('@/components/DefaultLayout/index.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: '/topic/:id',
          name: 'topicIndex',
          component: () => import('@/views/TopicIndex/index.vue')
        },
        {
          path: '/topic/:id/lecture',
          name: 'topicLecture',
          component: () => import('@/views/TopicLecture/index.vue')
        },
        {
          path: '/topic/:id/video',
          name: 'topicVideo',
          component: () => import('@/views/TopicVideo/index.vue')
        },
        {
          path: '/topic/:id/words',
          name: 'topicWords',
          component: () => import('@/views/TopicWords/index.vue')
        },
        {
          path: '/training',
          name: 'training',
          component: () => import('@/views/Training/index.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/Profile/index.vue')
        }
      ]
    },
    {
      path: '/auth',
      component: () => import('@/components/AuthLayout/index.vue'),
      children: [
        {
          path: '/',
          name: 'auth',
          component: () => import('@/views/Auth/index.vue')
        }
      ]
    },
  ]
})

export default router
