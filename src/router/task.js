import TaskList from '../components/task/List'
// import TaskCreate from '../components/task/Create'
import TaskUpdate from '../components/task/Update'
import TaskShow from '../components/task/Show'

export default [
  {
    name: 'TaskList', path: '/tasks/', component: TaskList, meta: {
      requiresAuth: true
    }
  },
  // {
  //   name: 'TaskCreate', path: '/tasks/create', component: TaskCreate, meta: {
  //     requiresAuth: true
  //   }
  // },
  {
    name: 'TaskUpdate', path: '/tasks/edit/:id', component: TaskUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TaskShow', path: '/tasks/show/:id', component: TaskShow, meta: {
      requiresAuth: true
    }
  }
]
