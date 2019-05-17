import DocumentList from '../pages/document/List'
import DocumentCreate from '../pages/document/Create'
import DocumentUpdate from '../pages/document/Update'
import DocumentShow from '../pages/document/Show'

export default [
  {
    name: 'DocumentList',
    path: '/documents/',
    component: DocumentList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'DocumentCreate',
    path: '/documents/create',
    component: DocumentCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'DocumentUpdate',
    path: '/documents/edit/:id',
    component: DocumentUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'DocumentShow',
    path: '/documents/show/:id',
    component: DocumentShow,
    meta: {
      requiresAuth: true
    }
  }
]
