import TextList from '../pages/text/List'
import TextCreate from '../pages/text/Create'
import TextUpdate from '../pages/text/Update'
import TextShow from '../pages/text/Show'

export default [
  {
    name: 'TextList',
    path: '/texts/',
    component: TextList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TextCreate',
    path: '/texts/create',
    component: TextCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TextUpdate',
    path: '/texts/edit/:id',
    component: TextUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TextShow',
    path: '/texts/show/:id',
    component: TextShow,
    meta: {
      requiresAuth: true
    }
  }
]
