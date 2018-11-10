import CategoryList from '../components/category/List'
import CategoryCreate from '../components/category/Create'
import CategoryUpdate from '../components/category/Update'
import CategoryShow from '../components/category/Show'

export default [
  {
    name: 'CategoryList', path: '/categories/', component: CategoryList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CategoryCreate', path: '/categories/create', component: CategoryCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CategoryUpdate', path: '/categories/edit/:id', component: CategoryUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CategoryShow', path: '/categories/show/:id', component: CategoryShow, meta: {
      requiresAuth: true
    }
  }
]
