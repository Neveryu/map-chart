import Vue from 'vue'
import VueRouter from 'vue-router'
// import OverView from '@/views/overview'
import Map from '@/views/map'
import Tongji from '@/views/tongji'
import Search from '@/views/search'
import TaskList from '@/views/task-list'
import TaskDetail from '@/views/task-detail'
import Skeleton from '@/skeleton/skeleton'
import Loading from '@/components/loading'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/overview'
  },
  {
    path: '/overview',
    name: 'overview',
    // component: OverView
    component: () => ({
      // 需要加载的组件（应该是一个 Promsie 对象）
      component: import('@/views/overview'),
      // 异步组件加载时使用的组件
      loading: Loading,
      // 加载失败时使用的组件
      error: Loading,
      // 展示加载时组件的延迟时间。默认值是200毫秒
      delay: 200,
      // 如果提供了超时时间且组件加载也超时了
      // 则使用加载失败时使用的组件。默认值是：`Infinity`
      timeout: 3000
    })
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
    path: '/skeleton',
    name: 'skeleton',
    component: Skeleton
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
