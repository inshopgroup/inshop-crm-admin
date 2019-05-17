import OrderHeaderList from '../pages/order_header/List'
import OrderHeaderCreate from '../pages/order_header/Create'
import OrderHeaderUpdate from '../pages/order_header/Update'
import OrderHeaderShow from '../pages/order_header/Show'

export default [
  {
    name: 'OrderHeaderList',
    path: '/order_headers/',
    component: OrderHeaderList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderHeaderCreate',
    path: '/order_headers/create',
    component: OrderHeaderCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderHeaderUpdate',
    path: '/order_headers/edit/:id',
    component: OrderHeaderUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderHeaderShow',
    path: '/order_headers/show/:id',
    component: OrderHeaderShow,
    meta: {
      requiresAuth: true
    }
  }
]
