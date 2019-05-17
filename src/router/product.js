import ProductList from '../pages/product/List'
import ProductCreate from '../pages/product/Create'
import ProductUpdate from '../pages/product/Update'
import ProductShow from '../pages/product/Show'

export default [
  {
    name: 'ProductList',
    path: '/products/',
    component: ProductList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProductCreate',
    path: '/products/create',
    component: ProductCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProductUpdate',
    path: '/products/edit/:id',
    component: ProductUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProductShow',
    path: '/products/show/:id',
    component: ProductShow,
    meta: {
      requiresAuth: true
    }
  }
]
