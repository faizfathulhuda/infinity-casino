export default {
  path: 'manage-player',
  component: () => import('@/views/Route'),
  children: [
    {
      path: '',
      name: 'Manage Player',
      component: () => import('@/views/managePlayer/Index'),
      meta: {
        permission: true
      }
    }
  ]
}
