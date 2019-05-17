import Calendar from '../pages/Calendar'

export default [
  {
    name: 'Calendar',
    path: '/calendar',
    component: Calendar,
    meta: {
      requiresAuth: true
    }
  }
]
