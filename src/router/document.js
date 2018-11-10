import DocumentList from '../components/document/List'
import DocumentCreate from '../components/document/Create'
import DocumentUpdate from '../components/document/Update'
import DocumentShow from '../components/document/Show'

export default [
  {
    name: 'DocumentList', path: '/documents/', component: DocumentList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'DocumentCreate', path: '/documents/create', component: DocumentCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'DocumentUpdate', path: '/documents/edit/:id', component: DocumentUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'DocumentShow', path: '/documents/show/:id', component: DocumentShow, meta: {
      requiresAuth: true
    }
  }
]
