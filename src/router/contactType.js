import ContactTypeList from '../pages/contact_type/List'
import ContactTypeCreate from '../pages/contact_type/Create'
import ContactTypeUpdate from '../pages/contact_type/Update'
import ContactTypeShow from '../pages/contact_type/Show'

export default [
  {
    name: 'ContactTypeList',
    path: '/contact_types/',
    component: ContactTypeList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ContactTypeCreate',
    path: '/contact_types/create',
    component: ContactTypeCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ContactTypeUpdate',
    path: '/contact_types/edit/:id',
    component: ContactTypeUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ContactTypeShow',
    path: '/contact_types/show/:id',
    component: ContactTypeShow,
    meta: {
      requiresAuth: true
    }
  }
]
