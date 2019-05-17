import OrderStatusList from '../pages/order_status/List'
import OrderStatusCreate from '../pages/order_status/Create'
import OrderStatusUpdate from '../pages/order_status/Update'
import OrderStatusShow from '../pages/order_status/Show'

export default [
  {
    name: 'OrderStatusList',
    path: '/order_statuses/',
    component: OrderStatusList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderStatusCreate',
    path: '/order_statuses/create',
    component: OrderStatusCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderStatusUpdate',
    path: '/order_statuses/edit/:id',
    component: OrderStatusUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderStatusShow',
    path: '/order_statuses/show/:id',
    component: OrderStatusShow,
    meta: {
      requiresAuth: true
    }
  }
]
