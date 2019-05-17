import OrderLineStatusList from '../pages/order_line_status/List'
import OrderLineStatusCreate from '../pages/order_line_status/Create'
import OrderLineStatusUpdate from '../pages/order_line_status/Update'
import OrderLineStatusShow from '../pages/order_line_status/Show'

export default [
  {
    name: 'OrderLineStatusList',
    path: '/order_line_statuses/',
    component: OrderLineStatusList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderLineStatusCreate',
    path: '/order_line_statuses/create',
    component: OrderLineStatusCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderLineStatusUpdate',
    path: '/order_line_statuses/edit/:id',
    component: OrderLineStatusUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderLineStatusShow',
    path: '/order_line_statuses/show/:id',
    component: OrderLineStatusShow,
    meta: {
      requiresAuth: true
    }
  }
]
