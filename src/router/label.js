import LabelList from '../pages/label/List'
import LabelCreate from '../pages/label/Create'
import LabelUpdate from '../pages/label/Update'
import LabelShow from '../pages/label/Show'

export default [
  {
    name: 'LabelList',
    path: '/labels/',
    component: LabelList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'LabelCreate',
    path: '/labels/create',
    component: LabelCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'LabelUpdate',
    path: '/labels/edit/:id',
    component: LabelUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'LabelShow',
    path: '/labels/show/:id',
    component: LabelShow,
    meta: {
      requiresAuth: true
    }
  }
]
