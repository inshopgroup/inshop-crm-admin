import ProjectStatusList from '../pages/project_status/List'
import ProjectStatusCreate from '../pages/project_status/Create'
import ProjectStatusUpdate from '../pages/project_status/Update'
import ProjectStatusShow from '../pages/project_status/Show'

export default [
  {
    name: 'ProjectStatusList',
    path: '/project_statuses/',
    component: ProjectStatusList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProjectStatusCreate',
    path: '/project_statuses/create',
    component: ProjectStatusCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProjectStatusUpdate',
    path: '/project_statuses/edit/:id',
    component: ProjectStatusUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProjectStatusShow',
    path: '/project_statuses/show/:id',
    component: ProjectStatusShow,
    meta: {
      requiresAuth: true
    }
  }
]
