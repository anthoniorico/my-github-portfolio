import { createRouter, createWebHistory } from 'vue-router'
import RepoList from '../components/RepoList.vue'
import RepoDetail from '../components/RepoDetail.vue'
import NotFound from '../components/NotFound.vue'
import ErrorTest from '../components/ErrorTest.vue'

const routes = [
  {
    path: '/',
    name: 'RepoList',
    component: RepoList
  },
  {
    path: '/repo/:id',
    name: 'RepoDetail',
    component: RepoDetail,
    props: true
  },

  {
    path: '/error-test',
    name: 'ErrorTest',
    component: ErrorTest
  },

  {
    path: '/:pathMatch(.)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
