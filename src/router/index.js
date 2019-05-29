import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/index/index'),
          name: 'Home',
          meta: { title: 'home' }
        }
      ]
    },
    {
      path: '/about',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/about/about'),
          name: 'About',
          meta: { title: 'about' }
        }
      ]
    }
  ]
})
