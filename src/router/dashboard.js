import Dashboard from '../pages/Dashboard'

export default [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  }
]
