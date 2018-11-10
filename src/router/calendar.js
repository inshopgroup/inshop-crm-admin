import Calendar from '../components/Calendar'

export default [
  {
    name: 'Calendar', path: '/calendar', component: Calendar, meta: {
      requiresAuth: true
    }
  }
]
