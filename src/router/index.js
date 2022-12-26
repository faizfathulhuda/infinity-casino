import { createRouter, createWebHistory } from 'vue-router'

import { useAuth } from '@/store/auth'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



router.beforeEach((to, from, next) => {
  const auth = useAuth()

  if (to.path !== '/login' && !auth.isAuthenticated) {
    next({ name: 'Login', replace: true })
  } else {
    next()
  }
})

export default router
