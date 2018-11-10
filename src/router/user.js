import UserList from '../components/user/List'
import UserCreate from '../components/user/Create'
import UserUpdate from '../components/user/Update'
import UserShow from '../components/user/Show'

export default [
  {
    name: 'UserList', path: '/users/', component: UserList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'UserCreate', path: '/users/create', component: UserCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'UserUpdate', path: '/users/edit/:id', component: UserUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'UserShow', path: '/users/show/:id', component: UserShow, meta: {
      requiresAuth: true
    }
  }
]
