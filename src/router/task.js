import TaskList from '../pages/task/List'
import TaskCreate from '../pages/task/Create'
import TaskUpdate from '../pages/task/Update'
import TaskShow from '../pages/task/Show'

export default [
  {
    name: 'TaskList',
    path: '/tasks/',
    component: TaskList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TaskCreate',
    path: '/tasks/create',
    component: TaskCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TaskUpdate',
    path: '/tasks/edit/:id',
    component: TaskUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TaskShow',
    path: '/tasks/show/:id',
    component: TaskShow,
    meta: {
      requiresAuth: true
    }
  }
]
