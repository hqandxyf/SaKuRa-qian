import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/mainView.vue'),
    redirect: '/main/danci',
    children: [
      {
        path: '/main/danci',
        name: '单词',
        component: () => import('../views/danciView.vue')
      },
      {
        path: '/main/shou',
        name: '收藏夹',
        component: () => import('../views/shoucangView.vue')
      },
      {
        path: '/main/yuedu',
        name: '阅读',
        component: () => import('../views/yueduView.vue')
      },
      {
        path: '/main/user',
        name: '用户',
        component: () => import('../views/userView.vue')
      },
      {
        path: '/main/gengduo',
        name: '更多功能',
        component: () => import('../views/otherView1.vue')
      },
      {
        path: '/main/fanyi',
        name: '翻译',
        component: () => import('../views/fanyiView.vue')
      },
      {
        path: '/main/sousuo',
        name: '搜索',
        component: () => import('../views/sousuoView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/loginView.vue')
  },
  {
    path: '/zhuce',
    name: '注册',
    component: () => import('../views/zhuceView.vue')
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  /* mode:'history', */
  routes
})

export default router
