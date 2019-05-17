import CategoryList from '../pages/category/List'
import CategoryCreate from '../pages/category/Create'
import CategoryUpdate from '../pages/category/Update'
import CategoryShow from '../pages/category/Show'

export default [
  {
    name: 'CategoryList',
    path: '/categories/',
    component: CategoryList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CategoryCreate',
    path: '/categories/create',
    component: CategoryCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CategoryUpdate',
    path: '/categories/edit/:id',
    component: CategoryUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CategoryShow',
    path: '/categories/show/:id',
    component: CategoryShow,
    meta: {
      requiresAuth: true
    }
  }
]
