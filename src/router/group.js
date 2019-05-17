import GroupList from '../pages/group/List'
import GroupCreate from '../pages/group/Create'
import GroupUpdate from '../pages/group/Update'
import GroupShow from '../pages/group/Show'

export default [
  {
    name: 'GroupList',
    path: '/groups/',
    component: GroupList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'GroupCreate',
    path: '/groups/create',
    component: GroupCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'GroupUpdate',
    path: '/groups/edit/:id',
    component: GroupUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'GroupShow',
    path: '/groups/show/:id',
    component: GroupShow,
    meta: {
      requiresAuth: true
    }
  }
]
