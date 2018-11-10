import ContactTypeList from '../components/contact_type/List'
import ContactTypeCreate from '../components/contact_type/Create'
import ContactTypeUpdate from '../components/contact_type/Update'
import ContactTypeShow from '../components/contact_type/Show'

export default [
  {
    name: 'ContactTypeList', path: '/contact_types/', component: ContactTypeList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ContactTypeCreate', path: '/contact_types/create', component: ContactTypeCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ContactTypeUpdate', path: '/contact_types/edit/:id', component: ContactTypeUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ContactTypeShow', path: '/contact_types/show/:id', component: ContactTypeShow, meta: {
      requiresAuth: true
    }
  }
]
