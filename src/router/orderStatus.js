import OrderStatusList from '../components/order_status/List'
import OrderStatusCreate from '../components/order_status/Create'
import OrderStatusUpdate from '../components/order_status/Update'
import OrderStatusShow from '../components/order_status/Show'

export default [
  {
    name: 'OrderStatusList', path: '/order_statuses/', component: OrderStatusList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderStatusCreate', path: '/order_statuses/create', component: OrderStatusCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderStatusUpdate', path: '/order_statuses/edit/:id', component: OrderStatusUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderStatusShow', path: '/order_statuses/show/:id', component: OrderStatusShow, meta: {
      requiresAuth: true
    }
  }
]
