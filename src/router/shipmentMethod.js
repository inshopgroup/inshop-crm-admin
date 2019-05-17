import ShipmentMethodList from '../pages/shipment_method/List'
import ShipmentMethodCreate from '../pages/shipment_method/Create'
import ShipmentMethodUpdate from '../pages/shipment_method/Update'
import ShipmentMethodShow from '../pages/shipment_method/Show'

export default [
  {
    name: 'ShipmentMethodList',
    path: '/shipment_methods/',
    component: ShipmentMethodList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ShipmentMethodCreate',
    path: '/shipment_methods/create',
    component: ShipmentMethodCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ShipmentMethodUpdate',
    path: '/shipment_methods/edit/:id',
    component: ShipmentMethodUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ShipmentMethodShow',
    path: '/shipment_methods/show/:id',
    component: ShipmentMethodShow,
    meta: {
      requiresAuth: true
    }
  }
]
