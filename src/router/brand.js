import BrandList from '../pages/brand/List'
import BrandCreate from '../pages/brand/Create'
import BrandUpdate from '../pages/brand/Update'
import BrandShow from '../pages/brand/Show'

export default [
  {
    name: 'BrandList',
    path: '/brands/',
    component: BrandList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'BrandCreate',
    path: '/brands/create',
    component: BrandCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'BrandUpdate',
    path: '/brands/edit/:id',
    component: BrandUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'BrandShow',
    path: '/brands/show/:id',
    component: BrandShow,
    meta: {
      requiresAuth: true
    }
  }
]
