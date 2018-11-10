import BrandList from '../components/brand/List'
import BrandCreate from '../components/brand/Create'
import BrandUpdate from '../components/brand/Update'
import BrandShow from '../components/brand/Show'

export default [
  {
    name: 'BrandList', path: '/brands/', component: BrandList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'BrandCreate', path: '/brands/create', component: BrandCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'BrandUpdate', path: '/brands/edit/:id', component: BrandUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'BrandShow', path: '/brands/show/:id', component: BrandShow, meta: {
      requiresAuth: true
    }
  }
]
