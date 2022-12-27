export default {
  path: 'leaderboard',
  component: () => import('@/views/Route'),
  children: [
    {
      path: '',
      name: 'Leaderboard',
      component: () => import('@/views/leaderboard/Index'),
      meta: {
        permission: true
      }
    }
  ]
}
