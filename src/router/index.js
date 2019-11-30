import Vue from 'vue'
import VueRouter from 'vue-router'
import OverView from '@/views/overview'
import Map from '@/views/map'
import Tongji from '@/views/tongji'
import Search from '@/views/search'
import TaskList from '@/views/task-list'
import TaskDetail from '@/views/task-detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/overview'
  },
  {
    path: '/overview',
    name: 'overview',
    component: OverView
  },
  {
    path: '/map',
    name: 'map',
    component: Map
  },
  {
    path: '/tongji',
    name: 'tongji',
    component: Tongji
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/task-list',
    name: 'task-list',
    component: TaskList
  },
  {
    path: '/task-detail',
    name: 'task-detail',
    component: TaskDetail
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
