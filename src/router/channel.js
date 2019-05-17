import ChannelList from '../pages/channel/List'
import ChannelCreate from '../pages/channel/Create'
import ChannelUpdate from '../pages/channel/Update'
import ChannelShow from '../pages/channel/Show'

export default [
  {
    name: 'ChannelList',
    path: '/channels/',
    component: ChannelList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ChannelCreate',
    path: '/channels/create',
    component: ChannelCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ChannelUpdate',
    path: '/channels/edit/:id',
    component: ChannelUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ChannelShow',
    path: '/channels/show/:id',
    component: ChannelShow,
    meta: {
      requiresAuth: true
    }
  }
]
