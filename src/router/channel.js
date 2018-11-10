import ChannelList from '../components/channel/List'
import ChannelCreate from '../components/channel/Create'
import ChannelUpdate from '../components/channel/Update'
import ChannelShow from '../components/channel/Show'

export default [
  {
    name: 'ChannelList', path: '/channels/', component: ChannelList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ChannelCreate', path: '/channels/create', component: ChannelCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ChannelUpdate', path: '/channels/edit/:id', component: ChannelUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ChannelShow', path: '/channels/show/:id', component: ChannelShow, meta: {
      requiresAuth: true
    }
  }
]
