import UserList from '../pages/user/List'
import UserCreate from '../pages/user/Create'
import UserUpdate from '../pages/user/Update'
import UserShow from '../pages/user/Show'

export default [
  {
    name: 'UserList',
    path: '/users/',
    component: UserList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'UserCreate',
    path: '/users/create',
    component: UserCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'UserUpdate',
    path: '/users/edit/:id',
    component: UserUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'UserShow',
    path: '/users/show/:id',
    component: UserShow,
    meta: {
      requiresAuth: true
    }
  }
]
