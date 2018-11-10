import GroupList from '../components/group/List'
import GroupCreate from '../components/group/Create'
import GroupUpdate from '../components/group/Update'
import GroupShow from '../components/group/Show'

export default [
  {
    name: 'GroupList', path: '/groups/', component: GroupList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'GroupCreate', path: '/groups/create', component: GroupCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'GroupUpdate', path: '/groups/edit/:id', component: GroupUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'GroupShow', path: '/groups/show/:id', component: GroupShow, meta: {
      requiresAuth: true
    }
  }
]
