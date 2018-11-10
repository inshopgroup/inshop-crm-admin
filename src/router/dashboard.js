import Dashboard from '../components/Dashboard'

export default [
  {
    name: 'Dashboard', path: '/dashboard', component: Dashboard, meta: {
      requiresAuth: true
    }
  }
]
