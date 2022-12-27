import { createRouter, createWebHistory } from 'vue-router'

// import { useAuth } from '@/store/auth'
import leaderboard from './leaderboard'
import managePlayer from './managePlayer'
const routes = [
  {
    path: '/',
    component: () => import('@/views/home'),
    children: [
      {
        path: '',
        redirect: () => '/leaderboard'
      },
      { ...managePlayer },
      { ...leaderboard }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



router.beforeEach((to, from, next) => {
  // const auth = useAuth()

  // if (to.path !== '/login' && !auth.isAuthenticated) {
  //   next({ name: 'Login', replace: true })
  // } else {
  //   next()
  // }
  next()
})

export default router
