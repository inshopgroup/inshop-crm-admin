import Search from '../components/Search'

export default [
  {
    name: 'Search', path: '/search', component: Search, meta: {
      requiresAuth: true
    }
  }
]
