import TaskStatusList from '../pages/task_status/List'
import TaskStatusCreate from '../pages/task_status/Create'
import TaskStatusUpdate from '../pages/task_status/Update'
import TaskStatusShow from '../pages/task_status/Show'

export default [
  {
    name: 'TaskStatusList',
    path: '/task_statuses/',
    component: TaskStatusList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TaskStatusCreate',
    path: '/task_statuses/create',
    component: TaskStatusCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TaskStatusUpdate',
    path: '/task_statuses/edit/:id',
    component: TaskStatusUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TaskStatusShow',
    path: '/task_statuses/show/:id',
    component: TaskStatusShow,
    meta: {
      requiresAuth: true
    }
  }
]
